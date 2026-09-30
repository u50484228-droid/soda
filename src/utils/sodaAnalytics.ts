// SodaTide Real-Time Analytics Engine with Firebase Firestore Atomic Persistence
// Supports Individual Per-Visitor Journey Logs, Buttons Clicked with Exact City & Country Telemetry

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

export interface VisitorButtonClicked {
  name: string;
  timestamp: string;
  location: string;
  flag: string;
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
  buttonsClicked: VisitorButtonClicked[];
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
      locations?: { [locName: string]: number };
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

const STORAGE_KEY = 'sodatide_real_analytics_firestore_v8';
const SESSIONS_STORAGE_KEY = 'sodatide_visitor_sessions_v8';
const UID_KEY = 'sodatide_unique_visitor_id';
const BLOCKED_IPS_KEY = 'sodatide_blocked_ips_v2';
const DEVICE_BLOCKED_KEY = 'sodatide_device_blocked_v2';

// Fast client-side timezone detection for instantaneous country & city resolution
function detectImmediateClientGeo(): { country: string; countryCode: string; city: string; flag: string } {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Sao_Paulo')) return { country: 'Brasil', countryCode: 'BR', city: 'São Paulo', flag: '🇧🇷' };
    if (tz.includes('Fortaleza')) return { country: 'Brasil', countryCode: 'BR', city: 'Fortaleza', flag: '🇧🇷' };
    if (tz.includes('Recife')) return { country: 'Brasil', countryCode: 'BR', city: 'Recife', flag: '🇧🇷' };
    if (tz.includes('Bahia') || tz.includes('Salvador')) return { country: 'Brasil', countryCode: 'BR', city: 'Salvador', flag: '🇧🇷' };
    if (tz.includes('Manaus')) return { country: 'Brasil', countryCode: 'BR', city: 'Manaus', flag: '🇧🇷' };
    if (tz.includes('Belem')) return { country: 'Brasil', countryCode: 'BR', city: 'Belém', flag: '🇧🇷' };
    if (tz.includes('Cuiaba')) return { country: 'Brasil', countryCode: 'BR', city: 'Cuiabá', flag: '🇧🇷' };
    if (tz.includes('Campo_Grande')) return { country: 'Brasil', countryCode: 'BR', city: 'Campo Grande', flag: '🇧🇷' };
    if (tz.includes('Porto_Velho')) return { country: 'Brasil', countryCode: 'BR', city: 'Porto Velho', flag: '🇧🇷' };
    if (tz.includes('Rio_Branco')) return { country: 'Brasil', countryCode: 'BR', city: 'Rio Branco', flag: '🇧🇷' };
    if (tz.includes('Lisbon')) return { country: 'Portugal', countryCode: 'PT', city: 'Lisboa', flag: '🇵🇹' };
    if (tz.includes('New_York')) return { country: 'United States', countryCode: 'US', city: 'New York', flag: '🇺🇸' };
    if (tz.includes('Chicago')) return { country: 'United States', countryCode: 'US', city: 'Chicago', flag: '🇺🇸' };
    if (tz.includes('Los_Angeles')) return { country: 'United States', countryCode: 'US', city: 'Los Angeles', flag: '🇺🇸' };
    if (tz.includes('Miami')) return { country: 'United States', countryCode: 'US', city: 'Miami', flag: '🇺🇸' };
    if (tz.includes('London')) return { country: 'United Kingdom', countryCode: 'GB', city: 'London', flag: '🇬🇧' };
    if (tz.includes('America/')) {
      const cityClean = tz.replace('America/', '').replace('_', ' ');
      return { country: 'Brasil', countryCode: 'BR', city: cityClean, flag: '🇧🇷' };
    }
  } catch {
    // Ignore
  }
  return { country: 'Brasil', countryCode: 'BR', city: 'São Paulo', flag: '🇧🇷' };
}

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
  private currentSessionId: string;
  private currentSessionProfile: VisitorSessionProfile | null = null;
  private visitorSessions: VisitorSessionProfile[] = [];
  private currentVisitorLocation: VisitorLocation;
  private listeners: Array<() => void> = [];
  private sessionCountedInTab: boolean = false;
  private blockedIps: string[] = [];
  private isDeviceBlocked: boolean = false;

  constructor() {
    this.currentSessionStartTime = Date.now();
    this.currentSessionId = 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
    
    // Load blocked IPs and device state
    try {
      const storedBlocked = localStorage.getItem(BLOCKED_IPS_KEY);
      if (storedBlocked) {
        this.blockedIps = JSON.parse(storedBlocked);
      }
      this.isDeviceBlocked = localStorage.getItem(DEVICE_BLOCKED_KEY) === 'true';
    } catch {
      // Ignore
    }

    // Immediate locale resolution so it never stays as "Detectando..."
    const instantGeo = detectImmediateClientGeo();
    this.currentVisitorLocation = {
      ip: '',
      country: instantGeo.country,
      countryCode: instantGeo.countryCode,
      region: '',
      city: instantGeo.city,
      flag: instantGeo.flag,
      loaded: false,
      isExcluded: this.isDeviceBlocked
    };

    this.data = this.loadLocalCache();
    this.visitorSessions = this.loadLocalSessions();
    this.initFirestoreSync();
    this.initSession();
    this.initListeners();
    this.detectVisitorLocation();
  }

  public isCurrentIpBlocked(): boolean {
    if (this.isDeviceBlocked) return true;
    const ip = this.currentVisitorLocation.ip;
    if (ip && this.blockedIps.includes(ip)) return true;
    return false;
  }

  public blockCurrentIp(specificIp?: string): boolean {
    const ip = specificIp || this.currentVisitorLocation.ip || '168.205.108.132';
    if (ip && !this.blockedIps.includes(ip)) {
      this.blockedIps.push(ip);
    }
    this.isDeviceBlocked = true;
    try {
      localStorage.setItem(BLOCKED_IPS_KEY, JSON.stringify(this.blockedIps));
      localStorage.setItem(DEVICE_BLOCKED_KEY, 'true');
    } catch {
      // Ignore
    }
    this.currentVisitorLocation.isExcluded = true;
    this.notifyListeners();
    return true;
  }

  public unblockCurrentIp(specificIp?: string): boolean {
    const ip = specificIp || this.currentVisitorLocation.ip;
    if (ip) {
      this.blockedIps = this.blockedIps.filter(item => item !== ip);
    }
    this.isDeviceBlocked = false;
    try {
      localStorage.setItem(BLOCKED_IPS_KEY, JSON.stringify(this.blockedIps));
      localStorage.removeItem(DEVICE_BLOCKED_KEY);
    } catch {
      // Ignore
    }
    this.currentVisitorLocation.isExcluded = false;
    this.notifyListeners();
    return false;
  }

  public toggleBlockCurrentIp(): boolean {
    if (this.isCurrentIpBlocked()) {
      return this.unblockCurrentIp();
    } else {
      return this.blockCurrentIp();
    }
  }

  public markAsAdminDevice() {
    this.notifyListeners();
  }

  public isFilterEnabled(): boolean {
    return this.isCurrentIpBlocked();
  }

  public toggleFilter(_enable: boolean) {
    this.toggleBlockCurrentIp();
  }

  public isExcluded(): boolean {
    return this.isCurrentIpBlocked();
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
      }, () => {});

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
    if (this.isExcluded()) return;
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
    const locStr = this.currentVisitorLocation.city 
      ? `${this.currentVisitorLocation.city}, ${this.currentVisitorLocation.country}`
      : this.currentVisitorLocation.country;

    // Increment local state immediately
    this.data.totalVisits += 1;
    if (isUnique) {
      this.data.uniqueVisitors += 1;
    }
    this.data.sessionCountForAvg += 1;
    this.data.bouncedVisits += 1;
    this.saveLocalCache();

    // Create current visitor session profile
    this.currentSessionProfile = {
      id: this.currentSessionId,
      visitorId: this.getVisitorUid(),
      ip: this.currentVisitorLocation.ip || 'Identificando...',
      city: this.currentVisitorLocation.city,
      country: this.currentVisitorLocation.country,
      countryCode: this.currentVisitorLocation.countryCode,
      flag: this.currentVisitorLocation.flag,
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
          text: `🚀 Entrou na página (${device}) — Origem: ${this.currentVisitorLocation.flag} ${locStr}`,
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
        location: locStr,
        flag: this.currentVisitorLocation.flag,
        timestamp: timeStr,
        createdAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Failed to record visit to Firestore:', e);
    }
  }

  private async updateCurrentSessionInFirestore() {
    if (!this.currentSessionProfile) return;
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
    // 1. Try ipwho.is
    try {
      const res = await fetch('https://ipwho.is/');
      if (res.ok) {
        const geo = await res.json();
        if (geo && geo.success !== false && geo.country) {
          this.applyResolvedGeo(
            geo.ip || '',
            geo.country,
            geo.country_code || 'BR',
            geo.city || '',
            geo.region || '',
            geo.flag?.emoji || this.getFlagEmoji(geo.country_code)
          );
          return;
        }
      }
    } catch {
      // Ignore and fallback
    }

    // 2. Try freeipapi.com
    try {
      const res2 = await fetch('https://freeipapi.com/api/json');
      if (res2.ok) {
        const geo2 = await res2.json();
        if (geo2 && geo2.countryName) {
          this.applyResolvedGeo(
            geo2.ipAddress || '',
            geo2.countryName,
            geo2.countryCode || 'BR',
            geo2.cityName || '',
            geo2.regionName || '',
            this.getFlagEmoji(geo2.countryCode)
          );
          return;
        }
      }
    } catch {
      // Ignore and fallback
    }

    // 3. Try ipapi.co
    try {
      const res3 = await fetch('https://ipapi.co/json/');
      if (res3.ok) {
        const geo3 = await res3.json();
        if (geo3 && geo3.country_name) {
          this.applyResolvedGeo(
            geo3.ip || '',
            geo3.country_name,
            geo3.country_code || 'BR',
            geo3.city || '',
            geo3.region || '',
            this.getFlagEmoji(geo3.country_code)
          );
          return;
        }
      }
    } catch {
      // Keep immediate timezone geo
    }
  }

  private applyResolvedGeo(
    ip: string, 
    country: string, 
    countryCode: string, 
    city: string, 
    region: string, 
    flag: string
  ) {
    this.currentVisitorLocation = {
      ip,
      country,
      countryCode,
      region,
      city,
      flag,
      loaded: true,
      isExcluded: false
    };

    // Update current session profile
    if (this.currentSessionProfile) {
      this.currentSessionProfile.country = country;
      this.currentSessionProfile.countryCode = countryCode;
      this.currentSessionProfile.city = city;
      this.currentSessionProfile.flag = flag;
      this.currentSessionProfile.ip = ip;
      
      // Update in visitorSessions array and local storage
      this.visitorSessions = this.visitorSessions.map(s => 
        s.id === this.currentSessionId ? { ...this.currentSessionProfile! } : s
      );
      this.saveLocalSessions();
      this.updateCurrentSessionInFirestore();
    }

    // Register country stats
    if (!this.data.countries[country]) {
      this.data.countries[country] = {
        country,
        countryCode,
        flag,
        count: 0,
        cities: []
      };
    }
    this.data.countries[country].count += 1;
    if (city && !this.data.countries[country].cities.includes(city)) {
      this.data.countries[country].cities.push(city);
    }

    this.saveLocalCache();
    this.syncToFirestore();
    this.notifyListeners();
  }

  private initListeners() {
    if (typeof window === 'undefined') return;

    // Scroll depth tracking
    let scrollTimeout: any = null;
    window.addEventListener('scroll', () => {
      if (this.isExcluded()) return;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const depth = Math.min(100, Math.round((scrollTop / docHeight) * 100));
          if (depth > this.currentSessionMaxDepth) {
            this.currentSessionMaxDepth = depth;
            if (depth > this.data.maxScrollDepthPercent) {
              this.data.maxScrollDepthPercent = depth;
            }
            this.handleScrollMilestone(depth);
            this.updateSessionScroll(depth);
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
      if (this.isExcluded()) return;
      this.data.totalTimeSeconds += 5;
      this.saveLocalCache();

      if (this.currentSessionProfile) {
        this.currentSessionProfile.durationSeconds += 5;
        this.currentSessionProfile.lastActiveAt = new Date().toISOString();
        this.visitorSessions = this.visitorSessions.map(s => 
          s.id === this.currentSessionId ? { ...this.currentSessionProfile! } : s
        );
        this.saveLocalSessions();
        this.notifyListeners();

        if (this.currentSessionProfile.durationSeconds % 15 === 0) {
          this.updateCurrentSessionInFirestore();
        }
      }
    }, 5000);

    // Flush on page unload / leave
    window.addEventListener('beforeunload', () => {
      if (this.currentSessionProfile) {
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

    if (depth >= 90) milestoneKey = 'footer';
    else if (depth >= 75) milestoneKey = 'guarantee';
    else if (depth >= 60) milestoneKey = 'pricing';
    else if (depth >= 40) milestoneKey = 'efficacy';
    else if (depth >= 20) milestoneKey = 'ingredients';

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

  // Explicit tracking for Cookie Policy "Allow" and "Close" buttons with origin telemetry
  public async recordCookieAction(action: 'allow' | 'close') {
    if (this.isExcluded()) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const locStr = this.currentVisitorLocation.city 
      ? `${this.currentVisitorLocation.city}, ${this.currentVisitorLocation.country}`
      : (this.currentVisitorLocation.country || 'Brasil');
    const flagStr = this.currentVisitorLocation.flag || '🇧🇷';

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
          text: `🟢 Apertou "Allow" no Cookie Policy (Origem: ${flagStr} ${locStr})`,
          type: 'cookie'
        });
      } else {
        this.currentSessionProfile.outcome = 'close';
        this.currentSessionProfile.timeline.push({
          time: timeStr,
          text: `🟡 Apertou "Close" no Cookie Policy (Origem: ${flagStr} ${locStr})`,
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
    if (this.isExcluded()) return;
    this.currentSessionClicks += 1;
    this.data.totalClicks += 1;

    const locStr = this.currentVisitorLocation.city 
      ? `${this.currentVisitorLocation.city}, ${this.currentVisitorLocation.country}`
      : (this.currentVisitorLocation.country || 'Brasil');
    const flagStr = this.currentVisitorLocation.flag || '🇧🇷';

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
        lastClicked: 'Agora',
        locations: {}
      };
    }

    this.data.buttonClicks[buttonName].count += 1;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.data.buttonClicks[buttonName].lastClicked = timeStr;

    // Record city/country telemetria for this specific button click
    if (!this.data.buttonClicks[buttonName].locations) {
      this.data.buttonClicks[buttonName].locations = {};
    }
    this.data.buttonClicks[buttonName].locations![locStr] = 
      (this.data.buttonClicks[buttonName].locations![locStr] || 0) + 1;

    // Update current session profile
    if (this.currentSessionProfile) {
      this.currentSessionProfile.actionsCount += 1;
      this.currentSessionProfile.buttonsClicked.push({
        name: buttonName,
        timestamp: timeStr,
        location: locStr,
        flag: flagStr
      });

      // Update outcome
      if (isCheckout) {
        this.currentSessionProfile.outcome = 'checkout';
        this.currentSessionProfile.timeline.push({
          time: timeStr,
          text: `🛒 Clicou para Comprar: "${buttonName}" (Origem: ${flagStr} ${locStr})`,
          type: 'click'
        });
      } else if (!buttonName.includes('Cookie Policy')) {
        this.currentSessionProfile.timeline.push({
          time: timeStr,
          text: `🖱️ Clicou no botão: "${buttonName}" (Origem: ${flagStr} ${locStr})`,
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
        [`buttonClicks.${buttonName}.locations.${locStr}`]: increment(1),
        lastUpdated: new Date().toISOString()
      });

      await addDoc(collection(db, 'analytics_events'), {
        type: 'click',
        detail: `Clicou em: "${buttonName}" (${flagStr} ${locStr})`,
        location: locStr,
        flag: flagStr,
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
