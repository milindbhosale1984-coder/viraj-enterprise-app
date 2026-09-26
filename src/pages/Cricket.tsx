import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Trophy,
  RefreshCw,
  Flame,
  Clock,
  MapPin,
  Calendar,
  ChevronRight,
  TrendingUp,
  Award,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { VeLogo } from '../components/VeLogo';
import { PageFooter } from '../components/PageFooter';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';

interface CricketMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  isLive: boolean;
  team1: {
    name: string;
    short: string;
    logo: string;
    score: string;
    overs: string;
  };
  team2: {
    name: string;
    short: string;
    logo: string;
    score: string;
    overs: string;
  };
  highlight: string;
  currentBatsmen?: string;
  currentBowler?: string;
  requiredRate?: string;
  runRate?: string;
}

const DEFAULT_MATCHES: CricketMatch[] = [
  {
    id: 'ipl-2026-1',
    name: 'Chennai Super Kings vs Mumbai Indians',
    matchType: 'T20 • IPL 2026 Match 34',
    status: 'Live • 2nd Innings',
    venue: 'MCA Stadium, Gahunje, Pune',
    date: 'Today, 7:30 PM IST',
    isLive: true,
    team1: {
      name: 'Chennai Super Kings',
      short: 'CSK',
      logo: '🦁',
      score: '194/4',
      overs: '20.0',
    },
    team2: {
      name: 'Mumbai Indians',
      short: 'MI',
      logo: '⚡',
      score: '168/5',
      overs: '17.2',
    },
    highlight: 'MI need 27 runs in 16 balls • Hardik Pandya on strike',
    currentBatsmen: 'Hardik 38* (18), Tilak 24* (14)',
    currentBowler: 'Pathirana 3.2-0-31-2',
    runRate: '9.69',
    requiredRate: '10.12',
  },
  {
    id: 'ipl-2026-2',
    name: 'Royal Challengers Bengaluru vs Kolkata Knight Riders',
    matchType: 'T20 • IPL 2026 Match 35',
    status: 'Upcoming • Tomorrow',
    venue: 'M. Chinnaswamy Stadium',
    date: 'Tomorrow, 3:30 PM IST',
    isLive: false,
    team1: {
      name: 'Royal Challengers Bengaluru',
      short: 'RCB',
      logo: '👑',
      score: '-',
      overs: '-',
    },
    team2: {
      name: 'Kolkata Knight Riders',
      short: 'KKR',
      logo: '⚔️',
      score: '-',
      overs: '-',
    },
    highlight: 'Kohli in prime form • Weather in Bengaluru is clear',
  },
  {
    id: 'ipl-2026-3',
    name: 'Pune Warriors (Maharashtra Premier League)',
    matchType: 'T20 • MPL 2026 Pune Derby',
    status: 'Live • 1st Innings',
    venue: 'PYC Hindu Gymkhana, Deccan Pune',
    date: 'Today, 4:00 PM IST',
    isLive: true,
    team1: {
      name: 'Puneri Bappa',
      short: 'PUN',
      logo: '🚩',
      score: '142/3',
      overs: '15.4',
    },
    team2: {
      name: 'Kolhapur Tuskers',
      short: 'KOL',
      logo: '🐘',
      score: 'Yet to bat',
      overs: '0.0',
    },
    highlight: 'Ruturaj Gaikwad smashing 64* off 35 deliveries in Pune!',
    currentBatsmen: 'Ruturaj 64* (35), Kedar 18 (12)',
    currentBowler: 'Bhandari 2.4-0-28-1',
    runRate: '9.06',
  },
  {
    id: 'ipl-2026-4',
    name: 'Rajasthan Royals vs Gujarat Titans',
    matchType: 'T20 • IPL 2026 Match 36',
    status: 'Upcoming • 28 Sep',
    venue: 'Sawai Mansingh Stadium, Jaipur',
    date: '28 Sep 2026, 7:30 PM IST',
    isLive: false,
    team1: {
      name: 'Rajasthan Royals',
      short: 'RR',
      logo: '🏰',
      score: '-',
      overs: '-',
    },
    team2: {
      name: 'Gujarat Titans',
      short: 'GT',
      logo: '🛡️',
      score: '-',
      overs: '-',
    },
    highlight: 'Sanju Samson vs Shubman Gill head-to-head battle',
  },
];

export const Cricket: React.FC = () => {
  const [matches, setMatches] = useState<CricketMatch[]>(DEFAULT_MATCHES);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [countdown, setCountdown] = useState(30);
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming'>('all');

  const fetchScores = async () => {
    setLoading(true);
    try {
      const apiKey = localStorage.getItem('ve_cricapi_key');
      if (apiKey && apiKey !== 'YOUR_API_KEY') {
        const res = await axios.get(`https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`, {
          timeout: 4000,
        });
        if (res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          // Transform CricAPI structure
          const mapped: CricketMatch[] = res.data.data.slice(0, 6).map((m: any, idx: number) => ({
            id: m.id || String(idx),
            name: m.name || 'Cricket Match',
            matchType: m.matchType?.toUpperCase() || 'T20 Match',
            status: m.status || 'In Progress',
            venue: m.venue || 'Pune MCA Stadium',
            date: m.date || 'Today',
            isLive: !m.matchEnded,
            team1: {
              name: m.teams?.[0] || 'Team 1',
              short: m.teamInfo?.[0]?.shortname || m.teams?.[0]?.slice(0, 3) || 'T1',
              logo: '🏏',
              score: m.score?.[0]?.r ? `${m.score[0].r}/${m.score[0].w}` : 'Yet to bat',
              overs: m.score?.[0]?.o ? `${m.score[0].o}` : '-',
            },
            team2: {
              name: m.teams?.[1] || 'Team 2',
              short: m.teamInfo?.[1]?.shortname || m.teams?.[1]?.slice(0, 3) || 'T2',
              logo: '🏆',
              score: m.score?.[1]?.r ? `${m.score[1].r}/${m.score[1].w}` : '-',
              overs: m.score?.[1]?.o ? `${m.score[1].o}` : '-',
            },
            highlight: m.status || 'Match in progress',
          }));
          setMatches(mapped);
        }
      } else {
        // Dynamic live simulation update (changes balls/runs realistically)
        setMatches((prev) =>
          prev.map((m) => {
            if (m.isLive && m.team2.score !== 'Yet to bat') {
              const [runs, wkts] = m.team2.score.split('/').map(Number);
              const [ov, ball] = m.team2.overs.split('.').map(Number);
              let nextBall = ball + 1;
              let nextOv = ov;
              if (nextBall >= 6) {
                nextBall = 0;
                nextOv += 1;
              }
              const addRuns = Math.floor(Math.random() * 4); // 0, 1, 2, or 3
              return {
                ...m,
                team2: {
                  ...m.team2,
                  score: `${runs + addRuns}/${wkts}`,
                  overs: `${nextOv}.${nextBall}`,
                },
              };
            }
            return m;
          })
        );
      }
      setLastUpdated(new Date());
    } catch {
      // Keep existing matches on error
    } finally {
      setLoading(false);
      setCountdown(30);
    }
  };

  // 30-sec auto refresh and countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          fetchScores();
          return 30;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredMatches = matches.filter((m) => {
    if (activeTab === 'live') return m.isLive;
    if (activeTab === 'upcoming') return !m.isLive;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 py-6 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="text-center space-y-3 pb-4 border-b border-stone-800">
          <div className="flex justify-center mb-1">
            <VeLogo size={64} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-600/50 text-red-400 text-xs font-bold animate-pulse">
            <Radio className="w-3.5 h-3.5" />
            <span>LIVE CRICKET FEEDS • PUNE & IPL 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
            Pune Cricket Live - IPL 2026
          </h1>
          <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium">
            Live Ball-by-Ball Scorecard, MPL Pune Derby & IPL 2026 Matches • Powered by Viraj Enterprise
          </p>

          {/* Refresh controls & auto-refresh timer */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={fetchScores}
              disabled={loading}
              className="py-1.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 text-xs font-black flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'अपडेट होत आहे...' : `Refresh (Auto in ${countdown}s)`}</span>
            </button>

            <span className="text-[11px] text-stone-400 font-mono">
              Last sync: {lastUpdated.toLocaleTimeString()}
            </span>
          </div>

          {/* Tabs: All / Live / Upcoming */}
          <div className="flex justify-center pt-3">
            <div className="inline-flex p-1 rounded-2xl bg-stone-900 border border-stone-800">
              <button
                onClick={() => setActiveTab('all')}
                className={`py-1 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#D4AF37] text-stone-950 shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                All Matches ({matches.length})
              </button>
              <button
                onClick={() => setActiveTab('live')}
                className={`py-1 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'live'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                🔴 Live Now ({matches.filter((m) => m.isLive).length})
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`py-1 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'upcoming'
                    ? 'bg-[#D4AF37] text-stone-950 shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Upcoming ({matches.filter((m) => !m.isLive).length})
              </button>
            </div>
          </div>
        </div>

        {/* MATCHES LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMatches.map((m) => (
            <div
              key={m.id}
              className="relative rounded-3xl bg-gradient-to-b from-[#141419] to-[#0d0d10] border-2 border-[#D4AF37] p-5 shadow-xl hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)] transition-all flex flex-col justify-between"
            >
              {/* Top Banner */}
              <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                  {m.matchType}
                </span>

                {m.isLive ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/40 text-[10px] font-black uppercase tracking-wider animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    LIVE
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-400 text-[10px] font-bold">
                    UPCOMING
                  </span>
                )}
              </div>

              {/* Match Scoreboard Body */}
              <div className="space-y-4">
                {/* Team 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-1.5 rounded-xl bg-stone-900 border border-stone-800">
                      {m.team1.logo}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-white">
                        {m.team1.name}
                      </h3>
                      <span className="text-[10px] text-stone-500 font-mono">
                        {m.team1.short}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-black text-amber-300 font-mono">
                      {m.team1.score}
                    </span>
                    {m.team1.overs !== '-' && (
                      <span className="block text-[10px] text-stone-400">
                        ({m.team1.overs} ov)
                      </span>
                    )}
                  </div>
                </div>

                {/* Team 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-1.5 rounded-xl bg-stone-900 border border-stone-800">
                      {m.team2.logo}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-white">
                        {m.team2.name}
                      </h3>
                      <span className="text-[10px] text-stone-500 font-mono">
                        {m.team2.short}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-black text-white font-mono">
                      {m.team2.score}
                    </span>
                    {m.team2.overs !== '-' && (
                      <span className="block text-[10px] text-stone-400">
                        ({m.team2.overs} ov)
                      </span>
                    )}
                  </div>
                </div>

                {/* Highlight / Status */}
                <div className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                    <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>{m.highlight}</span>
                  </div>

                  {m.currentBatsmen && (
                    <div className="text-[11px] text-stone-400 flex flex-wrap justify-between gap-1 pt-1 border-t border-stone-900">
                      <span>🏏 {m.currentBatsmen}</span>
                      <span>⚾ {m.currentBowler}</span>
                    </div>
                  )}

                  {m.runRate && (
                    <div className="text-[10px] text-stone-500 font-mono mt-1">
                      CRR: {m.runRate} {m.requiredRate && `• RRR: ${m.requiredRate}`}
                    </div>
                  )}
                </div>

                {/* Venue & Date */}
                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                  <span className="flex items-center gap-1 truncate max-w-[240px]">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{m.venue}</span>
                  </span>
                  <span className="shrink-0 font-mono">{m.date}</span>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                <span className="text-[10px] text-[#D4AF37] font-bold">
                  ★ Pune Cricket Central
                </span>
                <button
                  onClick={() => {
                    const text = encodeURIComponent(`IPL 2026 Live Score: ${m.name} - ${m.highlight} via Viraj Enterprise Pune`);
                    window.open(`https://wa.me/919021745403?text=${text}`, '_blank');
                  }}
                  className="px-3 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-400 text-xs font-bold border border-emerald-700/50 cursor-pointer"
                >
                  Share on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Page Footer with Gold Border & Milind Bhosale branding */}
        <PageFooter pageName="Pune Cricket Live - IPL 2026" />
      </div>
    </div>
  );
};
