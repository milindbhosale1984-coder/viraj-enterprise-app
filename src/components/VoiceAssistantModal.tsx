import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  RotateCcw,
  Send,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import { Language } from '../data/translations';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

// Check Web Speech API availability
function getSpeechRecognitionClass(): any {
  if (typeof window === 'undefined') return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [voiceAvailable, setVoiceAvailable] = useState(true);

  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Suggested voice prompts in Marathi
  const voicePromptsMr = [
    'पुण्यात सर्वात चांगली मिसळ कुठे मिळेल?',
    'दगडूशेठ गणपतीची दर्शन वेळ सांगा?',
    'शनिवार वाड्याचे तिकीट आणि माहिती हवी आहे',
    'पुणे स्टेशन ते स्वारगेट पीएमपीएल बस कशी मिळेल?',
    'पुणे मनपा (PMC) हेल्पलाईन क्रमांक काय आहे?',
  ];

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechClass = getSpeechRecognitionClass();
    if (!SpeechClass) {
      setVoiceAvailable(false);
      return;
    }

    try {
      const recognition = new SpeechClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      // Primary language set to Marathi (mr-IN) as requested
      recognition.lang = 'mr-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMsg(null);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        if (final) {
          setTranscript(final);
          setInterimTranscript('');
          handleQuerySubmission(final);
        } else {
          setInterimTranscript(interim);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMsg(
            language === 'mr'
              ? 'कृपया ब्राऊझरमध्ये मायक्रोफोनची परवानगी (Microphone Permission) द्या.'
              : 'Please allow microphone access in your browser settings.'
          );
        } else if (event.error === 'no-speech') {
          setErrorMsg(
            language === 'mr'
              ? 'काही आवाज ऐकू आला नाही. कृपया पुन्हा मायक्रोफोनवर क्लिक करून बोला.'
              : 'No speech detected. Please click the mic and speak clearly.'
          );
        } else {
          setErrorMsg(`Voice error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.error('Error creating SpeechRecognition instance:', err);
      setVoiceAvailable(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
      stopSpeaking();
    };
  }, [language]);

  // When modal opens, start listening automatically after a slight delay
  useEffect(() => {
    if (isOpen) {
      setTranscript('');
      setInterimTranscript('');
      setAiResponse('');
      setErrorMsg(null);
      const timer = setTimeout(() => {
        startListening();
      }, 400);
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
      setErrorMsg(
        language === 'mr'
          ? 'तुमच्या ब्राऊझरमध्ये वेब स्पीच (Web Speech API) उपलब्ध नाही. खालील प्रश्न निवडा.'
          : 'Web Speech API is not supported in this browser. Please click a suggestion.'
      );
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (err: any) {
      // If already started, restart
      try {
        recognitionRef.current.stop();
        setTimeout(() => {
          recognitionRef.current?.start();
        }, 150);
      } catch (restartErr) {
        console.warn('Failed to start speech recognition:', restartErr);
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

  const handleQuerySubmission = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          language: 'mr', // Marathi prompt & response
        }),
      });

      if (!res.ok) {
        throw new Error(`Server status ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || 'नमस्कार! मी पुण्याचा स्मार्ट मित्र आहे.';
      setAiResponse(reply);

      // Automatically speak the answer in Marathi
      speakInMarathi(reply);
    } catch (err) {
      console.warn('Error fetching voice answer:', err);
      const fallbackReply =
        'नमस्कार! पुणे हे विद्येचे माहेरघर आणि सांस्कृतिक राजधानी आहे. दगडूशेठ गणपती (सकाळी ६ ते रात्री १०:३०), शनिवार वाडा (९:३० ते ५:३०), आणि तातडीच्या मदतीसाठी डायल ११२ सदैव तत्पर आहे.';
      setAiResponse(fallbackReply);
      speakInMarathi(fallbackReply);
    } finally {
      setIsProcessing(false);
    }
  };

  const speakInMarathi = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    stopSpeaking();

    // Clean markdown characters
    const cleanText = text.replace(/[*_#•`]/g, '').trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'mr-IN'; // Marathi
    utterance.rate = 0.95; // Natural rhythm

    // Try finding an Indian/Marathi voice if available
    const voices = window.speechSynthesis.getVoices();
    const marathiVoice = voices.find(
      (v) => v.lang === 'mr-IN' || v.lang.startsWith('mr') || v.name.includes('Marathi')
    );
    const hindiVoice = voices.find((v) => v.lang === 'hi-IN' || v.lang.startsWith('hi'));
    if (marathiVoice) {
      utterance.voice = marathiVoice;
    } else if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 border-2 border-orange-500 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative flex flex-col items-center text-center overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => {
            stopListening();
            stopSpeaking();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          aria-label="Close voice assistant"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative Puneri Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 text-xs font-extrabold uppercase tracking-wider mb-3 border border-orange-300 dark:border-orange-800">
          <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
          <span>मराठी व्हॉईस असिस्टंट · Pune Voice Agent</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-devanagari-hero mb-1">
          {language === 'mr' ? 'मराठीत बोला, मराठीत ऐका!' : 'Speak in Marathi, Listen in Marathi!'}
        </h3>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mb-6">
          {language === 'mr'
            ? 'खालील मायक्रोफोनवर क्लिक करून पुण्याच्या कोणत्याही ठिकाणाबद्दल, हॉटेलबद्दल किंवा मनपा सेवेबद्दल विचारा.'
            : 'Click the mic below to ask anything about Pune places, hotels, or civic services in Marathi.'}
        </p>

        {/* Central Audio Wave & Mic Trigger Orb */}
        <div className="relative my-4 flex items-center justify-center">
          {/* Animated Pulsing Rings */}
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
            aria-label={isListening ? 'Stop listening' : 'Start speaking in Marathi'}
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

        {/* Status Indicator */}
        <div className="min-h-[28px] my-2 flex items-center justify-center">
          {isListening && (
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400">
              <span className="w-2 h-2 rounded-full bg-orange-600 animate-ping" />
              <span>मी मराठीत ऐकत आहे... आता बोला! (Listening in Marathi)</span>
            </div>
          )}

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-spin" />
              <span>पुणेरी मित्र विचार करत आहे... (Generating answer)</span>
            </div>
          )}

          {isSpeaking && (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>उत्तर ऐका (Speaking Marathi audio)</span>
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
              वरील माईकवर क्लिक करून मराठीत प्रश्न विचारा
            </span>
          )}
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="w-full my-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* User Speech Transcript Box */}
        {(transcript || interimTranscript) && (
          <div className="w-full mt-3 p-3 rounded-2xl bg-orange-50/80 dark:bg-stone-800 border border-orange-200 dark:border-stone-700 text-left">
            <div className="flex items-center justify-between text-[11px] font-bold text-orange-700 dark:text-orange-400 mb-1">
              <span>तुम्ही विचारलेला प्रश्न:</span>
              <span className="text-[10px] bg-orange-200/80 dark:bg-orange-950 px-1.5 py-0.5 rounded text-orange-900 dark:text-orange-300">
                मराठी (mr-IN)
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-100">
              {transcript} <span className="text-stone-400 italic">{interimTranscript}</span>
            </p>
          </div>
        )}

        {/* AI Marathi Response Box */}
        {aiResponse && (
          <div className="w-full mt-3 p-4 rounded-2xl bg-white dark:bg-stone-850 border-2 border-emerald-500/50 dark:border-emerald-600/40 text-left shadow-md max-h-48 overflow-y-auto">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 dark:border-stone-800">
              <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-devanagari-hero">
                <span>पुण्याचा स्मार्ट मित्र (उत्तर):</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => speakInMarathi(aiResponse)}
                  className="p-1 rounded-md text-stone-500 hover:text-emerald-600 hover:bg-stone-100 dark:hover:bg-stone-800"
                  title="पुन्हा ऐका (Replay Audio)"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-stone-800 dark:text-stone-200 whitespace-pre-line font-medium">
              {aiResponse}
            </p>
          </div>
        )}

        {/* Quick Suggestion Pills */}
        <div className="w-full mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 text-left">
          <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block mb-2">
            किंवा एका क्लिकवर विचारा (Quick Marathi Questions):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {voicePromptsMr.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTranscript(p);
                  handleQuerySubmission(p);
                }}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-orange-100 dark:hover:bg-orange-950/80 hover:text-orange-700 dark:hover:text-orange-300 transition-colors border border-stone-200 dark:border-stone-700 cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
