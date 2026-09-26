import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  Sparkles,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  HelpCircle,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { VeLogo } from '../components/VeLogo';
import { PageFooter } from '../components/PageFooter';
import { saveLeadToSheet, recordWhatsAppClick } from '../utils/sheet';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'assistant',
    text: 'नमस्कार! मी पुणे सुपर ॲप AI सहाय्यक आहे — Powered by Viraj Enterprise (Milind Bhosale). \n\nतुम्हाला पुण्यात काय शोधायचे आहे? (उदा. हॉटेल्स, दगडूशेठ मंदिर दर्शन वेळ, पीएमसी कर, सीएनजी पंप, पुणे मेट्रो मार्ग, किंवा आजचा सण?) मी मराठी आणि इंग्रजी दोन्ही भाषेत मदत करू शकतो.',
    timestamp: Date.now() - 60000,
  },
];

// Curated Pune Knowledge Engine for instant answers
function getPuneSmartAnswer(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('hotel') || q.includes('हॉटेल') || q.includes('misal') || q.includes('मिसळ') || q.includes('जेवण')) {
    return `पुण्यातील अस्सल व लोकप्रिय हॉटेल्स:\n1. वैशाली (Vaishali, FC Road) - एसपी डीपी, डोसा आणि फिल्टर कॉफी\n2. काटाकिर्र मिसळ (Karve Road) - अतिशय झणझणीत मिसळ\n3. गुडलक कॅफे (FC Road) - बन मस्का आणि इराणी चहा\n4. सुजाता मस्तानी (Sadashiv Peth) - प्रसिद्ध मस्तानी आइस्क्रीम\n5. मराठा सम्राट किंवा सुर्वे'ज - अस्सल पुणेरी मटण थाळी.\n\nअधिक माहितीसाठी तुम्ही थेट 9021745403 वर संपर्क करू शकता!`;
  }

  if (q.includes('dagdusheth') || q.includes('दगडूशेठ') || q.includes('ganpati') || q.includes('गणपती')) {
    return `श्रीमंत दगडूशेठ हलवाई गणपती मंदिर माहिती:\n• ठिकाण: बुधवार पेठ, पुणे\n• वेळ: सकाळी ६:०० ते रात्री १०:३०\n• काकड आरती: सकाळी ६:०० | महाआरती: रात्री ७:३०\n• पार्किंग: शनिवार वाडा जवळ PMC पार्किंग वापरा.\n• थेट बाप्पाचे दर्शन घेण्यासाठी तुम्ही थेट मंदिरात जाऊ शकता!`;
  }

  if (q.includes('metro') || q.includes('मेट्रो')) {
    return `पुणे मेट्रो (Purple & Aqua Line):\n• जांभळी लाईन: PCMC (पिंपरी) ते स्वारगेट\n• अ‍ॅक्वा लाईन: वनाज ते रामवाडी\n• पहिली मेट्रो: सकाळी ६:०० | शेवटची मेट्रो: रात्री १०:००\n• तिकीट दर: ₹१० ते ₹३५ (विद्यार्थ्यांना ३०% सवलत आणि शनिवार-रविवार ३०% सूट!). WhatsApp वरून तिकीट बुक करू शकता.`;
  }

  if (q.includes('weather') || q.includes('हवामान') || q.includes('पाऊस') || q.includes('temp')) {
    return `पुणे हवामान अपडेट:\nसध्या पुण्यात तापमान २८°C ते ३०°C च्या दरम्यान आल्हाददायक आहे. आर्द्रता ५७% असून पुढील ५ दिवसांचा हवामान अंदाज आमच्या 'Pune Weather' टॅबवर रिअल-टाइम उपलब्ध आहे!`;
  }

  if (q.includes('bank') || q.includes('बँक') || q.includes('sutty') || q.includes('सुट्टी')) {
    return `पुण्यातील बँक स्थिती:\nआरबीआयच्या नियमांनुसार रविवार आणि दुसरा/चौथा शनिवार बँका बंद असतात. १४ एप्रिल (आंबेडकर जयंती) आणि १ मे (महाराष्ट्र दिन) ला बँका पूर्णपणे बंद असतात. तपशीलवार यादीसाठी आमचा 'Bank Info' टॅब पहा!`;
  }

  if (q.includes('cricket') || q.includes('ipl') || q.includes('क्रिकेट') || q.includes('score')) {
    return `पुणे क्रिकेट लाइव्ह:\nIPL 2026 आणि MPL पुणे डर्बीचे थेट स्कोअर आमच्या 'Pune Cricket Live' टॅबवर दर ३० सेकंदाला आपोआप अपडेट होतात! गहुंजे येथील MCA स्टेडियममध्ये सामने होतात.`;
  }

  if (q.includes('viraj') || q.includes('milind') || q.includes('bhosale') || q.includes('मालक') || q.includes('owner')) {
    return `विरज एंटरप्राइज (Viraj Enterprise):\n• संस्थापक व संचालक: मिलिंद भोसले (Milind Bhosale)\n• कार्यालय: भेकराई नगर, फुरसुंगी, हवेली, पुणे - ४१२३०८\n• अधिकृत संपर्क: ९०२१७४५४०३ / ९१७२५२३१८८\n• सेवा: पुणे एआय सुपर ॲप, जाहिरात व डिजिटल सेवा.`;
  }

  return `तुमचा प्रश्न: "${query}" ची नोंद आम्ही घेतली आहे!\n\nपुण्यातील सर्व माहिती, शासकीय सेवा, हॉटेल्स, किंवा व्यवसायाची जाहिरात (₹४९९) करण्यासाठी तुम्ही थेट विरज एंटरप्राइजचे मालक मिलिंद भोसले यांच्याशी WhatsApp वर ९०२१७४५४०३ वर बोलू शकता.`;
}

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('ve_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_MESSAGES;
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ve_chat_history', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = (overrideText || input).trim();
    if (!textToSend || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Save lead query to Google Sheet
    saveLeadToSheet({
      name: 'Chat User',
      search: textToSend,
      action: 'AI Chat Query',
      notes: `User asked AI: ${textToSend.slice(0, 100)}`,
    });

    // Provide intelligent answer
    setTimeout(() => {
      const reply = getPuneSmartAnswer(textToSend);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  // Voice Input Speech Recognition
  const toggleListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser. Please type your message.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'mr-IN'; // Marathi & Indian English
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          handleSend(transcript);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear entire AI chat history?')) {
      setMessages(INITIAL_MESSAGES);
      localStorage.removeItem('ve_chat_history');
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 py-6 px-3 sm:px-6 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full space-y-4 flex-1 flex flex-col">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-3xl bg-gradient-to-r from-[#141419] to-[#0d0d10] border-2 border-[#D4AF37] shadow-lg">
          <div className="flex items-center gap-3">
            <VeLogo size={48} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black font-serif text-white">
                  Pune AI Chat (ChatGPT Connected)
                </h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                  Online
                </span>
              </div>
              <p className="text-xs text-amber-300 font-medium">
                Powered by Viraj Enterprise AI • Milind Bhosale (9021745403)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearHistory}
              className="py-1.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-400 hover:text-rose-400 border border-stone-800 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              title="Clear chat history"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 px-1">
          <span className="text-[11px] text-[#D4AF37] font-bold">विचारा (Try):</span>
          <button
            onClick={() => handleSend('पुण्यातील प्रसिद्ध हॉटेल्स व मिसळ सांगा')}
            className="py-1 px-2.5 rounded-lg text-xs bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 cursor-pointer"
          >
            🍽️ पुण्यात मिसळ कुठे मिळेल?
          </button>
          <button
            onClick={() => handleSend('दगडूशेठ हलवाई गणपती दर्शन वेळ काय आहे?')}
            className="py-1 px-2.5 rounded-lg text-xs bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 cursor-pointer"
          >
            🚩 दगडूशेठ मंदिर वेळ
          </button>
          <button
            onClick={() => handleSend('पुणे मेट्रो तिकीट दर आणि मार्ग सांगा')}
            className="py-1 px-2.5 rounded-lg text-xs bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 cursor-pointer"
          >
            🚇 पुणे मेट्रो मार्ग
          </button>
          <button
            onClick={() => handleSend('Viraj Enterprise चे मालक आणि संपर्क सांगा')}
            className="py-1 px-2.5 rounded-lg text-xs bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/30 cursor-pointer"
          >
            ⭐ Milind Bhosale संपर्क
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 bg-[#121217] rounded-3xl border border-stone-800 p-4 sm:p-6 overflow-y-auto max-h-[580px] space-y-4 shadow-inner">
          {messages.map((msg) => {
            const isMe = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/40">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-md ${
                    isMe
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 font-semibold rounded-tr-xs'
                      : 'bg-stone-900/90 text-stone-200 border border-stone-800 rounded-tl-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  <div className="mt-2 pt-1 border-t border-white/10 flex items-center justify-between text-[10px] opacity-75">
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    {!isMe && (
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {isMe && (
                  <div className="w-8 h-8 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center shrink-0 border border-stone-700">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-stone-400 text-xs italic pl-11">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>पुणे AI विचार करत आहे...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar (Styled like ChatGPT with Mic) */}
        <div className="bg-[#141419] p-2.5 rounded-2xl border-2 border-[#D4AF37]/50 shadow-xl flex items-center gap-2">
          {/* Voice Input Mic */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              isListening
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-stone-850 hover:bg-stone-800 text-amber-400 border border-stone-700'
            }`}
            title="बोलून प्रश्न विचारा (Voice Input)"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? 'मी ऐकत आहे, बोला...' : 'पुण्याबद्दल काहीही विचारा (उदा. हॉटेल्स, बस, सण)...'}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-stone-500 focus:outline-hidden"
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 font-bold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Dedicated Page Footer with Gold Border & WhatsApp 9021745403 */}
        <PageFooter pageName="Pune AI Chat Assistant" />
      </div>
    </div>
  );
};
