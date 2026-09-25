// SodaTide Real-Time Analytics Engine with Firebase Firestore Persistence & Admin IP Exclusion

import { 
  doc, 
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

const STORAGE_KEY = 'sodatide_real_analytics_firestore_cache';
const UID_KEY = 'sodatide_unique_visitor_id';
const ADMIN_EXCLUDE_KEY = 'sodatide_admin_device_excluded';
const EXCLUDED_IPS_KEY = 'sodatide_excluded_ips_list';

// Default excluded IPs - includes the user's specific IP from their screenshot
const DEFAULT_EXCLUDED_IPS = ['168.205.108.132'];

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
  private excludedIPs: string[] = [];
  private isDeviceExcluded: boolean = true; // By default, someone opening admin is excluded
  private currentVisitorLocation: VisitorLocation = {
    ip: '168.205.108.132',
    country: 'Detectando...',
    countryCode: '',
    region: '',
    city: '',
    flag: '🌍',
    loaded: false,
    isExcluded: true
  };
  private listeners: Array<() => void> = [];

  constructor() {
    this.currentSessionStartTime = Date.now();
    this.initExclusionSettings();
    this.data = this.loadLocalCache();
    this.initSession();
    this.initListeners();
    this.initFirestoreSync();
    this.detectVisitorLocation();
  }

  private initExclusionSettings() {
    try {
      const storedIps = localStorage.getItem(EXCLUDED_IPS_KEY);
      if (storedIps) {
        this.excludedIPs = Array.from(new Set([...DEFAULT_EXCLUDED_IPS, ...JSON.parse(storedIps)]));
      } else {
        this.excludedIPs = [...DEFAULT_EXCLUDED_IPS];
        localStorage.setItem(EXCLUDED_IPS_KEY, JSON.stringify(this.excludedIPs));
      }

      // Mark this device as admin excluded by default
      const adminSetting = localStorage.getItem(ADMIN_EXCLUDE_KEY);
      if (adminSetting !== null) {
        this.isDeviceExcluded = adminSetting === 'true';
      } else {
        this.isDeviceExcluded = true;
        localStorage.setItem(ADMIN_EXCLUDE_KEY, 'true');
      }
    } catch {
      this.excludedIPs = [...DEFAULT_EXCLUDED_IPS];
      this.isDeviceExcluded = true;
    }
  }

  public isExcluded(): boolean {
    if (this.isDeviceExcluded) return true;
    if (this.currentVisitorLocation.ip && this.excludedIPs.includes(this.currentVisitorLocation.ip)) {
      return true;
    }
    return false;
  }

  public toggleAdminExclusion(enable: boolean) {
    this.isDeviceExcluded = enable;
    if (this.currentVisitorLocation.ip && !this.excludedIPs.includes(this.currentVisitorLocation.ip) && enable) {
      this.excludedIPs.push(this.currentVisitorLocation.ip);
      localStorage.setItem(EXCLUDED_IPS_KEY, JSON.stringify(this.excludedIPs));
    }
    localStorage.setItem(ADMIN_EXCLUDE_KEY, enable ? 'true' : 'false');
    this.currentVisitorLocation.isExcluded = this.isExcluded();
    this.notifyListeners();
  }

  public getExcludedIPs(): string[] {
    return this.excludedIPs;
  }

  public addExcludedIP(ip: string) {
    const trimmed = ip.trim();
    if (trimmed && !this.excludedIPs.includes(trimmed)) {
      this.excludedIPs.push(trimmed);
      localStorage.setItem(EXCLUDED_IPS_KEY, JSON.stringify(this.excludedIPs));
      this.currentVisitorLocation.isExcluded = this.isExcluded();
      this.notifyListeners();
    }
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
      
      // Subscribe to live updates from Firestore
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
          // Initialize document in Firestore if empty
          this.syncToFirestore();
        }
      }, (err) => {
        console.warn('Firestore real-time sync notice:', err.message);
      });

      // Subscribe to real-time events collection
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
        if (events.length > 0) {
          this.data.recentEvents = events;
          this.notifyListeners();
        }
      }, () => {
        // Local events fallback
      });

    } catch (e) {
      console.warn('Firestore initialization fallback:', e);
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
      console.warn('Firestore save sync warning:', err);
    }
  }

  private async logEventToFirestore(type: 'visit' | 'click' | 'scroll' | 'geo', detail: string, location?: string, flag?: string) {
    // If the visitor is excluded (admin/owner IP), do NOT write to database!
    if (this.isExcluded()) {
      return;
    }

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    this.data.recentEvents.unshift({
      type,
      detail,
      location,
      flag,
      timestamp: timeStr
    });
    if (this.data.recentEvents.length > 30) this.data.recentEvents.pop();
    this.notifyListeners();

    try {
      await addDoc(collection(db, 'analytics_events'), {
        type,
        detail,
        location: location || null,
        flag: flag || null,
        timestamp: timeStr,
        createdAt: new Date().toISOString()
      });
    } catch {
      // Local fallback
    }
  }

  private initSession() {
    // If this device / IP is excluded, skip counting this visit!
    if (this.isExcluded()) {
      return;
    }

    let isUnique = false;
    try {
      let uid = localStorage.getItem(UID_KEY);
      if (!uid) {
        uid = 'v_' + Math.random().toString(36).substring(2, 11) + Date.now();
        localStorage.setItem(UID_KEY, uid);
        isUnique = true;
      }
    } catch {
      // Ignore
    }

    this.data.totalVisits += 1;
    if (isUnique) {
      this.data.uniqueVisitors += 1;
    }
    this.data.sessionCountForAvg += 1;

    const device = typeof window !== 'undefined' && window.innerWidth < 768 ? 'Mobile' : 'Desktop';
    this.logEventToFirestore('visit', `Nova visita iniciada (${device})`);
    this.saveLocalCache();
    this.syncToFirestore();
  }

  // Detect visitor's real world location (Country, City, Flag) via GeoIP
  private async detectVisitorLocation() {
    try {
      const res = await fetch('https://ipwho.is/');
      if (!res.ok) throw new Error('ipwho failed');
      const geo = await res.json();

      if (geo && geo.success !== false && geo.country) {
        const flagEmoji = geo.flag?.emoji || this.getFlagEmoji(geo.country_code);
        const ip = geo.ip || '168.205.108.132';
        const isIpExcluded = this.excludedIPs.includes(ip) || this.isDeviceExcluded;

        this.currentVisitorLocation = {
          ip,
          country: geo.country,
          countryCode: geo.country_code || '',
          region: geo.region || '',
          city: geo.city || '',
          flag: flagEmoji,
          loaded: true,
          isExcluded: isIpExcluded
        };

        // If IP is excluded, do NOT add to country analytics!
        if (isIpExcluded) {
          this.notifyListeners();
          return;
        }

        const cName = geo.country;
        if (!this.data.countries[cName]) {
          this.data.countries[cName] = {
            country: cName,
            countryCode: geo.country_code || '',
            flag: flagEmoji,
            count: 0,
            cities: []
          };
        }

        this.data.countries[cName].count += 1;
        if (geo.city && !this.data.countries[cName].cities.includes(geo.city)) {
          this.data.countries[cName].cities.push(geo.city);
        }

        this.logEventToFirestore(
          'geo',
          `Visita registrada: ${geo.city ? geo.city + ', ' : ''}${cName}`,
          `${geo.city || ''} ${cName}`,
          flagEmoji
        );

        this.saveLocalCache();
        this.syncToFirestore();
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
          const ip = geo2.ipAddress || '168.205.108.132';
          const isIpExcluded = this.excludedIPs.includes(ip) || this.isDeviceExcluded;

          this.currentVisitorLocation = {
            ip,
            country: geo2.countryName,
            countryCode: geo2.countryCode || '',
            region: geo2.regionName || '',
            city: geo2.cityName || '',
            flag: flag,
            loaded: true,
            isExcluded: isIpExcluded
          };

          if (isIpExcluded) {
            this.notifyListeners();
            return;
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
          this.syncToFirestore();
          this.notifyListeners();
        }
      } catch {
        this.currentVisitorLocation = {
          ip: '168.205.108.132',
          country: 'Brasil',
          countryCode: 'BR',
          region: 'Paraiba',
          city: 'Campina Grande',
          flag: '🇧🇷',
          loaded: true,
          isExcluded: true
        };
        this.notifyListeners();
      }
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
            // Only update global database if NOT excluded
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
      // If this IP or device is excluded (admin/owner), never track any click
      if (this.isExcluded()) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Ignore any click inside the analytics modal or with data-analytics-ignore
      if (target.closest('[data-analytics-ignore], #analytics-modal, .analytics-modal-container')) {
        return;
      }

      const trackableEl = target.closest('[data-button-name], [data-aff-track], button, a') as HTMLElement | null;
      if (trackableEl) {
        // Also ensure the trackable button is not inside modal
        if (trackableEl.closest('[data-analytics-ignore], #analytics-modal, .analytics-modal-container')) {
          return;
        }

        let name = trackableEl.getAttribute('data-button-name');
        if (!name) {
          name = trackableEl.innerText?.trim().slice(0, 35) || 'Botão';
        }
        
        // Skip analytics modal close/reset/tab clicks
        if (
          name.includes('Telemetry') || 
          name.includes('Analytics') || 
          name.includes('Fechar') || 
          name.includes('Zerar') || 
          name.includes('Limpar') ||
          name.includes('Bloquear') ||
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

    // Track dwell duration every 5s (only for non-admin visitors)
    setInterval(() => {
      if (!this.isExcluded()) {
        this.data.totalTimeSeconds += 5;
        this.saveLocalCache();
        this.syncToFirestore();
      }
    }, 5000);
  }

  private handleScrollMilestone(depth: number) {
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
      this.logEventToFirestore('scroll', `Rolou até: ${label} [${depth}%]`);
      this.saveLocalCache();
      this.syncToFirestore();
    }
  }

  public recordClick(buttonName: string) {
    // If this IP or device is excluded, completely ignore and never increment anything!
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
    this.data.buttonClicks[buttonName].lastClicked = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    this.logEventToFirestore('click', `Clicou em: "${buttonName}"`);
    this.saveLocalCache();
    this.syncToFirestore();
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
      recentEvents: [
        {
          type: 'visit',
          detail: 'Banco Firestore limpo com sucesso. IP do administrador bloqueado.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }
      ]
    };
    this.currentSessionClicks = 0;
    this.saveLocalCache();
    await this.syncToFirestore();
    this.notifyListeners();
  }
}

export const tracker = new RealAnalyticsTracker();
