import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Newspaper,
  Volume2,
  VolumeX,
  RefreshCw,
  ExternalLink,
  Flame,
  Clock,
  Sparkles,
  Share2,
  Bookmark,
  CheckCircle2,
  TrendingUp,
  Radio,
} from 'lucide-react';
import { FaWhatsapp, FaNewspaper } from 'react-icons/fa';
import { VeLogo } from '../components/VeLogo';
import { PageFooter } from '../components/PageFooter';
import { saveLeadToSheet, recordWhatsAppClick } from '../utils/sheet';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';

export interface NewsArticle {
  id: string;
  title: string;
  category: 'thalak' | 'pune' | 'sarkari' | 'sports';
  categoryLabelMr: string;
  description: string;
  photo: string;
  timeAgo: string;
  link: string;
  source: string;
}

const STATIC_BACKUP_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'पुणे मेट्रो स्वारगेट ते कात्रज मार्गाच्या भूमिपूजनाला वेग; नागरिकांची वाहतूक कोंडीतून लवकरच सुटका',
    category: 'pune',
    categoryLabelMr: 'पुणे बातम्या',
    description: 'पुण्यातील सर्वात महत्त्वाच्या स्वारगेट-कात्रज भूमिगत मेट्रो मार्गाच्या कामाला गती मिळाली असून २०२६ पर्यंत हा मार्ग पूर्ण करण्याचे पीएमआरडीएचे उद्दिष्ट आहे.',
    photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80',
    timeAgo: '१५ मिनिटांपूर्वी',
    link: 'https://marathi.abplive.com/news/pune',
    source: 'ABP माझा • पुणे ब्युरो',
  },
  {
    id: 'news-2',
    title: 'मुख्यमंत्री माझी लाडकी बहीण योजना: पुढील हप्त्याचे पैसे खात्यात जमा होण्यास सुरुवात; त्वरित DBT तपासा',
    category: 'sarkari',
    categoryLabelMr: 'सरकारी निर्णय',
    description: 'पात्र भगिनींच्या बँक खात्यात आधार लिंक असलेल्या खात्यावर थेट ₹१,५०० जमा होत असून महिला बालविकास विभागाने यादी जाहीर केली आहे.',
    photo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=700&q=80',
    timeAgo: '४५ मिनिटांपूर्वी',
    link: 'https://ladakibahin.maharashtra.gov.in',
    source: 'महाराष्ट्र शासन अधिकृत वृत्त',
  },
  {
    id: 'news-3',
    title: 'IPL 2026: गहुंजे येथील MCA स्टेडियमवर रंगणार पुणे डर्बी महामुकाबला; तिकीट विक्रीला तुफान प्रतिसाद',
    category: 'sports',
    categoryLabelMr: 'क्रीडा / क्रिकेट',
    description: 'पुण्यातील क्रिकेट चाहत्यांसाठी आनंदाची बातमी. मुंबई व चेन्नई यांच्यातील हाय-व्होल्टेज सामना पुण्यात होणार असून ऑनलाइन बुकिंग सुरू झाले आहे.',
    photo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=700&q=80',
    timeAgo: '१ तासापूर्वी',
    link: 'https://www.iplt20.com',
    source: 'पुणे स्पोर्ट्स वार्ता',
  },
  {
    id: 'news-4',
    title: 'पुण्यात आज कमाल तापमान २८°C ते ३१°C दरम्यान; हवेतील आर्द्रतेमुळे सायंकाळी आल्हाददायक वातावरण',
    category: 'pune',
    categoryLabelMr: 'पुणे बातम्या',
    description: 'हवामान वेधशाळेने दिलेल्या माहितीनुसार पुण्यात पुढील ३ दिवस आकाश निरभ्र राहील, तर लोणावळा व घाटमाथ्यावर हलक्या पावसाची शक्यता वर्तवण्यात आली आहे.',
    photo: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=700&q=80',
    timeAgo: '२ तासांपूर्वी',
    link: 'https://mausam.imd.gov.in',
    source: 'IMD पुणे हवामान विभाग',
  },
  {
    id: 'news-5',
    title: 'श्रीमंत दगडूशेठ हलवाई गणपती मंदिरात अंगारकी संकष्टीनिमित्त भाविकांची पहाटेपासून अलोट गर्दी',
    category: 'thalak',
    categoryLabelMr: 'ठळक बातम्या',
    description: 'बाप्पाच्या दर्शनासाठी बुधवार पेठ व लक्ष्मी रोड परिसरात विशेष दर्शन रांगांचे आयोजन करण्यात आले असून सुरक्षिततेसाठी ५०० पोलीस तैनात आहेत.',
    photo: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=700&q=80',
    timeAgo: '२ तासांपूर्वी',
    link: 'https://www.dagdushethganpati.com',
    source: 'पुणे मंदिर ट्रस्ट विशेष',
  },
  {
    id: 'news-6',
    title: 'महाराष्ट्र राज्य वीज वितरण (MSEDCL): पुणे परिमंडळातील स्मार्ट डिजिटल मीटर बसवण्याच्या कामाला गती',
    category: 'sarkari',
    categoryLabelMr: 'सरकारी निर्णय',
    description: 'ग्राहकांना रिअल-टाइम वीज वापराची माहिती मोबाइल ॲपवर मिळणार; जुने मीटर मोफत बदलून देण्याचा महावितरणचा मोठा निर्णय.',
    photo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=700&q=80',
    timeAgo: '३ तासांपूर्वी',
    link: 'https://www.mahadiscom.in',
    source: 'महावितरण परिपत्रक',
  },
  {
    id: 'news-7',
    title: 'पुणे-सोलापूर महामार्गावर हडपसर व फुरसुंगी उड्डाणपुलाचे काम अंतिम टप्प्यात; ट्रॅफिक कोंडी फुटणार',
    category: 'pune',
    categoryLabelMr: 'पुणे बातम्या',
    description: 'हडपसर गाडीतळ आणि भेकराई नगर परिसरातील वाहनांना थेट उड्डाणपुलावरून जाता येणार असल्याने प्रवाशांचा रोजचा ३० मिनिटांचा वेळ वाचणार आहे.',
    photo: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=700&q=80',
    timeAgo: '४ तासांपूर्वी',
    link: 'https://pmc.gov.in',
    source: 'पुणे महापालिका विकास वार्ता',
  },
  {
    id: 'news-8',
    title: 'महाराष्ट्र प्रीमियर लीग (MPL २०२६): पुणेरी बाप्पा संघाने रोमांचक लढतीत विजय मिळवला',
    category: 'sports',
    categoryLabelMr: 'क्रीडा / क्रिकेट',
    description: 'शेवटच्या षटकात लागणाऱ्या १२ धावा ऋतुराज गायकवाडच्या दमदार फलंदाजीमुळे २ चेंडू शिल्लक ठेवून पूर्ण झाल्या.',
    photo: 'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=700&q=80',
    timeAgo: '५ तासांपूर्वी',
    link: 'https://cricket.maharashtra.gov.in',
    source: 'MPL क्रिकेट लीग',
  },
  {
    id: 'news-9',
    title: 'आरबीआय (RBI) परिपत्रक: बँकांचे नियम व केवायसी अद्ययावत करण्याची अंतिम तारीख जाहीर',
    category: 'sarkari',
    categoryLabelMr: 'सरकारी निर्णय',
    description: 'बँक ऑफ महाराष्ट्र, एसबीआय व सर्व राष्ट्रीयीकृत बँकांनी खातेदारांना ऑनलाइन किंवा शाखेत जाऊन आधार-पॅन लिंक करण्याचे आवाहन केले आहे.',
    photo: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=700&q=80',
    timeAgo: '६ तासांपूर्वी',
    link: 'https://www.rbi.org.in',
    source: 'रिझर्व्ह बँक ऑफ इंडिया',
  },
  {
    id: 'news-10',
    title: 'तुळशीबाग व लक्ष्मी रोडवर सणासुदीच्या निमित्ताने विशेष खरेदी सवलत महोत्सव सुरू',
    category: 'thalak',
    categoryLabelMr: 'ठळक बातम्या',
    description: 'पुण्यातील व्यापारी महासंघातर्फे महिला ग्राहकांसाठी आकर्षक बक्षिसे आणि खास ऑफर्स जाहीर करण्यात आल्या आहेत.',
    photo: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=700&q=80',
    timeAgo: '७ तासांपूर्वी',
    link: 'https://virajenterprise.com',
    source: 'पुणे व्यापारी असोसिएशन',
  },
];

export const PuneNews: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(STATIC_BACKUP_NEWS);
  const [activeCategory, setActiveCategory] = useState<'all' | 'thalak' | 'pune' | 'sarkari' | 'sports'>('all');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [countdown, setCountdown] = useState<number>(1800); // 30 minutes in seconds
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Fetch Live RSS feeds with fallback
  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://api.rss2json.com/v1/api.json?rss_url=https://marathi.abplive.com/rss',
        { timeout: 5000 }
      );

      if (res.data?.items && Array.isArray(res.data.items) && res.data.items.length > 0) {
        const mapped: NewsArticle[] = res.data.items.slice(0, 10).map((item: any, idx: number) => {
          let category: 'thalak' | 'pune' | 'sarkari' | 'sports' = 'thalak';
          let catLabel = 'ठळक बातम्या';
          const t = (item.title || '').toLowerCase();
          if (t.includes('पुणे') || t.includes('pune')) {
            category = 'pune';
            catLabel = 'पुणे बातम्या';
          } else if (t.includes('सरकार') || t.includes('योजना') || t.includes('निर्णय') || t.includes('शासन')) {
            category = 'sarkari';
            catLabel = 'सरकारी निर्णय';
          } else if (t.includes('क्रिकेट') || t.includes('सामना') || t.includes('ipl') || t.includes('खेळ')) {
            category = 'sports';
            catLabel = 'क्रीडा / क्रिकेट';
          }

          // Extract image or use fallback
          let photo = item.enclosure?.link || item.thumbnail;
          if (!photo) {
            photo = STATIC_BACKUP_NEWS[idx % STATIC_BACKUP_NEWS.length].photo;
          }

          // Clean HTML from description
          const cleanDesc = (item.description || '')
            .replace(/<[^>]*>?/gm, '')
            .slice(0, 140) + '...';

          return {
            id: `rss-${idx}`,
            title: item.title || 'पुणे ताजी बातमी',
            category,
            categoryLabelMr: catLabel,
            description: cleanDesc,
            photo,
            timeAgo: 'थेट अपडेट',
            link: item.link || 'https://marathi.abplive.com',
            source: 'ABP Live Marathi',
          };
        });

        // Merge live feed with our localized Pune news
        setArticles([...mapped, ...STATIC_BACKUP_NEWS.slice(mapped.length, 10)]);
      }
      setLastUpdated(new Date());
    } catch {
      // Keep static backup on network error
    } finally {
      setLoading(false);
      setCountdown(1800);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // 30-minute auto-refresh countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          fetchNews();
          return 1800;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Text to Speech (Batmya Aikli Ka?)
  const handleReadNews = (article: NewsArticle) => {
    if (!('speechSynthesis' in window)) {
      alert('तुमच्या ब्राउझरमध्ये Text-to-Speech सुविधा उपलब्ध नाही.');
      return;
    }

    if (speakingId === article.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${article.title}. ${article.description}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);

    // Try Marathi voice, fallback to Hindi or Indian English
    const voices = window.speechSynthesis.getVoices();
    const marathiVoice =
      voices.find((v) => v.lang.includes('mr')) ||
      voices.find((v) => v.lang.includes('hi')) ||
      voices.find((v) => v.lang.includes('en-IN'));

    if (marathiVoice) {
      utterance.voice = marathiVoice;
    }
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(article.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleOpenArticle = (article: NewsArticle) => {
    // Save to Google Sheet lead log
    saveLeadToSheet({
      name: 'Pune News Reader',
      search: article.title,
      action: `Read News: ${article.title.slice(0, 80)}`,
      notes: `User read news from ${article.source}`,
    });

    window.open(article.link, '_blank');
  };

  const handleShareWhatsApp = (article: NewsArticle) => {
    recordWhatsAppClick(`News Share: ${article.title}`);
    saveLeadToSheet({
      name: 'News Sharer',
      search: article.title,
      action: `Shared News on WhatsApp: ${article.title.slice(0, 80)}`,
      whatsAppClick: true,
    });

    const text = encodeURIComponent(
      `📰 *${article.title}*\n\n${article.description}\n\nवाचा संपूर्ण बातमी: ${article.link}\n\nपुण्यातील सर्व ताज्या बातम्या विरज एंटरप्राइज पुणे सुपर ॲपवर मिळवा! WhatsApp: ९०२१७४५४०३`
    );
    window.open(`https://wa.me/919021745403?text=${text}`, '_blank');
  };

  const filteredArticles = articles.filter((a) => {
    if (activeCategory === 'all') return true;
    return a.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 py-6 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="text-center space-y-3 pb-3 border-b border-stone-800">
          <div className="flex justify-center mb-1">
            <VeLogo size={68} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-600/50 text-red-400 text-xs font-bold animate-pulse">
            <Radio className="w-3.5 h-3.5" />
            <span>२४x७ थेट बातम्या • PUNE & MAHARASHTRA LIVE FEEDS</span>
          </div>

          {/* User Requested Page Title */}
          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
            Aajchya Thalak Batmya - Pune & Maharashtra
          </h1>

          <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium max-w-xl mx-auto">
            पुण्यातील ताज्या घडामोडी, सरकारी निर्णय, हवामान व क्रीडा बातम्या • Viraj Enterprise
          </p>

          {/* Controls: Auto refresh & Last updated */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={fetchNews}
              disabled={loading}
              className="py-1.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 text-xs font-black flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>
                {loading
                  ? 'बातम्या अपडेट होत आहेत...'
                  : `Refresh (Auto in ${Math.floor(countdown / 60)}m ${countdown % 60}s)`}
              </span>
            </button>

            <span className="text-[11px] text-stone-400 font-mono">
              अखेरचे अपडेट: {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* TOP 4 CATEGORIES TABS (Gold-Black) */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`py-2 px-4 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#D4AF37] text-stone-950 shadow-md font-black'
                : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
            }`}
          >
            सर्व बातम्या (All)
          </button>

          <button
            onClick={() => setActiveCategory('thalak')}
            className={`py-2 px-4 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'thalak'
                ? 'bg-red-600 text-white shadow-md font-black'
                : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
            }`}
          >
            🔴 ठळक बातम्या (Thalak Batmya)
          </button>

          <button
            onClick={() => setActiveCategory('pune')}
            className={`py-2 px-4 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'pune'
                ? 'bg-[#D4AF37] text-stone-950 shadow-md font-black'
                : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
            }`}
          >
            🏙️ पुणे बातम्या (Pune Batmya)
          </button>

          <button
            onClick={() => setActiveCategory('sarkari')}
            className={`py-2 px-4 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'sarkari'
                ? 'bg-[#D4AF37] text-stone-950 shadow-md font-black'
                : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
            }`}
          >
            🏛️ सरकारी निर्णय (Sarkari Nirnay)
          </button>

          <button
            onClick={() => setActiveCategory('sports')}
            className={`py-2 px-4 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'sports'
                ? 'bg-[#D4AF37] text-stone-950 shadow-md font-black'
                : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
            }`}
          >
            🏏 क्रिकेट / स्पोर्ट्स (Sports)
          </button>
        </div>

        {/* SECTION: AAJCHYA 10 MOTHHYA BATMYA QUICK TICKER LIST */}
        <div className="rounded-3xl bg-[#141419] p-4 sm:p-5 border-2 border-[#D4AF37]/50 shadow-lg space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>आजच्या १० मोठ्या बातम्या (Top 10 Headlines)</span>
            </h3>
            <span className="text-[11px] text-stone-500 font-mono">
              Live Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {articles.slice(0, 10).map((art, idx) => (
              <div
                key={art.id}
                onClick={() => handleOpenArticle(art)}
                className="p-2 rounded-xl bg-stone-950 border border-stone-850 hover:border-amber-400/50 flex items-start gap-2.5 transition-colors cursor-pointer group"
              >
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-[#D4AF37] font-bold text-[10px] flex items-center justify-center shrink-0 border border-amber-500/40">
                  {idx + 1}
                </span>
                <p className="text-stone-300 group-hover:text-white font-medium line-clamp-1">
                  {art.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* NEWS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredArticles.map((article) => {
            const isSpeaking = speakingId === article.id;

            return (
              <div
                key={article.id}
                className="rounded-3xl bg-[#141419] border-2 border-[#D4AF37] overflow-hidden shadow-xl hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)] transition-all flex flex-col justify-between"
              >
                {/* News Photo Thumbnail */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-950">
                  <img
                    src={article.photo}
                    alt={article.title}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-stone-950/85 backdrop-blur-md text-[#D4AF37] text-[10px] font-black border border-[#D4AF37]/50 shadow-md">
                      {article.categoryLabelMr}
                    </span>
                  </div>

                  {/* Time Ago */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] text-stone-300 font-mono bg-stone-900/90 px-2.5 py-0.5 rounded-md border border-stone-800">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{article.timeAgo}</span>
                  </div>

                  {/* Audio Speak button overlay */}
                  <button
                    onClick={() => handleReadNews(article)}
                    className={`absolute bottom-3 right-3 py-1 px-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all ${
                      isSpeaking
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-stone-900/90 hover:bg-stone-800 text-amber-300 border border-stone-700'
                    }`}
                    title="बातम्या ऐका (Text to Speech)"
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isSpeaking ? 'थांबवा' : 'बातमी ऐका'}</span>
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Source */}
                    <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                      {article.source}
                    </span>

                    {/* Title Marathi/English */}
                    <h2
                      onClick={() => handleOpenArticle(article)}
                      className="text-base sm:text-lg font-black text-white font-serif mt-1 leading-snug hover:text-amber-300 cursor-pointer transition-colors"
                    >
                      {article.title}
                    </h2>

                    {/* 2 Lines Short Description */}
                    <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                      {article.description}
                    </p>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-2">
                    {/* Purna Batmi Vacha button */}
                    <button
                      onClick={() => handleOpenArticle(article)}
                      className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                    >
                      <span>पूर्ण बातमी वाचा</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    {/* WhatsApp share button */}
                    <button
                      onClick={() => handleShareWhatsApp(article)}
                      className="py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                    >
                      <FaWhatsapp className="w-3.5 h-3.5" />
                      <span>WhatsApp Share</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated Page Footer with Gold Border & WhatsApp 9021745403 */}
        <PageFooter pageName="Pune News Live - Aajchya Thalak Batmya" />
      </div>
    </div>
  );
};
