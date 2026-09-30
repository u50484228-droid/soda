import React, { useState, useEffect } from 'react';
import { 
  X, 
  BarChart3, 
  Clock, 
  MousePointerClick, 
  ArrowDownCircle, 
  ShieldCheck, 
  Users, 
  RefreshCw, 
  RotateCcw,
  Globe2,
  MapPin,
  Laptop,
  Smartphone,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Cookie,
  Layers,
  Compass,
  Eye,
  Filter
} from 'lucide-react';
import { 
  tracker, 
  RealAnalyticsData, 
  VisitorLocation, 
  VisitorSessionProfile 
} from '../utils/sodaAnalytics';

interface SodaAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SodaAnalyticsModal: React.FC<SodaAnalyticsModalProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<RealAnalyticsData>(tracker.getData());
  const [visitorLocation, setVisitorLocation] = useState<VisitorLocation>(tracker.getCurrentVisitorLocation());
  const [sessions, setSessions] = useState<VisitorSessionProfile[]>(tracker.getVisitorSessions());
  const [activeTab, setActiveTab] = useState<'sessions' | 'clicks' | 'scroll'>('sessions');
  const [sessionFilter, setSessionFilter] = useState<'all' | 'allow' | 'close' | 'bounced_no_clicks' | 'checkout'>('all');
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);
  const [currentSession, setCurrentSession] = useState(tracker.getCurrentSessionStats());
  const [isResetConfirm, setIsResetConfirm] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Mark current device as admin
    tracker.markAsAdminDevice();

    // Subscribe to real-time events
    const unsubscribe = tracker.subscribe(() => {
      setData({ ...tracker.getData() });
      setVisitorLocation({ ...tracker.getCurrentVisitorLocation() });
      setSessions([...tracker.getVisitorSessions()]);
    });

    // Tick session timer every second
    const interval = setInterval(() => {
      setCurrentSession(tracker.getCurrentSessionStats());
      setVisitorLocation(tracker.getCurrentVisitorLocation());
      setSessions([...tracker.getVisitorSessions()]);
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatSeconds = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const handleResetToZero = async () => {
    setIsResetting(true);
    try {
      await tracker.resetToZero();
      setData({ ...tracker.getData() });
      setSessions([]);
      setCurrentSession(tracker.getCurrentSessionStats());
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3500);
    } catch (err) {
      console.error('Erro ao resetar banco:', err);
    } finally {
      setIsResetting(false);
      setIsResetConfirm(false);
    }
  };

  const sortedButtons = Object.entries(data.buttonClicks)
    .sort(([, a], [, b]) => b.count - a.count);

  // Filter sessions based on user selection
  const filteredSessions = sessions.filter(s => {
    if (sessionFilter === 'all') return true;
    if (sessionFilter === 'allow') return s.cookieAction === 'allow' || s.outcome === 'allow';
    if (sessionFilter === 'close') return s.cookieAction === 'close' || s.outcome === 'close';
    if (sessionFilter === 'bounced_no_clicks') {
      return s.outcome === 'bounced_no_clicks' || s.buttonsClicked.length === 0;
    }
    if (sessionFilter === 'checkout') return s.outcome === 'checkout';
    return true;
  });

  // Calculate counts for filters
  const totalCount = sessions.length;
  const allowCount = sessions.filter(s => s.cookieAction === 'allow' || s.outcome === 'allow').length;
  const closeCount = sessions.filter(s => s.cookieAction === 'close' || s.outcome === 'close').length;
  const bouncedCount = sessions.filter(s => s.outcome === 'bounced_no_clicks' || s.buttonsClicked.length === 0).length;
  const checkoutCount = sessions.filter(s => s.outcome === 'checkout').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        id="analytics-modal"
        data-analytics-ignore="true"
        className="analytics-modal-container bg-slate-900 border border-slate-700/80 text-white rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ================= MODAL HEADER ================= */}
        <div className="p-5 sm:p-6 bg-slate-950/95 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Painel de Tráfego & Log dos Visitantes em Tempo Real
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 bg-amber-950/60 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                  <span>🔥</span>
                  <span>Firebase Conectado</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Ao Vivo
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Acompanhe quem entrou, de qual país/cidade, quais botões apertou (Allow, Close, Checkout) ou se saiu sem clicar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setData({ ...tracker.getData() });
                setSessions([...tracker.getVisitorSessions()]);
                setVisitorLocation(tracker.getCurrentVisitorLocation());
              }}
              title="Atualizar Dados"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= TOP METRICS CARDS (FOCUSED ON VISITOR BEHAVIOR) ================= */}
        <div className="p-4 sm:p-5 bg-slate-950/50 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-5 gap-3">
          
          {/* Card 1: Total Visitantes */}
          <div className="bg-slate-850/80 p-3.5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Visitantes</span>
              <Users className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="mt-1">
              <span className="text-2xl font-black text-white">{data.totalVisits}</span>
              <span className="text-[10px] text-slate-400 block">{data.uniqueVisitors} únicos</span>
            </div>
          </div>

          {/* Card 2: Apertou Allow (Cookie) */}
          <div className="bg-slate-850/80 p-3.5 rounded-2xl border border-emerald-900/40 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-400 text-xs font-semibold">
              <span>Apertou "Allow"</span>
              <Cookie className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="mt-1">
              <span className="text-2xl font-black text-emerald-400">{data.cookieAllowClicks || allowCount}</span>
              <span className="text-[10px] text-emerald-300/80 block">Foram p/ afiliado</span>
            </div>
          </div>

          {/* Card 3: Apertou Close (Cookie) */}
          <div className="bg-slate-850/80 p-3.5 rounded-2xl border border-amber-900/40 flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-400 text-xs font-semibold">
              <span>Apertou "Close"</span>
              <XCircle className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="mt-1">
              <span className="text-2xl font-black text-amber-400">{data.cookieCloseClicks || closeCount}</span>
              <span className="text-[10px] text-amber-300/80 block">Fecharam aviso</span>
            </div>
          </div>

          {/* Card 4: Saiu sem Clicar (Zero Cliques) */}
          <div className="bg-slate-850/80 p-3.5 rounded-2xl border border-rose-900/40 flex flex-col justify-between">
            <div className="flex items-center justify-between text-rose-400 text-xs font-semibold">
              <span>Apenas Entrou e Saiu</span>
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="mt-1">
              <span className="text-2xl font-black text-rose-400">{data.bouncedVisits || bouncedCount}</span>
              <span className="text-[10px] text-rose-300/80 block">Zero cliques</span>
            </div>
          </div>

          {/* Card 5: Checkout / Compras */}
          <div className="bg-slate-850/80 p-3.5 rounded-2xl border border-purple-900/40 col-span-2 sm:col-span-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-purple-400 text-xs font-semibold">
              <span>Checkout Compra</span>
              <ShoppingCart className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="mt-1">
              <span className="text-2xl font-black text-purple-300">{data.checkoutClicks}</span>
              <span className="text-[10px] text-purple-300/80 block">Cliques em frascos</span>
            </div>
          </div>

        </div>

        {/* ================= TABS NAVIGATION & RESET BUTTON ================= */}
        <div className="px-5 pt-3 border-b border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-sm">
          
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Tab 1: SESSIONS / VISITANTES & ORIGEM NO MUNDO */}
            <button
              onClick={() => setActiveTab('sessions')}
              className={`pb-3 px-3.5 border-b-2 font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'sessions'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe2 className="w-4 h-4 text-purple-400" />
              <span>Origem & Log dos Visitantes ({sessions.length})</span>
            </button>

            {/* Tab 2: CLICKS RANKING */}
            <button
              onClick={() => setActiveTab('clicks')}
              className={`pb-3 px-3.5 border-b-2 font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'clicks'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <MousePointerClick className="w-4 h-4 text-emerald-400" />
              <span>Quais Botões Apertou ({data.totalClicks})</span>
            </button>

            {/* Tab 3: SCROLL DEPTH */}
            <button
              onClick={() => setActiveTab('scroll')}
              className={`pb-3 px-3.5 border-b-2 font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'scroll'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowDownCircle className="w-4 h-4 text-blue-400" />
              <span>Até Onde Rolou ({data.maxScrollDepthPercent}%)</span>
            </button>

          </div>

          {/* Reset button with inline confirmation (no window.confirm blocked by iframes!) */}
          {isResetConfirm ? (
            <div className="flex items-center gap-2 pb-3">
              <span className="text-xs text-amber-300 font-bold animate-pulse">Zerar tudo (0)?</span>
              <button
                onClick={handleResetToZero}
                disabled={isResetting}
                className="px-2.5 py-1 text-xs bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-black rounded-lg cursor-pointer transition-all shadow-md flex items-center gap-1"
              >
                {isResetting ? (
                  <>
                    <RotateCcw className="w-3 h-3 animate-spin" />
                    <span>Zerando...</span>
                  </>
                ) : (
                  <span>Sim, Zerar Agora (0)</span>
                )}
              </button>
              <button
                onClick={() => setIsResetConfirm(false)}
                className="px-2 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsResetConfirm(true)}
              disabled={isResetting}
              className={`pb-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap ${
                resetSuccess ? 'text-emerald-400' : 'text-rose-400 hover:text-rose-300'
              }`}
              title="Limpar dados de teste e zerar para novos visitantes reais"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
              <span>{resetSuccess ? '✅ Zerado com Sucesso (0)!' : 'Limpar Testes & Zerar (0)'}</span>
            </button>
          )}
        </div>

        {/* ================= TAB CONTENTS ================= */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* ================= TAB 1: SESSIONS & DETAILED VISITOR LOGS ================= */}
          {activeTab === 'sessions' && (
            <div className="space-y-5">
              
              {/* Filter pills */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Filter className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-semibold text-slate-300">Filtrar Visitantes:</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setSessionFilter('all')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      sessionFilter === 'all'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-slate-850 hover:bg-slate-800 text-slate-400'
                    }`}
                  >
                    Todos ({totalCount})
                  </button>

                  <button
                    onClick={() => setSessionFilter('allow')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      sessionFilter === 'allow'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-850 hover:bg-slate-800 text-emerald-400'
                    }`}
                  >
                    <span>🟢 Apertou Allow ({allowCount})</span>
                  </button>

                  <button
                    onClick={() => setSessionFilter('close')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      sessionFilter === 'close'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-850 hover:bg-slate-800 text-amber-400'
                    }`}
                  >
                    <span>🟡 Apertou Close ({closeCount})</span>
                  </button>

                  <button
                    onClick={() => setSessionFilter('bounced_no_clicks')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      sessionFilter === 'bounced_no_clicks'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-slate-850 hover:bg-slate-800 text-rose-400'
                    }`}
                  >
                    <span>🔴 Saiu sem Clicar ({bouncedCount})</span>
                  </button>

                  <button
                    onClick={() => setSessionFilter('checkout')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      sessionFilter === 'checkout'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-850 hover:bg-slate-800 text-indigo-400'
                    }`}
                  >
                    <span>🛒 Compra ({checkoutCount})</span>
                  </button>
                </div>
              </div>

              {/* Visitor Sessions List */}
              {filteredSessions.length === 0 ? (
                <div className="p-10 text-center text-slate-400 bg-slate-800/30 rounded-2xl border border-slate-800 space-y-2">
                  <Globe2 className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                  <h4 className="text-base font-bold text-slate-300">Nenhum visitante encontrado nesta categoria</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Assim que novas pessoas acessarem a página, seus registros de geolocalização e botões apertados aparecerão aqui em tempo real.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredSessions.map((session, index) => {
                    const isExpanded = expandedSessionId === session.id;
                    const hasClickedAny = session.buttonsClicked.length > 0;

                    return (
                      <div 
                        key={session.id || index}
                        className={`rounded-2xl border transition-all ${
                          isExpanded 
                            ? 'bg-slate-850 border-purple-500/60 shadow-lg ring-1 ring-purple-500/20' 
                            : 'bg-slate-850/60 hover:bg-slate-850 border-slate-800'
                        }`}
                      >
                        {/* Session Card Main Row */}
                        <div 
                          className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                          onClick={() => setExpandedSessionId(isExpanded ? null : session.id)}
                        >
                          {/* Col 1: Location & Device Info */}
                          <div className="flex items-start sm:items-center gap-3">
                            <span className="text-2xl sm:text-3xl shrink-0 mt-0.5 sm:mt-0">
                              {session.flag || '🌍'}
                            </span>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-extrabold text-white text-sm sm:text-base">
                                  {session.city ? `${session.city}, ` : ''}{session.country || 'Visitante Online'}
                                </span>
                                
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                                  {session.device === 'Mobile' ? (
                                    <Smartphone className="w-3 h-3 text-cyan-400" />
                                  ) : (
                                    <Laptop className="w-3 h-3 text-cyan-400" />
                                  )}
                                  <span>{session.device}</span>
                                </span>

                                {session.ip && (
                                  <span className="text-[10px] text-slate-500 font-mono">
                                    IP: {session.ip}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-purple-400" />
                                  <span>Entrou às {session.enteredTimeFormatted || 'Agora'}</span>
                                </span>
                                <span>•</span>
                                <span className="text-slate-300">
                                  Duração: <strong className="text-white">{formatSeconds(session.durationSeconds || 0)}</strong>
                                </span>
                                <span>•</span>
                                <span className="text-slate-300">
                                  Rolou até: <strong className="text-purple-300">{session.maxScrollPercent || 0}%</strong> ({session.maxScrollSection || 'Hero'})
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Col 2: Action Badge & Expand Toggle */}
                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                            
                            {/* Outcome Badge */}
                            {session.cookieAction === 'allow' || session.outcome === 'allow' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/50">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Apertou "Allow"</span>
                              </span>
                            ) : session.cookieAction === 'close' || session.outcome === 'close' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-500/50">
                                <XCircle className="w-3.5 h-3.5 text-amber-400" />
                                <span>Apertou "Close"</span>
                              </span>
                            ) : session.outcome === 'checkout' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-500/50">
                                <ShoppingCart className="w-3.5 h-3.5 text-indigo-400" />
                                <span>Clicou Checkout</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-rose-950/80 text-rose-300 border border-rose-500/50">
                                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                                <span>Apenas Entrou e Saiu (0 Cliques)</span>
                              </span>
                            )}

                            {/* View Log Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedSessionId(isExpanded ? null : session.id);
                              }}
                              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                                isExpanded 
                                  ? 'bg-purple-600 text-white' 
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                              }`}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">{isExpanded ? 'Ocultar Log' : 'Ver Log'}</span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>

                          </div>
                        </div>

                        {/* ================= DETAILED VISITOR LOG (EXPANDED) ================= */}
                        {isExpanded && (
                          <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 bg-slate-900/60 rounded-b-2xl space-y-4">
                            
                            {/* Summary alert banner */}
                            {!hasClickedAny ? (
                              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/50 flex items-center gap-3 text-xs text-rose-200">
                                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                <div>
                                  <strong>Visitante sem conversão:</strong> Este usuário entrou na página, rolou até {session.maxScrollPercent}%, <strong>não apertou nenhum botão</strong> (nem Allow, nem Close, nem Checkout) e encerrou a sessão.
                                </div>
                              </div>
                            ) : (
                              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-center gap-3 text-xs text-emerald-200">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <div>
                                  <strong>Visitante interagiu com o site:</strong> Executou {session.buttonsClicked.length} clique(s) em botões durante a navegação.
                                </div>
                              </div>
                            )}

                            {/* Two columns: Buttons Clicked & Step-by-Step Timeline */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              
                              {/* Box 1: Botões que Apertou */}
                              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                                <div className="flex items-center justify-between text-slate-300 font-bold border-b border-slate-800 pb-2">
                                  <span className="flex items-center gap-1.5 text-purple-300">
                                    <MousePointerClick className="w-4 h-4 text-purple-400" />
                                    <span>Botões que Apertou ({session.buttonsClicked.length})</span>
                                  </span>
                                </div>

                                {session.buttonsClicked.length === 0 ? (
                                  <div className="py-4 text-center text-slate-500 italic">
                                    Nenhum botão foi apertado por este visitante.
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    {session.buttonsClicked.map((b, bIdx) => (
                                      <div 
                                        key={bIdx}
                                        className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-2"
                                      >
                                        <div className="flex items-center gap-2 truncate">
                                          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                                          <span className="font-semibold text-white truncate">{b.name}</span>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-mono shrink-0">
                                          {b.timestamp}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Box 2: Cronologia Completa do Visitante */}
                              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                                <div className="flex items-center justify-between text-slate-300 font-bold border-b border-slate-800 pb-2">
                                  <span className="flex items-center gap-1.5 text-blue-300">
                                    <Compass className="w-4 h-4 text-blue-400" />
                                    <span>Tudo o que viu ou apertou (Linha do Tempo)</span>
                                  </span>
                                </div>

                                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                                  {(session.timeline || []).map((t, tIdx) => (
                                    <div 
                                      key={tIdx}
                                      className="flex items-start gap-2.5 text-[11px] text-slate-300"
                                    >
                                      <span className="text-slate-500 font-mono text-[10px] shrink-0 mt-0.5">
                                        {t.time}
                                      </span>
                                      <div className="leading-snug">
                                        {t.text}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* ================= TAB 2: QUIS BOTÕES APERTOU (ALL BUTTONS RANKING) ================= */}
          {activeTab === 'clicks' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border border-purple-800/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                      MAPA DE INTERAÇÃO & CLIQUE EM BOTÕES
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                      Ranking dos Botões Mais Clicados
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl">
                      Veja em tempo real onde os usuários estão clicando: no botão Allow do Cookie, no botão Close ou nas ofertas de compra.
                    </p>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60 text-right">
                    <span className="text-xs text-slate-400 block">Total de Cliques:</span>
                    <span className="text-2xl font-black text-emerald-400">{data.totalClicks}</span>
                  </div>
                </div>
              </div>

              {sortedButtons.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-800/30 rounded-2xl border border-slate-800">
                  <MousePointerClick className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                  <p className="font-semibold text-slate-300">Nenhum clique registrado ainda</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedButtons.map(([btnName, stat], idx) => {
                    const percent = data.totalClicks > 0 
                      ? Math.round((stat.count / data.totalClicks) * 100) 
                      : 0;
                    const isCheckout = stat.category === 'checkout';
                    const isCookieAllow = btnName.includes('Allow');
                    const isCookieClose = btnName.includes('Close');

                    return (
                      <div 
                        key={idx} 
                        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isCookieAllow 
                            ? 'bg-emerald-950/30 border-emerald-800/40' 
                            : isCookieClose 
                            ? 'bg-amber-950/30 border-amber-800/40' 
                            : isCheckout 
                            ? 'bg-purple-950/40 border-purple-800/40' 
                            : 'bg-slate-800/50 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                            isCookieAllow
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : isCookieClose
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : isCheckout 
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' 
                              : 'bg-slate-700 text-slate-300'
                          }`}>
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{btnName}</span>
                              {isCookieAllow && (
                                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/60">
                                  Cookie Allow
                                </span>
                              )}
                              {isCookieClose && (
                                <span className="text-[10px] font-bold text-amber-300 bg-amber-900/60 px-2 py-0.5 rounded border border-amber-700/60">
                                  Cookie Close
                                </span>
                              )}
                              {isCheckout && (
                                <span className="text-[10px] font-bold text-purple-300 bg-purple-900/60 px-2 py-0.5 rounded border border-purple-700/60">
                                  Checkout
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-400">Último clique: {stat.lastClicked}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 sm:justify-end">
                          <div className="w-28 sm:w-36 bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-700">
                            <div 
                              className={`h-full rounded-full ${
                                isCookieAllow 
                                  ? 'bg-emerald-400' 
                                  : isCookieClose 
                                  ? 'bg-amber-400' 
                                  : isCheckout 
                                  ? 'bg-purple-400' 
                                  : 'bg-cyan-400'
                              }`} 
                              style={{ width: `${percent}%` }} 
                            />
                          </div>
                          <span className="text-lg font-black text-white w-12 text-right">
                            {stat.count}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* ================= TAB 3: ATÉ ONDE ROLOU (SCROLL DEPTH) ================= */}
          {activeTab === 'scroll' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border border-purple-800/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                      ENGAJAMENTO & PROFUNDIDADE DA PÁGINA
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                      Até Onde os Visitantes Rolaram a Tela
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl">
                      Mede até qual seção cada visitante desceu antes de tomar uma decisão de compra ou sair.
                    </p>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60 text-right">
                    <span className="text-xs text-slate-400 block">Profundidade Máxima Geral:</span>
                    <span className="text-2xl font-black text-cyan-400">{data.maxScrollDepthPercent}%</span>
                  </div>
                </div>
              </div>

              {/* Funil Visual de Rolagem */}
              <div className="space-y-3.5">
                {[
                  { name: '1. Início da Página (Hero)', depth: '15%', count: data.scrollMilestones.hero || data.totalVisits, color: 'bg-indigo-500' },
                  { name: '2. Ingredientes Naturais & Mecanismo', depth: '35%', count: data.scrollMilestones.ingredients, color: 'bg-blue-500' },
                  { name: '3. Resultados Clínicos & Eficácia', depth: '50%', count: data.scrollMilestones.efficacy, color: 'bg-teal-500' },
                  { name: '4. Tabela de Preços & Ofertas', depth: '70%', count: data.scrollMilestones.pricing, color: 'bg-emerald-500' },
                  { name: '5. Garantia de Reembolso 180 Dias', depth: '85%', count: data.scrollMilestones.guarantee, color: 'bg-amber-500' },
                  { name: '6. Rodapé & Referências Científicas', depth: '100%', count: data.scrollMilestones.footer, color: 'bg-rose-500' },
                ].map((item, i) => {
                  const pct = data.totalVisits > 0 
                    ? Math.min(100, Math.round((item.count / data.totalVisits) * 100)) 
                    : 0;

                  return (
                    <div key={i} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">[{item.depth}]</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400">{item.count} visitantes</span>
                          <span className="font-black text-white">{pct}%</span>
                        </div>
                      </div>

                      <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-700/60">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

        {/* ================= MODAL FOOTER ================= */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sessão ativa sendo monitorada em tempo real com Firebase Firestore</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-300">
              Tempo nesta aba: <strong className="text-white">{formatSeconds(currentSession.elapsedSeconds)}</strong>
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-white cursor-pointer transition-colors"
            >
              Fechar Painel
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
