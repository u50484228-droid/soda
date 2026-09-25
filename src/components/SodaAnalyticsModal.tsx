import React, { useState, useEffect } from 'react';
import { 
  X, 
  BarChart3, 
  Clock, 
  MousePointerClick, 
  ArrowDownCircle, 
  ShieldCheck, 
  Activity, 
  Users, 
  RefreshCw, 
  RotateCcw,
  Globe2,
  MapPin,
  Laptop
} from 'lucide-react';
import { tracker, RealAnalyticsData, VisitorLocation } from '../utils/sodaAnalytics';

interface SodaAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SodaAnalyticsModal: React.FC<SodaAnalyticsModalProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<RealAnalyticsData>(tracker.getData());
  const [visitorLocation, setVisitorLocation] = useState<VisitorLocation>(tracker.getCurrentVisitorLocation());
  const [activeTab, setActiveTab] = useState<'geo' | 'clicks' | 'scroll' | 'events'>('geo');
  const [currentSession, setCurrentSession] = useState(tracker.getCurrentSessionStats());

  useEffect(() => {
    if (!isOpen) return;

    // Mark current device as admin
    tracker.markAsAdminDevice();

    // Subscribe to real-time events
    const unsubscribe = tracker.subscribe(() => {
      setData({ ...tracker.getData() });
      setVisitorLocation({ ...tracker.getCurrentVisitorLocation() });
    });

    // Tick session timer every second
    const interval = setInterval(() => {
      setCurrentSession(tracker.getCurrentSessionStats());
      setVisitorLocation(tracker.getCurrentVisitorLocation());
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
    if (window.confirm('Deseja limpar os dados anteriores e zerar o banco de dados Firestore para 0? (Seu IP já está bloqueado e não será mais contabilizado)')) {
      await tracker.resetToZero();
      setData({ ...tracker.getData() });
      setCurrentSession(tracker.getCurrentSessionStats());
    }
  };

  const sortedButtons = Object.entries(data.buttonClicks)
    .sort(([, a], [, b]) => b.count - a.count);

  const countryList = Object.values(data.countries)
    .sort((a, b) => b.count - a.count);

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
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Painel de Tráfego & Telemetria em Tempo Real
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 bg-amber-950/60 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                  <span>🔥</span>
                  <span>Firebase Conectado</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Tempo Real
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Origem geográfica, cliques em botões, profundidade de rolagem e tempo de visitação
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setData({ ...tracker.getData() });
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

        {/* ================= LIVE VISITOR & GEOLOCATION BANNER ================= */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-purple-950/70 via-indigo-950/50 to-slate-900 border-b border-purple-900/40 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Visitor Location */}
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{visitorLocation.flag || '🌍'}</span>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-purple-200">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>
                  Sua Origem Detectada:{' '}
                  <strong className="text-white">
                    {visitorLocation.city ? `${visitorLocation.city}, ` : ''}{visitorLocation.country}
                  </strong>
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                IP: <span className="font-mono text-slate-300">{visitorLocation.ip}</span> • {visitorLocation.region || 'Região identificada'}
              </p>
            </div>
          </div>

          {/* Current Live Session Metrics */}
          <div className="flex flex-wrap items-center gap-4 text-slate-300 bg-slate-950/60 px-3.5 py-1.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Tempo na Página: <strong className="text-white font-mono">{formatSeconds(currentSession.elapsedSeconds)}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowDownCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Rolagem: <strong className="text-white font-mono">{currentSession.maxScrollDepth}%</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <MousePointerClick className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cliques: <strong className="text-white font-mono">
                {visitorLocation.isExcluded ? '0 (Bloqueado)' : currentSession.sessionClicks}
              </strong></span>
            </div>
          </div>

        </div>

        {/* ================= ADMIN IP EXCLUSION NOTICE BANNER ================= */}
        <div className={`px-5 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 text-xs transition-colors ${
          visitorLocation.isExcluded 
            ? 'bg-amber-950/50 border-amber-900/50 text-amber-200' 
            : 'bg-emerald-950/60 border-emerald-800/60 text-emerald-200'
        }`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className={`w-4 h-4 shrink-0 ${visitorLocation.isExcluded ? 'text-amber-400' : 'text-emerald-400'}`} />
            {visitorLocation.isExcluded ? (
              <span>
                <strong>Filtro de Administrador:</strong> Seu IP (<code className="bg-amber-950 px-1.5 py-0.5 rounded text-amber-300 font-mono font-bold">{visitorLocation.ip}</code>) está <strong>BLOQUEADO</strong>. Suas visitas e cliques NÃO são contabilizados.
              </span>
            ) : (
              <span>
                <strong>Modo Teste Liberado:</strong> Seu IP está <strong>DESBLOQUEADO</strong>. Visitas, rolagens e cliques seus <strong>SERÃO CONTABILIZADOS</strong> para você testar!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                tracker.toggleFilter(!tracker.isFilterEnabled());
                setVisitorLocation({ ...tracker.getCurrentVisitorLocation() });
                setData({ ...tracker.getData() });
              }}
              className={`px-3 py-1 rounded-lg font-bold text-xs cursor-pointer transition-all shadow-sm ${
                visitorLocation.isExcluded
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
              }`}
            >
              {visitorLocation.isExcluded ? '🔓 Desbloquear Meu IP (Modo Teste)' : '🔒 Bloquear Meu IP Novamente'}
            </button>
          </div>
        </div>

        {/* ================= 4 MAIN REAL STATS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 bg-slate-900/60 border-b border-slate-800">
          
          {/* 1. Visitas Reais */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Visitas Reais</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {data.totalVisits}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              <strong className="text-purple-300">{data.uniqueVisitors}</strong> visitante(s) único(s)
            </p>
          </div>

          {/* 2. Tempo Médio Real */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Tempo de Permanência</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
              {formatSeconds(Math.max(currentSession.elapsedSeconds, Math.floor(data.totalTimeSeconds / Math.max(1, data.sessionCountForAvg))))}
            </div>
            <p className="text-[11px] text-emerald-400 font-semibold mt-1">
              Sessão ativa sendo cronometrada
            </p>
          </div>

          {/* 3. Profundidade de Rolagem Real */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Profundidade de Rolagem</span>
              <ArrowDownCircle className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
              {Math.max(currentSession.maxScrollDepth, data.maxScrollDepthPercent)}%
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {data.scrollMilestones.pricing > 0 ? (
                <span className="text-emerald-400 font-bold">✓ Chegou na Tabela de Preços</span>
              ) : (
                <span className="text-slate-400">Role a página para marcar</span>
              )}
            </p>
          </div>

          {/* 4. Cliques em Botões Reais */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Cliques em Botões</span>
              <MousePointerClick className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {data.totalClicks}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              <strong className="text-amber-400">{data.checkoutClicks}</strong> clique(s) em pacotes
            </p>
          </div>

        </div>

        {/* ================= TABS NAVIGATION ================= */}
        <div className="px-5 sm:px-6 pt-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between overflow-x-auto">
          <div className="flex gap-2 text-xs font-bold whitespace-nowrap">
            
            <button
              onClick={() => setActiveTab('geo')}
              className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'geo'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              <span>Origem no Mundo / Países ({countryList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('clicks')}
              className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'clicks'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <MousePointerClick className="w-4 h-4" />
              <span>Quais Botões Apertou ({sortedButtons.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('scroll')}
              className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'scroll'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowDownCircle className="w-4 h-4" />
              <span>Até Onde Rolou a Página</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'events'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Histórico de Eventos ao Vivo ({data.recentEvents.length})</span>
            </button>

          </div>

          <button
            onClick={handleResetToZero}
            className="pb-3 text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
            title="Limpar dados de teste e zerar para novos visitantes reais"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar Testes & Zerar (0)</span>
          </button>
        </div>

        {/* ================= TAB CONTENTS ================= */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: GEOLOCATION / DE ONDE ESTÁ VINDO DO MUNDO */}
          {activeTab === 'geo' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border border-purple-800/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                      GEOLOCALIZAÇÃO POR IP EM TEMPO REAL
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                      Visitantes por País & Região
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl">
                      Cada visitante que acessa o site tem seu país, cidade e IP identificados automaticamente.
                    </p>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60 text-right">
                    <span className="text-xs text-slate-400 block">Total de Países Registrados:</span>
                    <span className="text-2xl font-black text-white">{countryList.length}</span>
                  </div>
                </div>
              </div>

              {/* Table of Countries */}
              {countryList.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-800/30 rounded-2xl border border-slate-800">
                  <Globe2 className="w-10 h-10 mx-auto text-slate-600 mb-2 animate-spin" style={{ animationDuration: '10s' }} />
                  <p className="font-bold text-sm text-slate-300">Identificando localização geográfica...</p>
                  <p className="text-xs text-slate-500 mt-1">O primeiro país aparecerá em instantes com base no IP.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {countryList.map((item, idx) => {
                    const percentage = ((item.count / Math.max(1, data.totalVisits)) * 100).toFixed(1);
                    return (
                      <div 
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-400/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{item.flag || '🌍'}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-black text-white text-base">
                                {item.country}
                              </h5>
                              <span className="text-[10px] font-bold text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800 font-mono">
                                {item.countryCode}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">
                              Cidades detectadas: {item.cities.length > 0 ? item.cities.join(', ') : 'Geral'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-28 sm:w-40 bg-slate-700/60 h-2.5 rounded-full overflow-hidden">
                            <div 
                              style={{ width: `${percentage}%` }}
                              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400"
                            />
                          </div>
                          <div className="min-w-16 text-right">
                            <span className="text-base font-black text-white">{item.count}</span>
                            <span className="text-xs text-slate-400 ml-1">({percentage}%)</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* TAB 2: QUAIS BOTÕES APERTOU */}
          {activeTab === 'clicks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    Registro de Cliques em Botões da Página
                  </h4>
                  <p className="text-xs text-slate-400">
                    Mostra exatamente quantos cliques reais cada botão recebeu
                  </p>
                </div>
                <span className="text-xs font-bold text-purple-400 bg-purple-950/60 border border-purple-800 px-3 py-1 rounded-full">
                  Total: {data.totalClicks} cliques
                </span>
              </div>

              {sortedButtons.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-800/30 rounded-2xl border border-slate-800">
                  <MousePointerClick className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                  <p className="font-bold text-sm text-slate-300">Nenhum botão foi clicado ainda nesta sessão limpa.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Feche este painel, clique em qualquer botão de compra ou CTA da página, e volte aqui para ver contabilizado!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedButtons.map(([buttonName, stats], idx) => {
                    const percentOfTotal = ((stats.count / Math.max(1, data.totalClicks)) * 100).toFixed(1);
                    const isCheckout = stats.category === 'checkout';

                    return (
                      <div 
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-400/40 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                              isCheckout 
                                ? 'bg-amber-400 text-slate-950' 
                                : 'bg-purple-900/80 text-purple-200 border border-purple-700'
                            }`}>
                              {isCheckout ? 'Checkout / Compra' : 'CTA'}
                            </span>
                            <span className="font-bold text-sm text-white">
                              {buttonName}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">
                            Último clique registrado às: <span className="text-slate-300 font-mono font-medium">{stats.lastClicked}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-4 sm:text-right">
                          <div className="w-24 sm:w-32 bg-slate-700/60 h-2 rounded-full overflow-hidden">
                            <div 
                              style={{ width: `${percentOfTotal}%` }}
                              className={`h-full rounded-full ${
                                isCheckout 
                                  ? 'bg-gradient-to-r from-amber-400 to-amber-500' 
                                  : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                              }`}
                            />
                          </div>
                          <div className="min-w-16">
                            <span className="text-lg font-black text-white">{stats.count}</span>
                            <span className="text-xs text-slate-400 ml-1">({percentOfTotal}%)</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ATÉ ONDE FOI ROLANDO A PÁGINA */}
          {activeTab === 'scroll' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-white text-sm sm:text-base">
                  Profundidade de Rolagem (Scroll Depth Real)
                </h4>
                <p className="text-xs text-slate-400">
                  Veja até qual parte da página os visitantes desceram
                </p>
              </div>

              <div className="space-y-4">
                
                {/* 1. Topo / Hero */}
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-2">
                    <span className="flex items-center gap-2 text-white">
                      <span className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-[10px]">1</span>
                      Topo & Hero (0% a 25%)
                    </span>
                    <span className="text-emerald-400 font-mono text-base font-black">
                      {data.scrollMilestones.hero} visualização(ões)
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/60 h-2.5 rounded-full overflow-hidden">
                    <div style={{ width: '100%' }} className="h-full bg-emerald-500 rounded-full" />
                  </div>
                </div>

                {/* 2. História & Ingredientes */}
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-2">
                    <span className="flex items-center gap-2 text-white">
                      <span className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-[10px]">2</span>
                      Mecanismo & 7 Ingredientes (25% a 50%)
                    </span>
                    <span className="text-purple-400 font-mono text-base font-black">
                      {data.scrollMilestones.ingredients} rolagem(ns)
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/60 h-2.5 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${data.scrollMilestones.ingredients > 0 ? 100 : 0}%` }} 
                      className="h-full bg-purple-500 rounded-full" 
                    />
                  </div>
                </div>

                {/* 3. Eficácia Clínica */}
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-2">
                    <span className="flex items-center gap-2 text-white">
                      <span className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-[10px]">3</span>
                      Eficácia Clínica & Prova Médica (50% a 70%)
                    </span>
                    <span className="text-purple-400 font-mono text-base font-black">
                      {data.scrollMilestones.efficacy} rolagem(ns)
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/60 h-2.5 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${data.scrollMilestones.efficacy > 0 ? 100 : 0}%` }} 
                      className="h-full bg-purple-500 rounded-full" 
                    />
                  </div>
                </div>

                {/* 4. Tabela de Preços */}
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 border-l-4 border-l-amber-400">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-2">
                    <span className="flex items-center gap-2 text-white">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black">4</span>
                      Tabela de Preços & Ofertas de Compra (70% a 85%) ★ ZONA CRÍTICA
                    </span>
                    <span className="text-amber-400 font-mono text-base font-black">
                      {data.scrollMilestones.pricing} rolagem(ns)
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/60 h-2.5 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${data.scrollMilestones.pricing > 0 ? 100 : 0}%` }} 
                      className="h-full bg-amber-400 rounded-full" 
                    />
                  </div>
                </div>

                {/* 5. Rodapé e Garantia */}
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-2">
                    <span className="flex items-center gap-2 text-white">
                      <span className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-[10px]">5</span>
                      Fim da Página & Rodapé (95% a 100%)
                    </span>
                    <span className="text-slate-400 font-mono text-base font-black">
                      {data.scrollMilestones.footer} rolagem(ns)
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/60 h-2.5 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${data.scrollMilestones.footer > 0 ? 100 : 0}%` }} 
                      className="h-full bg-slate-500 rounded-full" 
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: HISTÓRICO DE EVENTOS AO VIVO */}
          {activeTab === 'events' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    Feed de Ações em Tempo Real
                  </h4>
                  <p className="text-xs text-slate-400">
                    Registro cronológico ao vivo de acessos, geolocalização, cliques e rolagens
                  </p>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Rastreando ao vivo
                </span>
              </div>

              {data.recentEvents.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-800/30 rounded-2xl border border-slate-800">
                  <Activity className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                  <p className="font-bold text-sm text-slate-300">Aguardando próximas ações...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {data.recentEvents.map((evt, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        {evt.type === 'geo' && (
                          <span className="text-lg shrink-0">{evt.flag || '🌍'}</span>
                        )}
                        {evt.type === 'click' && (
                          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                            <MousePointerClick className="w-4 h-4" />
                          </div>
                        )}
                        {evt.type === 'scroll' && (
                          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                            <ArrowDownCircle className="w-4 h-4" />
                          </div>
                        )}
                        {evt.type === 'visit' && (
                          <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                            <Users className="w-4 h-4" />
                          </div>
                        )}

                        <span className="font-medium text-slate-200">
                          {evt.detail}
                        </span>
                      </div>

                      <span className="text-slate-400 font-mono text-[11px] shrink-0">
                        {evt.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* ================= MODAL FOOTER ================= */}
        <div className="p-4 bg-slate-950/95 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Dados 100% reais persistidos no <strong>Firebase Firestore</strong> & sincronizados em tempo real</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-purple-700 hover:bg-purple-600 text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            Fechar Painel
          </button>
        </div>

      </div>
    </div>
  );
};
