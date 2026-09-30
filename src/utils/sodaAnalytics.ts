// SodaTide Real-Time Analytics Engine with Firebase Firestore Atomic Persistence
// Supports Individual Per-Visitor Journey Logs, Buttons Clicked & Cookie Allow/Close Tracking

import { 
  doc, 
  updateDoc, 
  increment, 
  getDoc, 
  getDocs,
  setDoc,
  deleteDoc,
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

export interface VisitorTimelineEvent {
  time: string;
  text: string;
  type: 'visit' | 'click' | 'cookie' | 'scroll' | 'exit';
}

export interface VisitorSessionProfile {
  id: string;
  visitorId: string;
  ip: string;
  city: string;
  country: string;
  countryCode: string;
  flag: string;
  device: 'Mobile' | 'Desktop';
  enteredAt: string;
  enteredTimeFormatted: string;
  lastActiveAt: string;
  durationSeconds: number;
  maxScrollPercent: number;
  maxScrollSection: string;
  cookieAction: 'allow' | 'close' | 'ignored';
  buttonsClicked: Array<{
    name: string;
    timestamp: string;
  }>;
  actionsCount: number;
  outcome: 'allow' | 'close' | 'checkout' | 'bounced_no_clicks';
  timeline: VisitorTimelineEvent[];
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
  cookieAllowClicks: number;
  cookieCloseClicks: number;
  bouncedVisits: number;
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

const STORAGE_KEY = 'sodatide_real_analytics_firestore_v7';
const SESSIONS_STORAGE_KEY = 'sodatide_visitor_sessions_v7';
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
  cookieAllowClicks: 0,
  cookieCloseClicks: 0,
  bouncedVisits: 0,
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
  private currentSessionId: string;
  private currentSessionProfile: VisitorSessionProfile | null = null;
  private visitorSessions: VisitorSessionProfile[] = [];
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
    this.currentSessionId = 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
    this.initAdminDetection();
    this.data = this.loadLocalCache();
    this.visitorSessions = this.loadLocalSessions();
    this.initFirestoreSync();
    this.initSession();
    this.initListeners();
    this.detectVisitorLocation();
  }

  private initAdminDetection() {
    try {
      localStorage.removeItem(ADMIN_DEVICE_KEY);
      localStorage.removeItem(ADMIN_FILTER_TOGGLE_KEY);
      this.isKnownAdminDevice = false;
      this.isFilterActive = false;
      this.currentVisitorLocation.isExcluded = false;
    } catch {
      this.isKnownAdminDevice = false;
      this.isFilterActive = false;
      this.currentVisitorLocation.isExcluded = false;
    }
  }

  public markAsAdminDevice() {
    // Keep tracking enabled so testing records seamlessly
    this.isKnownAdminDevice = false;
    this.currentVisitorLocation.isExcluded = false;
    this.notifyListeners();
  }

  public isFilterEnabled(): boolean {
    return false;
  }

  public toggleFilter(_enable: boolean) {
    this.isFilterActive = false;
    this.currentVisitorLocation.isExcluded = false;
    this.notifyListeners();
  }

  public isExcluded(): boolean {
    // Always return false so every visitor and owner test session is recorded!
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

  private loadLocalSessions(): VisitorSessionProfile[] {
    try {
      const stored = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return [];
  }

  private saveLocalSessions() {
    try {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(this.visitorSessions.slice(0, 50)));
    } catch {
      // Ignore
    }
  }

  private getVisitorUid(): string {
    try {
      let uid = localStorage.getItem(UID_KEY);
      if (!uid) {
        uid = 'v_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
        localStorage.setItem(UID_KEY, uid);
      }
      return uid;
    } catch {
      return 'v_' + Math.random().toString(36).substring(2, 9);
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
            cookieAllowClicks: remote.cookieAllowClicks ?? 0,
            cookieCloseClicks: remote.cookieCloseClicks ?? 0,
            bouncedVisits: remote.bouncedVisits ?? 0,
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
      }, () => {
        // Fallback offline
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
      }, () => {});

      // Live listener to individual visitor sessions collection
      const sessionsRef = collection(db, 'analytics_sessions');
      const qSessions = query(sessionsRef, orderBy('lastActiveAt', 'desc'), limit(60));
      onSnapshot(qSessions, (snapshot) => {
        const sessions: VisitorSessionProfile[] = [];
        snapshot.forEach((d) => {
          const item = d.data() as VisitorSessionProfile;
          sessions.push({ ...item, id: d.id });
        });
        if (sessions.length > 0) {
          this.visitorSessions = sessions;
          this.saveLocalSessions();
          this.notifyListeners();
        }
      }, () => {});

    } catch {
      // Graceful fallback
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
        cookieAllowClicks: this.data.cookieAllowClicks,
        cookieCloseClicks: this.data.cookieCloseClicks,
        bouncedVisits: this.data.bouncedVisits,
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
    if (this.sessionCountedInTab) return;
    if (this.isExcluded()) return;

    this.recordVisit();
  }

  private async recordVisit() {
    if (this.sessionCountedInTab) return;
    this.sessionCountedInTab = true;

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

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const device = typeof window !== 'undefined' && window.innerWidth < 768 ? 'Mobile' : 'Desktop';

    // Increment local state immediately
    this.data.totalVisits += 1;
    if (isUnique) {
      this.data.uniqueVisitors += 1;
    }
    this.data.sessionCountForAvg += 1;
    // Default outcome is bounced until user clicks a button
    this.data.bouncedVisits += 1;
    this.saveLocalCache();

    // Create current visitor session profile
    this.currentSessionProfile = {
      id: this.currentSessionId,
      visitorId: this.getVisitorUid(),
      ip: this.currentVisitorLocation.ip || 'Visitante Online',
      city: this.currentVisitorLocation.city || '',
      country: this.currentVisitorLocation.country !== 'Detectando...' ? this.currentVisitorLocation.country : 'Detectando...',
      countryCode: this.currentVisitorLocation.countryCode || '',
      flag: this.currentVisitorLocation.flag || '🌍',
      device,
      enteredAt: now.toISOString(),
      enteredTimeFormatted: timeStr,
      lastActiveAt: now.toISOString(),
      durationSeconds: 0,
      maxScrollPercent: 0,
      maxScrollSection: 'Hero (Início da Página)',
      cookieAction: 'ignored',
      buttonsClicked: [],
      actionsCount: 0,
      outcome: 'bounced_no_clicks',
      timeline: [
        {
          time: timeStr,
          text: `🚀 Entrou na página (${device})`,
          type: 'visit'
        }
      ]
    };

    // Add to local sessions
    this.visitorSessions = [this.currentSessionProfile, ...this.visitorSessions.filter(s => s.id !== this.currentSessionId)];
    this.saveLocalSessions();
    this.notifyListeners();

    // Persist visit and session to Firestore atomically
    try {
      const summaryRef = doc(db, 'analytics_summary', 'global_metrics');
      const snap = await getDoc(summaryRef);
      if (snap.exists()) {
        await updateDoc(summaryRef, {
          totalVisits: increment(1),
          uniqueVisitors: isUnique ? increment(1) : increment(0),
          sessionCountForAvg: increment(1),
          bouncedVisits: increment(1),
          lastUpdated: new Date().toISOString()
        });
      } else {
        await this.syncToFirestore();
      }

      // Add session doc in Firestore
      const sessionRef = doc(db, 'analytics_sessions', this.currentSessionId);
      await setDoc(sessionRef, this.currentSessionProfile);

      // Add live event
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

  private async updateCurrentSessionInFirestore() {
    if (!this.currentSessionProfile || this.isExcluded()) return;
    try {
      const sessionRef = doc(db, 'analytics_sessions', this.currentSessionId);
      await setDoc(sessionRef, this.currentSessionProfile, { merge: true });
    } catch (e) {
      // Fallback
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

        if (ip === OWNER_IP) {
          this.markAsAdminDevice();
          this.notifyListeners();
          return;
        }

        // Update current session profile with detected geolocation
        if (this.currentSessionProfile) {
          this.currentSessionProfile.country = geo.country;
          this.currentSessionProfile.countryCode = geo.country_code || '';
          this.currentSessionProfile.city = geo.city || '';
          this.currentSessionProfile.flag = flagEmoji;
          this.currentSessionProfile.ip = ip;
          this.updateCurrentSessionInFirestore();
        }

        if (!this.isExcluded()) {
          if (!this.sessionCountedInTab) {
            this.recordVisit();
          }

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

          if (this.currentSessionProfile) {
            this.currentSessionProfile.country = geo2.countryName;
            this.currentSessionProfile.countryCode = geo2.countryCode || '';
            this.currentSessionProfile.city = geo2.cityName || '';
            this.currentSessionProfile.flag = flag;
            this.currentSessionProfile.ip = ip;
            this.updateCurrentSessionInFirestore();
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
          }

          this.notifyListeners();
          return;
        }
      } catch {
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
              this.updateSessionScroll(depth);
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

    // Active session duration updater
    setInterval(() => {
      if (!this.isExcluded()) {
        this.data.totalTimeSeconds += 5;
        this.saveLocalCache();

        if (this.currentSessionProfile) {
          this.currentSessionProfile.durationSeconds += 5;
          this.currentSessionProfile.lastActiveAt = new Date().toISOString();
          // Update in visitor sessions list
          this.visitorSessions = this.visitorSessions.map(s => 
            s.id === this.currentSessionId ? { ...this.currentSessionProfile! } : s
          );
          this.saveLocalSessions();
          this.notifyListeners();

          // Sync to Firestore periodically
          if (this.currentSessionProfile.durationSeconds % 15 === 0) {
            this.updateCurrentSessionInFirestore();
          }
        }
      }
    }, 5000);

    // Flush on page unload / leave
    window.addEventListener('beforeunload', () => {
      if (this.currentSessionProfile && !this.isExcluded()) {
        this.currentSessionProfile.lastActiveAt = new Date().toISOString();
        this.updateCurrentSessionInFirestore();
      }
    });
  }

  private updateSessionScroll(depth: number) {
    if (!this.currentSessionProfile) return;
    
    let sectionName = 'Hero (Início da Página)';
    if (depth > 85) sectionName = 'Garantia & Rodapé';
    else if (depth > 65) sectionName = 'Tabela de Preços & Ofertas';
    else if (depth > 40) sectionName = 'Resultados Clínicos & Eficácia';
    else if (depth > 20) sectionName = 'Ingredientes & Mecanismo';

    this.currentSessionProfile.maxScrollPercent = depth;
    this.currentSessionProfile.maxScrollSection = sectionName;

    // Add milestone event to session timeline every 25%
    const milestones = [25, 50, 75, 100];
    const prevDepth = this.currentSessionProfile.maxScrollPercent;
    for (const m of milestones) {
      if (depth >= m && prevDepth < m) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        this.currentSessionProfile.timeline.push({
          time: timeStr,
          text: `📜 Rolou até ${m}% (${sectionName})`,
          type: 'scroll'
        });
        break;
      }
    }

    this.visitorSessions = this.visitorSessions.map(s => 
      s.id === this.currentSessionId ? { ...this.currentSessionProfile! } : s
    );
    this.saveLocalSessions();
    this.notifyListeners();
    this.updateCurrentSessionInFirestore();
  }

  private handleScrollMilestone(depth: number) {
    let milestoneKey: keyof RealAnalyticsData['scrollMilestones'] | null = null;
    let label = '';

    if (depth >= 90) {
      milestoneKey = 'footer';
      label = 'Rodapé & Referências';
    } else if (depth >= 75) {
      milestoneKey = 'guarantee';
      label = 'Garantia de 180 Dias';
    } else if (depth >= 60) {
      milestoneKey = 'pricing';
      label = 'Tabela de Preços';
    } else if (depth >= 40) {
      milestoneKey = 'efficacy';
      label = 'Resultados Clínicos';
    } else if (depth >= 20) {
      milestoneKey = 'ingredients';
      label = 'Ingredientes Naturais';
    }

    if (milestoneKey) {
      this.data.scrollMilestones[milestoneKey] += 1;
      this.saveLocalCache();
      this.notifyListeners();

      try {
        const summaryRef = doc(db, 'analytics_summary', 'global_metrics');
        updateDoc(summaryRef, {
          [`scrollMilestones.${milestoneKey}`]: increment(1),
          maxScrollDepthPercent: Math.max(this.data.maxScrollDepthPercent, depth),
          lastUpdated: new Date().toISOString()
        }).catch(() => {});
      } catch {
        // Fallback
      }
    }
  }

  // Explicit tracking for Cookie Policy "Allow" and "Close" buttons
  public async recordCookieAction(action: 'allow' | 'close') {
    if (this.isExcluded()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (action === 'allow') {
      this.data.cookieAllowClicks = (this.data.cookieAllowClicks || 0) + 1;
      this.recordClick('Cookie Policy: Allow');
    } else {
      this.data.cookieCloseClicks = (this.data.cookieCloseClicks || 0) + 1;
      this.recordClick('Cookie Policy: Close');
    }

    if (this.currentSessionProfile) {
      this.currentSessionProfile.cookieAction = action;
      if (action === 'allow') {
        this.currentSessionProfile.outcome = 'allow';
        this.currentSessionProfile.timeline.push({
          time: timeStr,
          text: '🟢 Apertou "Allow" no Cookie Policy (Redirecionamento Oficial)',
          type: 'cookie'
        });
      } else {
        this.currentSessionProfile.outcome = 'close';
        this.currentSessionProfile.timeline.push({
          time: timeStr,
          text: '🟡 Apertou "Close" no Cookie Policy (Fechou o aviso)',
          type: 'cookie'
        });
      }

      this.visitorSessions = this.visitorSessions.map(s => 
        s.id === this.currentSessionId ? { ...this.currentSessionProfile! } : s
      );
      this.saveLocalSessions();
      this.notifyListeners();
      this.updateCurrentSessionInFirestore();
    }

    try {
      const summaryRef = doc(db, 'analytics_summary', 'global_metrics');
      await updateDoc(summaryRef, {
        cookieAllowClicks: this.data.cookieAllowClicks,
        cookieCloseClicks: this.data.cookieCloseClicks,
        lastUpdated: new Date().toISOString()
      });
    } catch {
      // Fallback
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
                       buttonName.toLowerCase().includes('frasco') ||
                       buttonName.toLowerCase().includes('buy');

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

    // Update current session profile
    if (this.currentSessionProfile) {
      this.currentSessionProfile.actionsCount += 1;
      this.currentSessionProfile.buttonsClicked.push({
        name: buttonName,
        timestamp: timeStr
      });

      // Update outcome
      if (isCheckout) {
        this.currentSessionProfile.outcome = 'checkout';
        this.currentSessionProfile.timeline.push({
          time: timeStr,
          text: `🛒 Clicou para Comprar: "${buttonName}"`,
          type: 'click'
        });
      } else if (!buttonName.includes('Cookie Policy')) {
        this.currentSessionProfile.timeline.push({
          time: timeStr,
          text: `🖱️ Clicou no botão: "${buttonName}"`,
          type: 'click'
        });
        if (this.currentSessionProfile.outcome === 'bounced_no_clicks') {
          this.currentSessionProfile.outcome = 'close';
        }
      }

      this.visitorSessions = this.visitorSessions.map(s => 
        s.id === this.currentSessionId ? { ...this.currentSessionProfile! } : s
      );
      this.saveLocalSessions();
      this.updateCurrentSessionInFirestore();
    }

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

  public getVisitorSessions(): VisitorSessionProfile[] {
    return this.visitorSessions;
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
      cookieAllowClicks: 0,
      cookieCloseClicks: 0,
      bouncedVisits: 0,
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
    this.currentSessionProfile = null;
    this.visitorSessions = [];

    this.saveLocalCache();
    this.saveLocalSessions();

    try {
      const summaryRef = doc(db, 'analytics_summary', 'global_metrics');
      await setDoc(summaryRef, {
        isRealOnly: true,
        totalVisits: 0,
        uniqueVisitors: 0,
        totalTimeSeconds: 0,
        sessionCountForAvg: 0,
        maxScrollDepthPercent: 0,
        totalClicks: 0,
        checkoutClicks: 0,
        cookieAllowClicks: 0,
        cookieCloseClicks: 0,
        bouncedVisits: 0,
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
        lastUpdated: new Date().toISOString()
      });

      // Clear sessions in Firestore
      const sessionsSnap = await getDocs(query(collection(db, 'analytics_sessions'), limit(100)));
      const sessionDeletes = sessionsSnap.docs.map(d => deleteDoc(d.ref));
      await Promise.all(sessionDeletes);

      // Clear events in Firestore
      const eventsSnap = await getDocs(query(collection(db, 'analytics_events'), limit(100)));
      const eventDeletes = eventsSnap.docs.map(d => deleteDoc(d.ref));
      await Promise.all(eventDeletes);

      this.isFirebaseConnected = true;
    } catch (err) {
      console.warn('Firestore reset warning:', err);
    }

    this.notifyListeners();
  }
}

export const tracker = new RealAnalyticsTracker();
