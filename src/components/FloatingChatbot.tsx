import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  RefreshCw,
} from 'lucide-react';
import { ChatMessage } from '../types';
import { Language, translations } from '../data/translations';

interface FloatingChatbotProps {
  language: Language;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const FloatingChatbot: React.FC<FloatingChatbotProps> = ({
  language,
  isOpen,
  onToggleOpen,
}) => {
  const t = translations[language];

  const [chatLang, setChatLang] = useState<'mr' | 'hi' | 'en'>(
    language === 'mr' ? 'mr' : 'en'
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'model',
      text:
        language === 'mr'
          ? '🙏 **राम राम मंडळी! मी तुमचा "पुण्याचा स्मार्ट मित्र" (AI).**\nपुण्यातील मंदिरे, ऐतिहासिक किल्ले, अस्सल मिसळ, हॉस्पिटल्स, शाळा-कॉलेजेस किंवा मनपा सेवांबद्दल काहीही विचारा. मी मराठी, हिंदी आणि इंग्रजीत उत्तर देतो!'
          : '🙏 **Namaskar! I am your "Punecha Smart Mitra" (AI).**\nAsk me anything about Pune heritage, temples, iconic misal spots, hospitals, colleges, or PMC civic queries. I speak Marathi, Hindi & English!',
      timestamp: 'आत्ताच',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Keep chatLang synced if user toggles app language
  useEffect(() => {
    setChatLang(language === 'mr' ? 'mr' : 'en');
  }, [language]);

  const quickQuestions = [
    chatLang === 'mr'
      ? 'दगडूशेठ मंदिराची दर्शन वेळ काय आहे?'
      : 'What are Dagdusheth Mandir darshan timings?',
    chatLang === 'mr'
      ? 'पुण्यात अस्सल मिसळ आणि मस्तानी कुठे मिळेल?'
      : 'Where can I find Pune’s best Misal and Mastani?',
    chatLang === 'mr'
      ? 'शनिवार वाड्याचे तिकीट आणि वेळ सांगा?'
      : 'What are Shaniwar Wada tickets & timings?',
    chatLang === 'mr'
      ? 'पुणे मनपा (PMC) तक्रार हेल्पलाईन नंबर काय आहे?'
      : 'What is the PMC Citizen grievance helpline number?',
    chatLang === 'mr'
      ? 'पुण्यातील महत्त्वाचे आपत्कालीन क्रमांक?'
      : 'What are Pune’s essential emergency contact numbers?',
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputVal).trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: chatLang,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.reply || 'माफ करा, मी सध्या उत्तर देऊ शकत नाही. कृपया पुन्हा प्रयत्न करा.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn('Chat request failed, providing local answer:', err);
      // Resilient local answer
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text:
          chatLang === 'mr'
            ? 'पुण्याबद्दल विचारल्याबद्दल धन्यवाद! पुणे हे विद्येचे माहेरघर आणि छत्रपती शिवाजी महाराज व पेशव्यांच्या पराक्रमाची भूमी आहे. दगडूशेठ गणपती (सकाळी ६ ते रात्री १०:३०), शनिवार वाडा (९:३० ते ५:३०), आणि आपत्कालीन मदतीसाठी डायल ११२ सदैव उपलब्ध आहे.'
            : 'Pune is the cultural capital of Maharashtra! From Dagdusheth Halwai Ganpati Mandir (6 AM - 10:30 PM) to Shaniwar Wada (9:30 AM - 5:30 PM), PMC helpline (1800 1030 222), and emergency (112), Amche Pune welcomes you!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'knowledge_base',
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*_#•]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = chatLang === 'mr' ? 'mr-IN' : chatLang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={onToggleOpen}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 p-3 sm:px-4 sm:py-3.5 rounded-full bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600 hover:from-orange-700 hover:to-emerald-700 text-white shadow-2xl shadow-orange-600/40 hover:scale-105 active:scale-95 transition-all group ring-4 ring-orange-500/20"
          aria-label="Open Pune AI Agent Chatbot"
        >
          <div className="relative">
            <span className="w-8 h-8 rounded-full bg-white text-orange-600 font-bold flex items-center justify-center text-sm shadow-xs">
              पु
            </span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-extrabold tracking-tight leading-none">
              {t.appSubtitle}
            </span>
            <span className="text-[10px] text-amber-200 font-medium mt-0.5">
              AI Chatbot (मराठी/EN)
            </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 shadow-2xl flex flex-col overflow-hidden bg-white dark:bg-stone-900 border-2 border-orange-400 dark:border-stone-750 ${
            isExpanded
              ? 'inset-3 sm:inset-6 rounded-3xl'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[420px] h-[580px] max-h-[90vh] rounded-3xl'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 text-white p-4 flex items-center justify-between shadow-xs shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white font-extrabold text-base ring-1 ring-white/40">
                पु
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold tracking-tight font-devanagari-hero">
                    {t.aiAssistantTitle}
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-amber-100 font-medium">
                  मराठी · हिंदी · English
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Language Selector inside Chat */}
              <div className="flex bg-black/30 rounded-lg p-0.5 text-[10px] font-bold">
                {(['mr', 'en', 'hi'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setChatLang(lang)}
                    className={`px-1.5 py-0.5 rounded transition-colors ${
                      chatLang === lang ? 'bg-white text-stone-900' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'EN'}
                  </button>
                ))}
              </div>

              {/* Expand Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
                aria-label="Expand or shrink chat"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close */}
              <button
                onClick={onToggleOpen}
                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Questions Ticker */}
          <div className="bg-stone-50 dark:bg-stone-850 px-3 py-2 border-b border-stone-200 dark:border-stone-800 shrink-0 overflow-x-auto">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 shrink-0">
                {t.chatSuggestions}
              </span>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-full hover:border-orange-400 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors shadow-2xs"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-stone-50/50 dark:bg-stone-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs font-bold text-xs">
                    पु
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed shadow-xs relative group ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-br-xs'
                      : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 border border-stone-200 dark:border-stone-750 rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>

                  <div className="flex items-center justify-between mt-1 text-[10px] text-stone-400 dark:text-stone-500 pt-1">
                    <span>{msg.timestamp}</span>
                    {msg.role === 'model' && (
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleSpeak(msg.text)}
                          className="hover:text-orange-600 dark:hover:text-orange-400"
                          title="Read Aloud"
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-3 h-3 text-rose-500" />
                          ) : (
                            <Volume2 className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-stone-700 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-xs text-stone-500 dark:text-stone-400">
                <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
                  पु
                </div>
                <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-2.5 rounded-2xl rounded-bl-xs flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-100"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-200"></span>
                  <span className="text-[11px] ml-1">
                    {chatLang === 'mr' ? 'पुणेरी मित्र विचार करत आहे...' : 'Punecha Mitra is thinking...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white dark:bg-stone-850 border-t border-stone-200 dark:border-stone-800 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={t.chatPlaceholder}
                className="flex-1 py-2.5 px-3.5 text-xs sm:text-sm rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-hidden focus:ring-2 focus:ring-orange-500 border border-transparent font-medium"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || loading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-700 hover:to-emerald-700 transition-colors shadow-xs"
                aria-label={t.chatSend}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
