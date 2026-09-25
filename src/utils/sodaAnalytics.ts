// SodaTide Real-Time Analytics Engine with Firebase Firestore Atomic Persistence

import { 
  doc, 
  updateDoc, 
  increment, 
  getDoc, 
  setDoc,
  onSnapshot, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface CountryStat {
  country: string;
  countryCode: string;
  flag: string;
  count: number;
  cities: string[];
}

export interface VisitorLocation {
  ip: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  flag: string;
  loaded: boolean;
  isExcluded: boolean;
}

export interface RealAnalyticsData {
  isRealOnly: boolean;
  totalVisits: number;
  uniqueVisitors: number;
  totalTimeSeconds: number;
  sessionCountForAvg: number;
  maxScrollDepthPercent: number;
  totalClicks: number;
  checkoutClicks: number;
  countries: { [countryName: string]: CountryStat };
  buttonClicks: {
    [buttonName: string]: {
      count: number;
      category: 'checkout' | 'cta' | 'navigation' | 'policy';
      lastClicked: string;
    };
  };
  scrollMilestones: {
    hero: number;
    ingredients: number;
    efficacy: number;
    pricing: number;
    guarantee: number;
    footer: number;
  };
  recentEvents: Array<{
    id?: string;
    type: 'visit' | 'click' | 'scroll' | 'geo';
    detail: string;
    location?: string;
    flag?: string;
    timestamp: string;
  }>;
}

const STORAGE_KEY = 'sodatide_real_analytics_firestore_v6';
const UID_KEY = 'sodatide_unique_visitor_id';
const ADMIN_DEVICE_KEY = 'sodatide_is_admin_device';
const ADMIN_FILTER_TOGGLE_KEY = 'sodatide_admin_filter_toggle';

// Owner's IP to exclude from screenshot
export const OWNER_IP = '168.205.108.132';

const INITIAL_REAL_DATA: RealAnalyticsData = {
  isRealOnly: true,
  totalVisits: 0,
  uniqueVisitors: 0,
  totalTimeSeconds: 0,
  sessionCountForAvg: 0,
  maxScrollDepthPercent: 0,
  totalClicks: 0,
  checkoutClicks: 0,
  countries: {},
  buttonClicks: {},
  scrollMilestones: {
    hero: 0,
    ingredients: 0,
    efficacy: 0,
    pricing: 0,
    guarantee: 0,
    footer: 0
  },
  recentEvents: []
};

class RealAnalyticsTracker {
  private data: RealAnalyticsData;
  private currentSessionStartTime: number;
  private currentSessionMaxDepth: number = 0;
  private currentSessionClicks: number = 0;
  private isFirebaseConnected: boolean = false;
  private isFilterActive: boolean = true;
  private isKnownAdminDevice: boolean = false;
  private currentVisitorLocation: VisitorLocation = {
    ip: '',
    country: 'Detectando...',
    countryCode: '',
    region: '',
    city: '',
    flag: '🌍',
    loaded: false,
    isExcluded: false
  };
  private listeners: Array<() => void> = [];
  private sessionCountedInTab: boolean = false;

  constructor() {
    this.currentSessionStartTime = Date.now();
    this.initAdminDetection();
    this.data = this.loadLocalCache();
    this.initFirestoreSync();
    this.initSession();
    this.initListeners();
    this.detectVisitorLocation();
  }

  private initAdminDetection() {
    try {
      // Check if this specific browser is marked as admin
      const isDeviceAdmin = localStorage.getItem(ADMIN_DEVICE_KEY) === 'true';
      this.isKnownAdminDevice = isDeviceAdmin;

      // Filter is enabled by default for admin
      const toggleSetting = localStorage.getItem(ADMIN_FILTER_TOGGLE_KEY);
      this.isFilterActive = toggleSetting !== 'false';

      this.currentVisitorLocation.isExcluded = this.isExcluded();
    } catch {
      this.isKnownAdminDevice = false;
      this.isFilterActive = true;
    }
  }

  // Marks this device as admin (called when admin modal is opened)
  public markAsAdminDevice() {
    this.isKnownAdminDevice = true;
    try {
      localStorage.setItem(ADMIN_DEVICE_KEY, 'true');
    } catch {
      // Ignore
    }
    this.currentVisitorLocation.isExcluded = this.isExcluded();
    this.notifyListeners();
  }

  public isFilterEnabled(): boolean {
    return this.isFilterActive;
  }

  public toggleFilter(enable: boolean) {
    this.isFilterActive = enable;
    try {
      localStorage.setItem(ADMIN_FILTER_TOGGLE_KEY, enable ? 'true' : 'false');
    } catch {
      // Ignore
    }
    this.currentVisitorLocation.isExcluded = this.isExcluded();
    this.notifyListeners();

    // If admin unlocks themselves for testing and haven't counted this session yet, record it!
    if (!enable && !this.sessionCountedInTab) {
      this.recordVisit();
    }
  }

  // Determines whether the current user is excluded from analytics
  public isExcluded(): boolean {
    // If filter toggle is turned OFF (Test Mode), nobody is excluded!
    if (!this.isFilterActive) {
      return false;
    }

    // If device is marked as admin, exclude it
    if (this.isKnownAdminDevice) {
      return true;
    }

    // If detected IP matches the owner IP, exclude it
    if (this.currentVisitorLocation.ip && this.currentVisitorLocation.ip === OWNER_IP) {
      return true;
    }

    // Otherwise, this is a genuine visitor - DO NOT EXCLUDE!
    return false;
  }

  private loadLocalCache(): RealAnalyticsData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return {
          ...INITIAL_REAL_DATA,
          ...JSON.parse(stored)
        };
      }
    } catch {
      // Fallback
    }
    return { ...INITIAL_REAL_DATA };
  }

  private saveLocalCache() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch {
      // Ignore
    }
  }

  // Real-time Firestore synchronization
  private async initFirestoreSync() {
    try {
      const summaryRef = doc(db, 'analytics_summary', 'global_metrics');
      
      // Live listener to Firestore global metrics
      onSnapshot(summaryRef, (docSnap) => {
        if (docSnap.exists()) {
          this.isFirebaseConnected = true;
          const remote = docSnap.data() as Partial<RealAnalyticsData>;
          this.data = {
            ...this.data,
            totalVisits: remote.totalVisits ?? 0,
            uniqueVisitors: remote.uniqueVisitors ?? 0,
            totalTimeSeconds: remote.totalTimeSeconds ?? 0,
            sessionCountForAvg: remote.sessionCountForAvg ?? 0,
            maxScrollDepthPercent: remote.maxScrollDepthPercent ?? 0,
            totalClicks: remote.totalClicks ?? 0,
            checkoutClicks: remote.checkoutClicks ?? 0,
            countries: remote.countries || {},
            buttonClicks: remote.buttonClicks || {},
            scrollMilestones: remote.scrollMilestones || {
              hero: 0,
              ingredients: 0,
              efficacy: 0,
              pricing: 0,
              guarantee: 0,
              footer: 0
            }
          };
          this.saveLocalCache();
          this.notifyListeners();
        } else {
          this.syncToFirestore();
        }
      }, (err) => {
        console.warn('Firestore snapshot error:', err);
      });

      // Live listener to recent events collection
      const eventsRef = collection(db, 'analytics_events');
      const q = query(eventsRef, orderBy('timestamp', 'desc'), limit(25));
      onSnapshot(q, (snapshot) => {
        const events: RealAnalyticsData['recentEvents'] = [];
        snapshot.forEach((d) => {
          const item = d.data();
          events.push({
            id: d.id,
            type: item.type,
            detail: item.detail,
            location: item.location,
            flag: item.flag,
            timestamp: item.timestamp
          });
        });
        this.data.recentEvents = events;
        this.notifyListeners();
      }, () => {
        // Fallback
      });

    } catch (e) {
      console.warn('Firestore init fallback:', e);
    }
  }

  private async syncToFirestore() {
    try {
      const summaryRef = doc(db, 'analytics_summary', 'global_metrics');
      await setDoc(summaryRef, {
        isRealOnly: true,
        totalVisits: this.data.totalVisits,
        uniqueVisitors: this.data.uniqueVisitors,
        totalTimeSeconds: this.data.totalTimeSeconds,
        sessionCountForAvg: this.data.sessionCountForAvg,
        maxScrollDepthPercent: this.data.maxScrollDepthPercent,
        totalClicks: this.data.totalClicks,
        checkoutClicks: this.data.checkoutClicks,
        countries: this.data.countries,
        buttonClicks: this.data.buttonClicks,
        scrollMilestones: this.data.scrollMilestones,
        lastUpdated: new Date().toISOString()
      }, { merge: true });
      this.isFirebaseConnected = true;
    } catch (err) {
      console.warn('Firestore sync warning:', err);
    }
  }

  // Record a legitimate visit to Firebase Firestore IMMEDIATELY on page load
  private async initSession() {
    // If already counted in this tab, don't count duplicate
    if (this.sessionCountedInTab) return;

    // Check if this user is excluded right now
    if (this.isExcluded()) {
      return;
    }

    this.recordVisit();
  }

  private async recordVisit() {
    if (this.sessionCountedInTab) return;
    this.sessionCountedInTab = true;

    // Check unique visitor via localStorage
    let isUnique = false;
    try {
      let uid = localStorage.getItem(UID_KEY);
      if (!uid) {
        uid = 'v_' + Math.random().toString(36).substring(2, 11) + Date.now();
        localStorage.setItem(UID_KEY, uid);
        isUnique = true;
      }
    } catch {
      isUnique = true;
    }

    // Increment local state immediately
    this.data.totalVisits += 1;
    if (isUnique) {
      this.data.uniqueVisitors += 1;
    }
    this.data.sessionCountForAvg += 1;
    this.saveLocalCache();
    this.notifyListeners();

    // Persist visit to Firestore atomically
    try {
      const summaryRef = doc(db, 'analytics_summary', 'global_metrics');
      const snap = await getDoc(summaryRef);
      if (snap.exists()) {
        await updateDoc(summaryRef, {
          totalVisits: increment(1),
          uniqueVisitors: isUnique ? increment(1) : increment(0),
          sessionCountForAvg: increment(1),
          lastUpdated: new Date().toISOString()
        });
      } else {
        await this.syncToFirestore();
      }

      // Add live event
      const device = typeof window !== 'undefined' && window.innerWidth < 768 ? 'Mobile' : 'Desktop';
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      await addDoc(collection(db, 'analytics_events'), {
        type: 'visit',
        detail: `Nova visita iniciada (${device})`,
        location: this.currentVisitorLocation.city ? `${this.currentVisitorLocation.city}, ${this.currentVisitorLocation.country}` : 'Visitante Online',
        flag: this.currentVisitorLocation.flag || '🌍',
        timestamp: timeStr,
        createdAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Failed to record visit to Firestore:', e);
    }
  }

  private getFlagEmoji(countryCode?: string): string {
    if (!countryCode || countryCode.length !== 2) return '🌍';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  // Detect visitor's real IP and country asynchronously
  private async detectVisitorLocation() {
    try {
      const res = await fetch('https://ipwho.is/');
      if (!res.ok) throw new Error('ipwho error');
      const geo = await res.json();

      if (geo && geo.success !== false && geo.country) {
        const flagEmoji = geo.flag?.emoji || this.getFlagEmoji(geo.country_code);
        const ip = geo.ip || '';
        
        this.currentVisitorLocation = {
          ip,
          country: geo.country,
          countryCode: geo.country_code || '',
          region: geo.region || '',
          city: geo.city || '',
          flag: flagEmoji,
          loaded: true,
          isExcluded: this.isFilterActive && (this.isKnownAdminDevice || ip === OWNER_IP)
        };

        // If the detected IP is the owner's IP, ensure marked as admin
        if (ip === OWNER_IP) {
          this.markAsAdminDevice();
          this.notifyListeners();
          return;
        }

        // If not excluded, record their country and geo event!
        if (!this.isExcluded()) {
          // If session hadn't been recorded yet, record it now
          if (!this.sessionCountedInTab) {
            this.recordVisit();
          }

          // Register country
          const cName = geo.country;
          if (!this.data.countries[cName]) {
            this.data.countries[cName] = {
              country: cName,
              countryCode: geo.country_code || 'BR',
              flag: flagEmoji,
              count: 0,
              cities: []
            };
          }
          this.data.countries[cName].count += 1;
          if (geo.city && !this.data.countries[cName].cities.includes(geo.city)) {
            this.data.countries[cName].cities.push(geo.city);
          }

          this.saveLocalCache();
          this.notifyListeners();

          // Sync country to Firestore
          try {
            const summaryRef = doc(db, 'analytics_summary', 'global_metrics');
            await updateDoc(summaryRef, {
              countries: this.data.countries,
              lastUpdated: new Date().toISOString()
            });

            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            await addDoc(collection(db, 'analytics_events'), {
              type: 'geo',
              detail: `Origem detectada: ${geo.city ? geo.city + ', ' : ''}${cName}`,
              location: `${geo.city ? geo.city + ', ' : ''}${cName}`,
              flag: flagEmoji,
              timestamp: timeStr,
              createdAt: new Date().toISOString()
            });
          } catch (e) {
            console.warn('Failed to update country in Firestore:', e);
          }
        }

        this.notifyListeners();
        return;
      }
    } catch {
      // Secondary fallback
      try {
        const res2 = await fetch('https://freeipapi.com/api/json');
        const geo2 = await res2.json();
        if (geo2 && geo2.countryName) {
          const flag = this.getFlagEmoji(geo2.countryCode);
          const ip = geo2.ipAddress || '';

          this.currentVisitorLocation = {
            ip,
            country: geo2.countryName,
            countryCode: geo2.countryCode || '',
            region: geo2.regionName || '',
            city: geo2.cityName || '',
            flag: flag,
            loaded: true,
            isExcluded: this.isFilterActive && (this.isKnownAdminDevice || ip === OWNER_IP)
          };

          if (ip === OWNER_IP) {
            this.markAsAdminDevice();
            this.notifyListeners();
            return;
          }

          if (!this.isExcluded()) {
            if (!this.sessionCountedInTab) {
              this.recordVisit();
            }

            const cName = geo2.countryName;
            if (!this.data.countries[cName]) {
              this.data.countries[cName] = {
                country: cName,
                countryCode: geo2.countryCode || '',
                flag: flag,
                count: 0,
                cities: []
              };
            }
            this.data.countries[cName].count += 1;
            if (geo2.cityName && !this.data.countries[cName].cities.includes(geo2.cityName)) {
              this.data.countries[cName].cities.push(geo2.cityName);
            }

            this.saveLocalCache();
            this.notifyListeners();

            try {
              const summaryRef = doc(db, 'analytics_summary', 'global_metrics');
              await updateDoc(summaryRef, {
                countries: this.data.countries,
                lastUpdated: new Date().toISOString()
              });
            } catch {
              // Ignore
            }
          }

          this.notifyListeners();
          return;
        }
      } catch {
        // If GeoIP is completely blocked by browser, it still recorded the visit!
        this.currentVisitorLocation = {
          ip: '',
          country: 'Visitante Online',
          countryCode: 'BR',
          region: '',
          city: '',
          flag: '🌍',
          loaded: true,
          isExcluded: this.isFilterActive && this.isKnownAdminDevice
        };
        this.notifyListeners();
      }
    }
  }

  private initListeners() {
    if (typeof window === 'undefined') return;

    // Scroll depth tracking
    let scrollTimeout: any = null;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const depth = Math.min(100, Math.round((scrollTop / docHeight) * 100));
          if (depth > this.currentSessionMaxDepth) {
            this.currentSessionMaxDepth = depth;
            if (!this.isExcluded()) {
              if (depth > this.data.maxScrollDepthPercent) {
                this.data.maxScrollDepthPercent = depth;
              }
              this.handleScrollMilestone(depth);
            }
          }
        }
      }, 150);
    }, { passive: true });

    // Click tracking
    window.addEventListener('click', (e: MouseEvent) => {
      if (this.isExcluded()) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-analytics-ignore], #analytics-modal, .analytics-modal-container')) {
        return;
      }

      const trackableEl = target.closest('[data-button-name], [data-aff-track], button, a') as HTMLElement | null;
      if (trackableEl) {
        if (trackableEl.closest('[data-analytics-ignore], #analytics-modal, .analytics-modal-container')) {
          return;
        }

        let name = trackableEl.getAttribute('data-button-name');
        if (!name) {
          name = trackableEl.innerText?.trim().slice(0, 35) || 'Botão';
        }
        
        if (
          name.includes('Telemetry') || 
          name.includes('Analytics') || 
          name.includes('Fechar') || 
          name.includes('Zerar') || 
          name.includes('Limpar') ||
          name.includes('Bloquear') ||
          name.includes('Desbloquear') ||
          name.includes('Origem no Mundo') ||
          name.includes('Quais Botões') ||
          name.includes('Até Onde') ||
          name.includes('Histórico')
        ) {
          return;
        }

        this.recordClick(name);
      }
    }, true);

    // Dwell duration tracking (only for legitimate visitors)
    setInterval(() => {
      if (!this.isExcluded()) {
        this.data.totalTimeSeconds += 5;
        this.saveLocalCache();
        try {
          const summaryRef = doc(db, 'analytics_summary', 'global_metrics');
          updateDoc(summaryRef, {
            totalTimeSeconds: increment(5),
            lastUpdated: new Date().toISOString()
          }).catch(() => {});
        } catch {
          // Ignore
        }
      }
    }, 5000);
  }

  private async handleScrollMilestone(depth: number) {
    if (this.isExcluded()) return;

    let milestoneKey: keyof typeof this.data.scrollMilestones | null = null;
    let label = '';

    if (depth >= 90 && !this.data.scrollMilestones.footer) {
      milestoneKey = 'footer';
      label = 'Rodapé & Políticas (90%+)';
    } else if (depth >= 75 && !this.data.scrollMilestones.pricing) {
      milestoneKey = 'pricing';
      label = 'Tabela de Preços & Ofertas (75%)';
    } else if (depth >= 50 && !this.data.scrollMilestones.efficacy) {
      milestoneKey = 'efficacy';
      label = 'Eficácia Clínica & Laudos (50%)';
    } else if (depth >= 25 && !this.data.scrollMilestones.ingredients) {
      milestoneKey = 'ingredients';
      label = '7 Ingredientes & História (25%)';
    }

    if (milestoneKey) {
      this.data.scrollMilestones[milestoneKey] += 1;
      this.saveLocalCache();
      this.notifyListeners();

      try {
        const summaryRef = doc(db, 'analytics_summary', 'global_metrics');
        await updateDoc(summaryRef, {
          [`scrollMilestones.${milestoneKey}`]: increment(1),
          maxScrollDepthPercent: Math.max(this.data.maxScrollDepthPercent, depth),
          lastUpdated: new Date().toISOString()
        });

        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        await addDoc(collection(db, 'analytics_events'), {
          type: 'scroll',
          detail: `Rolou até: ${label} [${depth}%]`,
          timestamp: timeStr,
          createdAt: new Date().toISOString()
        });
      } catch {
        // Fallback
      }
    }
  }

  public async recordClick(buttonName: string) {
    if (this.isExcluded()) {
      return;
    }

    this.currentSessionClicks += 1;
    this.data.totalClicks += 1;

    const isCheckout = buttonName.toLowerCase().includes('checkout') || 
                       buttonName.toLowerCase().includes('bottle') || 
                       buttonName.toLowerCase().includes('frasco');
    if (isCheckout) {
      this.data.checkoutClicks += 1;
    }

    if (!this.data.buttonClicks[buttonName]) {
      this.data.buttonClicks[buttonName] = {
        count: 0,
        category: isCheckout ? 'checkout' : 'cta',
        lastClicked: 'Agora'
      };
    }

    this.data.buttonClicks[buttonName].count += 1;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.data.buttonClicks[buttonName].lastClicked = timeStr;

    this.saveLocalCache();
    this.notifyListeners();

    try {
      const summaryRef = doc(db, 'analytics_summary', 'global_metrics');
      await updateDoc(summaryRef, {
        totalClicks: increment(1),
        checkoutClicks: isCheckout ? increment(1) : increment(0),
        [`buttonClicks.${buttonName}.count`]: increment(1),
        [`buttonClicks.${buttonName}.category`]: isCheckout ? 'checkout' : 'cta',
        [`buttonClicks.${buttonName}.lastClicked`]: timeStr,
        lastUpdated: new Date().toISOString()
      });

      await addDoc(collection(db, 'analytics_events'), {
        type: 'click',
        detail: `Clicou em: "${buttonName}"`,
        timestamp: timeStr,
        createdAt: new Date().toISOString()
      });
    } catch {
      // Fallback
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(l => l());
  }

  public getData(): RealAnalyticsData {
    return this.data;
  }

  public getIsFirebaseConnected(): boolean {
    return this.isFirebaseConnected;
  }

  public getCurrentVisitorLocation(): VisitorLocation {
    return this.currentVisitorLocation;
  }

  public getCurrentSessionStats() {
    if (this.isExcluded()) {
      return {
        elapsedSeconds: 0,
        maxScrollDepth: 0,
        sessionClicks: 0
      };
    }
    const elapsedSeconds = Math.floor((Date.now() - this.currentSessionStartTime) / 1000);
    return {
      elapsedSeconds,
      maxScrollDepth: this.currentSessionMaxDepth,
      sessionClicks: this.currentSessionClicks
    };
  }

  // Reset in Firebase Firestore and locally to complete 0
  public async resetToZero() {
    this.data = {
      isRealOnly: true,
      totalVisits: 0,
      uniqueVisitors: 0,
      totalTimeSeconds: 0,
      sessionCountForAvg: 0,
      maxScrollDepthPercent: 0,
      totalClicks: 0,
      checkoutClicks: 0,
      countries: {},
      buttonClicks: {},
      scrollMilestones: {
        hero: 0,
        ingredients: 0,
        efficacy: 0,
        pricing: 0,
        guarantee: 0,
        footer: 0
      },
      recentEvents: []
    };
    this.currentSessionClicks = 0;
    this.sessionCountedInTab = false;
    this.saveLocalCache();
    await this.syncToFirestore();
    this.notifyListeners();
  }
}

export const tracker = new RealAnalyticsTracker();
