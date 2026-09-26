import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Navigation,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Language } from '../data/translations';
import { AppView } from './Header';
import { CategoryId, PlaceItem } from '../types';

interface FloatingVoiceAgentProps {
  language: Language;
  onNavigateView: (view: AppView) => void;
  onSelectCategory: (cat: CategoryId | 'all') => void;
  onSearchPlace: (query: string) => void;
  onOpenEmergency: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

function getSpeechClass(): any {
  if (typeof window === 'undefined') return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

export const FloatingVoiceAgent: React.FC<FloatingVoiceAgentProps> = ({
  language,
  onNavigateView,
  onSelectCategory,
  onSearchPlace,
  onOpenEmergency,
  isOpen,
  onToggleOpen,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interim, setInterim] = useState('');
  const [aiReply, setAiReply] = useState('');
  const [detectedAction, setDetectedAction] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechLang, setSpeechLang] = useState<'mr-IN' | 'hi-IN' | 'en-IN'>('mr-IN');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechClass = getSpeechClass();
    if (!SpeechClass) return;

    try {
      const recognition = new SpeechClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = speechLang;

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMsg(null);
      };

      recognition.onresult = (event: any) => {
        let interimText = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalText += event.results[i][0].transcript;
          } else {
            interimText += event.results[i][0].transcript;
          }
        }

        if (finalText) {
          setTranscript(finalText);
          setInterim('');
          processVoiceQuery(finalText);
        } else {
          setInterim(interimText);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMsg('कृपया ब्राऊझरमध्ये मायक्रोफोनची परवानगी द्या (Allow mic access).');
        } else if (event.error !== 'no-speech') {
          setErrorMsg(`Voice Error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('SpeechRecognition init error:', e);
    }

    return () => {
      stopListening();
      stopSpeaking();
    };
  }, [speechLang]);

  // When modal is opened, trigger mic immediately
  useEffect(() => {
    if (isOpen) {
      setTranscript('');
      setInterim('');
      setAiReply('');
      setDetectedAction(null);
      setErrorMsg(null);
      const timer = setTimeout(() => {
        startListening();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      stopListening();
      stopSpeaking();
    }
  }, [isOpen]);

  const startListening = () => {
    stopSpeaking();
    setErrorMsg(null);
    if (!recognitionRef.current) {
      setErrorMsg('Web Speech API या ब्राऊझरमध्ये उपलब्ध नाही. खालील बटणे वापरा.');
      return;
    }

    try {
      recognitionRef.current.lang = speechLang;
      recognitionRef.current.start();
    } catch {
      try {
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current?.start(), 150);
      } catch (err) {
        console.warn('Error starting speech:', err);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const speakInMarathi = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    stopSpeaking();
    const clean = text.replace(/[*_#•`]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'mr-IN';
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const mrVoice = voices.find((v) => v.lang.startsWith('mr') || v.name.includes('Marathi'));
    const hiVoice = voices.find((v) => v.lang.startsWith('hi'));
    if (mrVoice) {
      utterance.voice = mrVoice;
    } else if (hiVoice) {
      utterance.voice = hiVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Understand user intent & auto-navigate
  const processVoiceQuery = async (query: string) => {
    const q = query.toLowerCase();
    setIsProcessing(true);
    let reply = '';
    let actionDesc = '';

    // INTENT 1: Traffic check (e.g. "Hinjewadi la traffic ahe ka?", "Chandani chowk traffic")
    if (
      q.includes('traffic') ||
      q.includes('ट्रॅफिक') ||
      q.includes('जाम') ||
      q.includes('गर्दी') ||
      q.includes('वाहतूक') ||
      q.includes('रस्ता')
    ) {
      reply =
        'होय, मी तुम्हाला थेट पुणे गुगल ट्रॅफिक मॅपवर घेऊन जात आहे. हिंजवडी, चांदणी चौक आणि विद्यापीठ चौकातील ट्रॅफिक लेयर व नागरिकांचे ताजे अलर्ट येथे तपासा!';
      actionDesc = 'थेट ट्रॅफिक मॅप उघडत आहे...';
      setDetectedAction(actionDesc);
      onNavigateView('traffic_map');
    }
    // INTENT 2: Dagdusheth Mandir / Mandir / Tourist
    else if (
      q.includes('दगडूशेठ') ||
      q.includes('dagdusheth') ||
      q.includes('शनिवार वाडा') ||
      q.includes('shaniwar wada') ||
      q.includes('सिंहगड') ||
      q.includes('sinhagad') ||
      q.includes('लोणावळा') ||
      q.includes('lonavala') ||
      q.includes('आगाखान') ||
      q.includes('mandir') ||
      q.includes('मंदिर') ||
      q.includes('दर्शन') ||
      q.includes('पर्यटन') ||
      q.includes('किल्ला')
    ) {
      if (q.includes('दगडूशेठ') || q.includes('dagdusheth')) {
        reply =
          'श्रीमंत दगडूशेठ हलवाई गणपती मंदिर बुधवार पेठेत आहे. दर्शन सकाळी ६ ते रात्री १०:३० पर्यंत सुरू असते. दुपारी बंद नसते. मी तुम्हाला मंदिराचे कार्ड दाखवत आहे!';
        onSearchPlace('दगडूशेठ');
      } else if (q.includes('शनिवार') || q.includes('shaniwar')) {
        reply =
          'शनिवार वाडा सकाळी ९:३० ते ५:३० खुला असतो. भारतीय नागरिकांसाठी तिकीट ₹२५ आहे. मी तुम्हाला शनिवार वाड्याचे तपशील दाखवत आहे.';
        onSearchPlace('शनिवार वाडा');
      } else if (q.includes('सिंहगड') || q.includes('sinhagad')) {
        reply =
          'सिंहगड किल्ला सकाळी ५ ते संध्याकाळी ६ खुला असतो. वर गरमागरम पिठलं-भाकरी व कांदा भजी मिळतात!';
        onSearchPlace('सिंहगड');
      } else {
        reply = 'मी तुम्हाला पुण्यातील सर्व प्रमुख ऐतिहासिक मंदिरे व पर्यटन स्थळे दाखवत आहे!';
        onSelectCategory('tourist');
      }
      actionDesc = 'पर्यटन स्थळे उघडत आहे...';
      setDetectedAction(actionDesc);
      onNavigateView('places');
    }
    // INTENT 3: Train Booking / Pune Jn
    else if (
      q.includes('train') ||
      q.includes('रेल्वे') ||
      q.includes('गाडी') ||
      q.includes('ट्रेन') ||
      q.includes('irctc') ||
      q.includes('लोकल') ||
      q.includes('station') ||
      q.includes('स्थानक')
    ) {
      reply =
        'पुणे जंक्शनवरून (PUNE) मुंबईसाठी डेक्कन क्वीन, वंदे भारत, आणि दिल्ली, बंगळुरू, गोवा गाड्यांचे वेळापत्रक व थेट IRCTC बुकिंग पेज उघडत आहे!';
      actionDesc = 'पुणे रेल्वे बुकिंग उघडत आहे...';
      setDetectedAction(actionDesc);
      onNavigateView('trains');
    }
    // INTENT 4: Flight Booking / PNQ
    else if (
      q.includes('flight') ||
      q.includes('विमान') ||
      q.includes('उड्डाण') ||
      q.includes('airport') ||
      q.includes('विमानतळ') ||
      q.includes('लोहेगाव') ||
      q.includes('pnq')
    ) {
      reply =
        'पुणे आंतरराष्ट्रीय विमानतळ (लोहेगाव टर्मिनल २) थेट उड्डाणे आणि इंडिगो, एअर इंडिया व आकासा एअर बुकिंग पेज उघडत आहे!';
      actionDesc = 'विमान बुकिंग उघडत आहे...';
      setDetectedAction(actionDesc);
      onNavigateView('flights');
    }
    // INTENT 5: IT Parks (Hinjewadi, Kharadi, Magarpatta)
    else if (
      q.includes('it park') ||
      q.includes('आयटी') ||
      q.includes('hinjewadi') ||
      q.includes('hinjawadi') ||
      q.includes('हिंजवडी') ||
      q.includes('kharadi') ||
      q.includes('खराडी') ||
      q.includes('eon') ||
      q.includes('magarpatta') ||
      q.includes('मगरपट्टा') ||
      q.includes('baner') ||
      q.includes('बाणेर')
    ) {
      reply =
        'हिंजवडी इन्फोटेक पार्क, खराडी इऑन फ्री झोन आणि मगरपट्टा सायबरसिटीची माहिती दाखवत आहे!';
      actionDesc = 'आयटी पार्क्स उघडत आहे...';
      setDetectedAction(actionDesc);
      onNavigateView('places');
      onSelectCategory('it_parks');
    }
    // INTENT 6: Food / Misal / Restaurants
    else if (
      q.includes('food') ||
      q.includes('मिसळ') ||
      q.includes('misal') ||
      q.includes('खाद्य') ||
      q.includes('जेवण') ||
      q.includes('vaishali') ||
      q.includes('वैशाली') ||
      q.includes('चहा') ||
      q.includes('नाश्ता') ||
      q.includes('hotel vaishali')
    ) {
      reply =
        'पुण्यातील अव्वल खवय्येगिरी! हॉटेल वैशालीची एसपीएस, बेडेकर व काटाकिर्र मिसळ, कॅफे गुडलकचा बन मस्का आणि चितळे बंधूंची बाकरवडी दाखवत आहे!';
      actionDesc = 'खाद्यसंस्कृती उघडत आहे...';
      setDetectedAction(actionDesc);
      onNavigateView('places');
      onSelectCategory('restaurants');
    }
    // INTENT 7: Hotel Room Booking
    else if (
      q.includes('hotel') ||
      q.includes('हॉटेल') ||
      q.includes('लॉज') ||
      q.includes('room') ||
      q.includes('रूम') ||
      q.includes('stay') ||
      q.includes('राहणे')
    ) {
      reply =
        'पुण्यातील सर्वोत्तम हॉटेल्स उपलब्ध आहेत. तुम्ही ₹२९९ आगाऊ टोकन भरून थेट हॉटेल आरक्षण करू शकता!';
      actionDesc = 'हॉटेल्स श्रेणी उघडत आहे...';
      setDetectedAction(actionDesc);
      onNavigateView('places');
      onSelectCategory('hotels');
    }
    // INTENT 8: Pune Metro
    else if (
      q.includes('metro') ||
      q.includes('मेट्रो') ||
      q.includes('purple line') ||
      q.includes('aqua line') ||
      q.includes('जांभळी') ||
      q.includes('swargate') ||
      q.includes('स्वारगेट')
    ) {
      reply =
        'पुणे मेट्रोचे जांभळी मार्गिका (PCMC ते स्वारगेट) व ॲक्वा मार्गिका (वनाज ते रामवाडी) मार्गदर्शक, भाडे कॅल्क्युलेटर व थेट व्हॉट्सॲप तिकीट पेज उघडत आहे!';
      actionDesc = 'पुणे मेट्रो मार्गदर्शक उघडत आहे...';
      setDetectedAction(actionDesc);
      onNavigateView('metro');
    }
    // INTENT 9: Pune Leaders (Amdar, Khasdar, Nagarsevak)
    else if (
      q.includes('amdar') ||
      q.includes('आमदार') ||
      q.includes('khasdar') ||
      q.includes('खासदार') ||
      q.includes('nagarsevak') ||
      q.includes('नगरसेवक') ||
      q.includes('mla') ||
      q.includes('mp') ||
      q.includes('कॉर्पोरेटर') ||
      q.includes('लोकप्रतिनिधी')
    ) {
      reply =
        'पुण्यातील सर्व आमदार, खासदार व प्रभाग नगरसेवकांची अधिकृत शासकीय कार्यालय संपर्क यादी उघडत आहे!';
      actionDesc = 'लोकप्रतिनिधी निर्देशिका उघडत आहे...';
      setDetectedAction(actionDesc);
      onNavigateView('leaders');
    }
    // INTENT 10: Live CNG & Fuel Pumps
    else if (
      q.includes('cng') ||
      q.includes('सीएनजी') ||
      q.includes('पेट्रोल') ||
      q.includes('petrol') ||
      q.includes('diesel') ||
      q.includes('पंप') ||
      q.includes('चार्जिंग') ||
      q.includes('ev')
    ) {
      reply =
        'पुण्यातील सर्व सीएनजी, पेट्रोल व ईव्ही चार्जिंग स्टेशन्सचे थेट लाइव्ह स्टेटस उघडत आहे. तुम्ही स्वतः पंपाची रांग अपडेट करू शकता!';
      actionDesc = 'थेट सीएनजी व फ्युएल ट्रॅकर उघडत आहे...';
      setDetectedAction(actionDesc);
      onNavigateView('fuel');
    }
    // INTENT 11: Civic Services (Gas, LIC, Insurance)
    else if (
      q.includes('gas') ||
      q.includes('गॅस') ||
      q.includes('सिलिंडर') ||
      q.includes('lic') ||
      q.includes('एलआयसी') ||
      q.includes('insurance') ||
      q.includes('विमा') ||
      q.includes('puc') ||
      q.includes('पीयूसी')
    ) {
      reply =
        'भारत गॅस, एचपी, इण्डेन बुकिंग, एलआयसी शाखा आणि वाहन विमा नूतनीकरण अलर्ट डेस्क उघडत आहे!';
      actionDesc = 'नागरिक सेवा केंद्र उघडत आहे...';
      setDetectedAction(actionDesc);
      onNavigateView('services');
    }
    // INTENT 12: Entertainment & Ganpati Songs
    else if (
      q.includes('गाणी') ||
      q.includes('गाणे') ||
      q.includes('आरती') ||
      q.includes('aarti') ||
      q.includes('song') ||
      q.includes('मनोरंजन') ||
      q.includes('भक्तिगीत')
    ) {
      reply =
        'पुणेरी पारंपरिक गणेशोत्सवाची महाआरती आणि लोकप्रिय भक्तिगीते प्लेअर उघडत आहे!';
      actionDesc = 'मनोरंजन व आरती प्लेअर उघडत आहे...';
      setDetectedAction(actionDesc);
      onNavigateView('entertainment');
    }
    // INTENT 13: Pune Pulse Live News Feed
    else if (
      q.includes('pulse') ||
      q.includes('पल्स') ||
      q.includes('फीड') ||
      q.includes('news') ||
      q.includes('बातमी') ||
      q.includes('अपडेट')
    ) {
      reply =
        'पुणे पल्स थेट नागरी फीड उघडत आहे. नागरिकांचे ताजे अलर्ट्स व घडामोडी तपासा!';
      actionDesc = 'पुणे पल्स उघडत आहे...';
      setDetectedAction(actionDesc);
      onNavigateView('pulse');
    }
    // INTENT 14: Emergency
    else if (
      q.includes('emergency') ||
      q.includes('आपत्कालीन') ||
      q.includes('मदत') ||
      q.includes('police') ||
      q.includes('पोलीस') ||
      q.includes('ambulance') ||
      q.includes('रुग्णवाहिका') ||
      q.includes('108') ||
      q.includes('112')
    ) {
      reply = 'तातडीच्या मदतीसाठी डायल ११२ पोलीस किंवा १०८ रुग्णवाहिका तात्काळ उपलब्ध आहे!';
      actionDesc = 'इमर्जन्सी सेवा उघडत आहे...';
      setDetectedAction(actionDesc);
      onOpenEmergency();
    }
    // GENERAL PUNE AI ANSWER
    else {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: query, language: 'mr' }),
        });
        const data = await res.json();
        reply = data.reply || 'नमस्कार! मी पुण्याचा स्मार्ट मित्र आहे.';
      } catch {
        reply = 'नमस्कार! मी पुण्याचा स्मार्ट मित्र आहे. सांगा, आज मी तुम्हाला पुण्यात कुठे मदत करू?';
      }
    }

    setAiReply(reply);
    setIsProcessing(false);
    speakInMarathi(reply);
  };

  return (
    <>
      {/* Floating 'पु' Voice Button at Bottom Right */}
      {!isOpen && (
        <button
          onClick={onToggleOpen}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 p-3 sm:px-4 sm:py-3.5 rounded-full bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600 hover:from-orange-700 hover:to-emerald-700 text-white shadow-2xl shadow-orange-600/40 hover:scale-105 active:scale-95 transition-all group ring-4 ring-orange-500/20 cursor-pointer"
          aria-label="Open Pune AI Voice Assistant"
          title="पुण्याचा स्मार्ट मित्र - व्हॉईस असिस्टंट (बोला)"
        >
          {/* Pulsing 'पु' Emblem */}
          <div className="relative">
            <span className="w-9 h-9 rounded-full bg-white text-orange-600 font-extrabold flex items-center justify-center text-base shadow-xs select-none">
              पु
            </span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <div className="flex items-center gap-1">
              <span className="text-xs font-black tracking-tight leading-none font-devanagari-hero">
                पुण्याचा स्मार्ट मित्र
              </span>
              <Mic className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
            </div>
            <span className="text-[10px] text-amber-100 font-bold mt-0.5">
              व्हॉईस एजंट (मराठीत बोला)
            </span>
          </div>
        </button>
      )}

      {/* Full-Screen Voice Overlay Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-stone-900 border-2 border-orange-500 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative flex flex-col items-center text-center overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => {
                stopListening();
                stopSpeaking();
                onToggleOpen();
              }}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close voice assistant"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Language Switcher for Voice */}
            <div className="inline-flex bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl text-[10px] font-bold mb-3 border border-stone-200 dark:border-stone-700">
              <button
                onClick={() => setSpeechLang('mr-IN')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  speechLang === 'mr-IN'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                मराठी (mr-IN)
              </button>
              <button
                onClick={() => setSpeechLang('hi-IN')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  speechLang === 'hi-IN'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                हिंदी (hi-IN)
              </button>
              <button
                onClick={() => setSpeechLang('en-IN')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  speechLang === 'en-IN'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                English
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-devanagari-hero mb-1">
              पुण्याचा स्मार्ट मित्र (व्हॉईस एजंट)
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mb-5">
              "हिंजवडीला ट्रॅफिक आहे का?", "दगडूशेठ मंदिर दाखव", "रेल्वे बुकिंग", "हॉटेल बुक कर" असे काहीही विचारा!
            </p>

            {/* Central Animated Mic Orb */}
            <div className="relative my-3 flex items-center justify-center">
              {isListening && (
                <>
                  <span className="absolute w-36 h-36 rounded-full bg-orange-500/20 animate-ping pointer-events-none" />
                  <span className="absolute w-28 h-28 rounded-full bg-emerald-500/30 animate-pulse pointer-events-none" />
                </>
              )}

              {isSpeaking && (
                <span className="absolute w-32 h-32 rounded-full bg-amber-500/25 animate-pulse pointer-events-none" />
              )}

              <button
                onClick={isListening ? stopListening : startListening}
                className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer ${
                  isListening
                    ? 'bg-gradient-to-tr from-rose-600 via-orange-600 to-amber-500 text-white ring-8 ring-orange-500/30 shadow-orange-600/50'
                    : isSpeaking
                    ? 'bg-gradient-to-tr from-emerald-600 to-teal-600 text-white ring-8 ring-emerald-500/30 shadow-emerald-600/40'
                    : 'bg-gradient-to-tr from-orange-600 via-amber-600 to-emerald-600 text-white hover:scale-105 shadow-orange-600/30 ring-4 ring-orange-400/20'
                }`}
                aria-label={isListening ? 'Stop listening' : 'Start speaking'}
              >
                {isListening ? (
                  <>
                    <Mic className="w-10 h-10 animate-bounce" />
                    <span className="text-[10px] font-bold mt-1 uppercase tracking-wide">ऐकत आहे...</span>
                  </>
                ) : isSpeaking ? (
                  <>
                    <Volume2 className="w-10 h-10 animate-pulse" />
                    <span className="text-[10px] font-bold mt-1 uppercase tracking-wide">उत्तर देत आहे</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-10 h-10" />
                    <span className="text-[10px] font-bold mt-1 uppercase tracking-wide">माईक दाबा</span>
                  </>
                )}
              </button>
            </div>

            {/* Real-time Status */}
            <div className="min-h-[26px] my-1 flex items-center justify-center">
              {isListening && (
                <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400">
                  <span className="w-2 h-2 rounded-full bg-orange-600 animate-ping" />
                  <span>मी मराठीत ऐकत आहे... (Listening)</span>
                </div>
              )}

              {isProcessing && (
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-spin" />
                  <span>पुणेरी मित्र विचार करत आहे...</span>
                </div>
              )}

              {isSpeaking && (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span>मराठीत उत्तर ऐका</span>
                  <button
                    onClick={stopSpeaking}
                    className="ml-2 px-2 py-0.5 text-[10px] bg-stone-200 dark:bg-stone-800 rounded-md text-stone-700 dark:text-stone-300 hover:bg-stone-300"
                  >
                    थांबवा (Mute)
                  </button>
                </div>
              )}

              {!isListening && !isProcessing && !isSpeaking && !errorMsg && (
                <span className="text-xs text-stone-400 dark:text-stone-500 font-medium">
                  माईकवर क्लिक करा किंवा खालील प्रश्नावर टॅप करा
                </span>
              )}
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="w-full my-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Detected Action Badge */}
            {detectedAction && (
              <div className="w-full mt-2 p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-bold flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{detectedAction}</span>
                </div>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-md">
                  Auto-Navigated
                </span>
              </div>
            )}

            {/* Spoken Text Transcript */}
            {(transcript || interim) && (
              <div className="w-full mt-2.5 p-3 rounded-2xl bg-orange-50/80 dark:bg-stone-800 border border-orange-200 dark:border-stone-700 text-left">
                <span className="text-[10px] font-bold text-orange-700 dark:text-orange-400 block mb-0.5">
                  तुम्ही विचारलेले:
                </span>
                <p className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-100">
                  {transcript} <span className="text-stone-400 italic">{interim}</span>
                </p>
              </div>
            )}

            {/* AI Marathi Answer */}
            {aiReply && (
              <div className="w-full mt-2.5 p-3.5 rounded-2xl bg-white dark:bg-stone-850 border-2 border-emerald-500/50 text-left shadow-md max-h-36 overflow-y-auto">
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-stone-100 dark:border-stone-800">
                  <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                    पुण्याचा स्मार्ट मित्र (उत्तर):
                  </span>
                  <button
                    onClick={() => speakInMarathi(aiReply)}
                    className="p-1 rounded-md text-stone-500 hover:text-emerald-600 hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Replay Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs leading-relaxed text-stone-800 dark:text-stone-200 whitespace-pre-line font-medium">
                  {aiReply}
                </p>
              </div>
            )}

            {/* Quick Intent Pills */}
            <div className="w-full mt-3 pt-3 border-t border-stone-200 dark:border-stone-800 text-left">
              <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block mb-2">
                क्विक व्हॉईस प्रश्न (टॅप करा):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'हिंजवडीला ट्रॅफिक आहे का?',
                  'दगडूशेठ मंदिर दाखव',
                  'रेल्वे बुकिंग तिकीट',
                  'पुणे विमान बुकिंग',
                  'हॉटेल बुक कर',
                  'अस्सल पुणेरी मिसळ कुठे मिळेल?',
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setTranscript(prompt);
                      processVoiceQuery(prompt);
                    }}
                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-orange-100 dark:hover:bg-orange-950/80 hover:text-orange-700 transition-colors border border-stone-200 dark:border-stone-700 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
