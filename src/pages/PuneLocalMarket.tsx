import React, { useState } from 'react';
import {
  ShoppingBag,
  Clock,
  MapPin,
  ExternalLink,
  Sparkles,
  Phone,
  Search,
  CheckCircle2,
  Navigation,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { VeLogo } from '../components/VeLogo';
import { PageFooter } from '../components/PageFooter';
import { recordWhatsAppClick } from '../utils/sheet';

interface MarketItem {
  id: string;
  name: string;
  nameMr: string;
  category: string;
  location: string;
  timing: string;
  bestDay: string;
  kayMilte: string[]; // What you get
  photo: string;
  description: string;
  parkingAdvice: string;
  mapQuery: string;
  highlight: string;
}

const PUNE_LOCAL_MARKETS: MarketItem[] = [
  {
    id: 'tulshibag',
    name: 'Tulshibaug Market',
    nameMr: 'तुळशीबाग बाजारपेठ (पुण्याचे हृदय)',
    category: 'कापड, दागिने, भांडी व महिला खरेदी',
    location: 'बुधवार पेठ, दगडूशेठ मंदिराच्या शेजारी, पुणे',
    timing: 'सकाळी १०:०० ते रात्री ९:०० (सोमवारी काही दुकाने बंद)',
    bestDay: 'मंगळवार ते शुक्रवार (शनिवार-रविवार प्रचंड गर्दी असते)',
    kayMilte: [
      'पारंपरिक व फॅशनेबल दागिने, कानातले, नथ, बांगड्या',
      'महिलांचे कपडे, कुर्ती, लेगिंग्स, नाइटवेअर',
      'तांबे-पितळेची भांडी, पूजेचे साहित्य व मूर्ती',
      'घरगुती शोभेच्या वस्तू, चपला, बॅग्ज व कॉस्मेटिक्स',
    ],
    photo: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=700&q=80',
    description: 'पुण्यातील महिलांचे सर्वात आवडते खरेदीचे ठिकाण. तुळशीबाग राम मंदिराभोवती शतकांपासून भरत असलेली ऐतिहासिक बाजारपेठ. कमी भावात उत्तम खरेदीसाठी प्रसिद्ध!',
    parkingAdvice: 'मंडई किंवा बाबू गेणू चौक बहुमजली PMC पार्किंगमध्ये गाडी पार्क करून पायी जाणे सोयीचे पडते.',
    mapQuery: 'Tulshibaug+Market+Budhwar+Peth+Pune',
    highlight: 'कमी किमतीत घासाघीस करून सर्वोत्तम खरेदी!',
  },
  {
    id: 'laxmi-road',
    name: 'Laxmi Road Shopping Hub',
    nameMr: 'लक्ष्मी रोड (साड्या व ब्रँडेड कपडे)',
    category: 'साड्या, सोने-चांदी, विवाह खरेदी व कपडे',
    location: 'अलका टॉकीज ते कँप दरम्यान, सदाशिव / शुक्रवार पेठ, पुणे',
    timing: 'सकाळी १०:०० ते रात्री ९:३० (दुपारी १ ते ४ काही दुकाने बंद)',
    bestDay: 'आठवड्याचे सर्व दिवस (सणासुदीच्या काळात खास रोषणाई)',
    kayMilte: [
      'पैठणी, काठापदराच्या साड्या, नववारी साड्या (तथास्तु, कलांजली, प्रकाश)',
      'पुरुषांचे तयार कपडे, कुर्ते, शेरवानी व फेटे',
      'सोने, चांदी व हिऱ्यांचे नामांकित सराफी पेढ्या (पीएनजी, रांका, वामन हरी पेठे)',
      'लग्नाबस्ता आणि संपूर्ण फॅमिली शॉपिंग',
    ],
    photo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80',
    description: 'पुण्यातील सर्वात प्रसिद्ध आणि जुनी ५ किलोमीटर लांबीची शॉपिंग स्ट्रीट. लग्नकार्याची खरेदी लक्ष्मी रोडवर केल्याशिवाय पुणेकरांचे लग्न पूर्ण होत नाही.',
    parkingAdvice: 'लक्ष्मी रोडवर नो-पार्किंग असल्याने नारायण पेठ किंवा मंडई PMC पार्किंग वापरा.',
    mapQuery: 'Laxmi+Road+Pune',
    highlight: 'अस्सल पैठणी व मानाच्या सराफ पेढ्यांचे माहेरघर',
  },
  {
    id: 'juna-bazaar',
    name: 'Juna Bazaar (Chor Bazaar)',
    nameMr: 'जुना बाजार (अँटिक व हार्डवेअर मार्केट)',
    category: 'पुरातन वस्तू, लोखंडी हत्यारे, नाणी व सेकंड हँड',
    location: 'वीर संताजी घोरपडे रस्ता, कुंभारवेस ते मंगळवार पेठ, पुणे',
    timing: 'सकाळी ८:०० ते संध्याकाळी ७:०० (फक्त बुधवार व रविवार)',
    bestDay: 'रविवार (Sunday) आणि बुधवार (Wednesday)',
    kayMilte: [
      'पुरातन पितळी दिवे, जुनी नाणी, ग्रामोफोन व घड्याळे',
      'लोखंडी अवजारे, नट-बोल्ट, प्लंबिंग साहित्य, जिम इक्विपमेंट',
      'सेकंड हँड इलेक्ट्रॉनिक गॅजेट्स, कॅमेरे व विंटेज आयटम्स',
      'टूल किट्स, चाकू, कुलूप व सुतारकाम साहित्य',
    ],
    photo: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=700&q=80',
    description: 'पेशवे काळापासून चालत आलेला पुण्यातील सर्वात जुना रस्त्यावरील बाजार. विंटेज वस्तू शोधणाऱ्यांसाठी आणि कारागिरांसाठी हा खजिना आहे.',
    parkingAdvice: 'कुंभारवेस किंवा नदीपात्राजवळील रस्त्यावर दुचाकी लावू शकता.',
    mapQuery: 'Juna+Bazar+Mangalwar+Peth+Pune',
    highlight: 'दुर्मीळ ऐतिहासिक वस्तू आणि सर्वात स्वस्त हत्यारे',
  },
  {
    id: 'mandai',
    name: 'Mahatma Phule Mandai',
    nameMr: 'महात्मा फुले मंडई (भाजीपाला व फळ बाजार)',
    category: 'ताजी भाजीपाला, फळे, फुले व सेंद्रिय शेतीमाल',
    location: 'शुक्रवार पेठ, पुणे - ४११०२',
    timing: 'सकाळी ६:०० ते रात्री ८:३० (दररोज सुरू)',
    bestDay: 'सकाळी ७ ते १० दरम्यान सर्वात ताजी भाजी मिळते',
    kayMilte: [
      'शेतकऱ्यांनी थेट आणलेली ताजी भाजी व रानभाज्या',
      'घाऊक व किरकोळ दरात सर्व प्रकारची ताजी फळे (आंबे, चिकू, डाळिंब)',
      'देवपूजेचे हार, झेंडूची फुले, दुर्वा, बेल व तोरणे',
      'घरगुती मसाले, लोणची, पापड व उपवासाचे पदार्थ',
    ],
    photo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80',
    description: '१८८६ मधील ऐतिहासिक गॉथिक वास्तुकला असलेली भव्य मंडई. मध्यभागी उंच घड्याळाचा मनोरा असून येथे ५०० हून अधिक अधिकृत भाजीपाला स्टॉल्स आहेत.',
    parkingAdvice: 'मंडईच्या स्वतःच्या बहुमजली PMC पार्किंगमध्ये गाडी सुरक्षित लावता येते.',
    mapQuery: 'Mahatma+Phule+Mandai+Pune',
    highlight: 'पुण्यातील सर्वात ताजी भाजी आणि सर्वात कमी भाव!',
  },
  {
    id: 'fc-jm-road',
    name: 'FC Road & JM Road',
    nameMr: 'एफसी रोड व जेएम रोड (कॉलेज व ट्रेंडी शॉपिंग)',
    category: 'वेस्टर्न कपडे, पादत्राणे, बुक्स, गॅजेट्स व कॅफे',
    location: 'फर्ग्युसन कॉलेज रोड व जंगली महाराज रोड, डेक्कन, पुणे',
    timing: 'सकाळी ११:०० ते रात्री १०:०० (रात्री कॅफे उशिरापर्यंत)',
    bestDay: 'संध्याकाळच्या वेळी फिरणे व स्ट्रीट शॉपिंगसाठी उत्तम',
    kayMilte: [
      'लेटेस्ट ट्रेंडिंग जीन्स, टॉप्स, टी-शर्ट्स व जॅकेट्स (हॉंगकॉंग लेन)',
      'स्टायलिश पादत्राणे, सँडल्स, बूट्स व लेदर बेल्ट्स',
      'पुस्तके, स्टेशनरी, मोबाईल कव्हर्स व ट्रेंडी चष्मे',
      'गुडलक कॅफेचा बन मस्का, वैशालीचा डोसा आणि एफसी रोड कोल्ड कॉफी!',
    ],
    photo: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=700&q=80',
    description: 'पुण्यातील तरुणाईचा आणि विद्यार्थ्यांचा आवडता कट्टा. ब्रँडेड शोरूम्ससोबतच फुटपाथवर मिळणारे स्वस्त ट्रेंडी कपडे ही या परिसराची खासियत आहे.',
    parkingAdvice: 'एफसी रोडवरील पे-अँड-पार्क किंवा संभाजी पार्क जवळील पार्किंग वापरा.',
    mapQuery: 'Fergusson+College+Road+Deccan+Pune',
    highlight: 'हॉंगकॉंग लेन शॉपिंग, कॅफे आणि तरुणाईचा कट्टा',
  },
  {
    id: 'abc-market',
    name: 'Appa Balwant Chowk (ABC)',
    nameMr: 'अप्पा बळवंत चौक (पुस्तकांचे पंढरपूर)',
    category: 'शैक्षणिक पुस्तके, स्टेशनरी व स्पर्धा परीक्षा साहित्य',
    location: 'बुधवार पेठ / शनिवार पेठ कॉर्नर, पुणे',
    timing: 'सकाळी १०:०० ते रात्री ८:३० (रविवारी काही दुकाने बंद)',
    bestDay: 'नवीन शैक्षणिक वर्ष सुरू होताना प्रचंड सवलत',
    kayMilte: [
      'शालेय, कॉलेज, इंजिनिअरिंग, मेडिकल व लॉ पाठ्यपुस्तके',
      'MPSC, UPSC, पोलीस भरती व सर्व स्पर्धा परीक्षांची पुस्तके',
      'जुनी पुस्तके ५०% सवलतीत परत करण्याची व खरेदी करण्याची सुविधा',
      'घाऊक दरात वह्या, रजिस्टर व ड्रॉइंग साहित्य',
    ],
    photo: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80',
    description: 'भारतातील पुस्तकांची सर्वात मोठी बाजारपेठ. संपूर्ण महाराष्ट्रातून लाखो विद्यार्थी येथे स्पर्धा परीक्षांच्या अभ्यासासाठी आणि पुस्तकांसाठी येतात.',
    parkingAdvice: 'शनिवार वाडा जवळील पार्किंगमध्ये वाहन उभे करून चालत जाणे उत्तम.',
    mapQuery: 'Appa+Balwant+Chowk+Pune',
    highlight: 'नवीन व जुनी पुस्तके थेट ५०% पर्यंतच्या सवलतीत!',
  },
];

export const PuneLocalMarket: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredMarkets = PUNE_LOCAL_MARKETS.filter((m) => {
    const q = search.toLowerCase();
    const matchesSearch =
      m.name.toLowerCase().includes(q) ||
      m.nameMr.includes(q) ||
      m.location.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q);
    return matchesSearch;
  });

  const handleShareMarket = (marketName: string, location: string) => {
    recordWhatsAppClick(`Market Share: ${marketName}`);
    const text = encodeURIComponent(
      `पुणे बाजारपेठ माहिती: *${marketName}*\n📍 ठिकाण: ${location}\nपुण्यातील सर्व प्रसिद्ध बाजारपेठांची माहिती विरज एंटरप्राइज पुणे ॲपवर उपलब्ध आहे! संपर्क: ९०२१७४५४०३`
    );
    window.open(`https://wa.me/919021745403?text=${text}`, '_blank');
  };

  const handleOpenMap = (query: string) => {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(query)}/`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 py-6 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="text-center space-y-3 pb-3 border-b border-stone-800">
          <div className="flex justify-center mb-1">
            <VeLogo size={68} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-[#D4AF37]/40 text-amber-300 text-xs font-bold">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>पुणे ऐतिहासिक व आधुनिक बाजारपेठा • अस्सल खरेदी मार्गदर्शक</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
            Pune Local Market - Bajarpeth
          </h1>

          <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium max-w-xl mx-auto">
            तुळशीबाग, लक्ष्मी रोड, जुना बाजार, फुले मंडई, एफसी रोड व अप्पा बळवंत चौक • Viraj Enterprise
          </p>

          {/* Quick Search */}
          <div className="max-w-md mx-auto pt-2 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="बाजारपेठेचे नाव किंवा वस्तू शोधा (उदा. साडी, पुस्तके, दागिने)..."
              className="w-full bg-stone-900 border border-stone-700 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-hidden"
            />
            <Search className="w-4 h-4 text-stone-500 absolute right-3.5 top-5" />
          </div>
        </div>

        {/* MARKETS LIST */}
        <div className="space-y-6">
          {filteredMarkets.map((market) => (
            <div
              key={market.id}
              className="rounded-3xl bg-[#141419] border-2 border-[#D4AF37] overflow-hidden shadow-xl hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)] transition-all flex flex-col md:flex-row justify-between"
            >
              {/* Left Column: Photo / Image */}
              <div className="md:w-5/12 relative min-h-[220px] md:min-h-full">
                <img
                  src={market.photo}
                  alt={market.name}
                  className="w-full h-full object-cover object-center absolute inset-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-stone-950/90 via-stone-950/40 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg bg-stone-950/80 backdrop-blur-md text-[#D4AF37] text-[11px] font-black border border-[#D4AF37]/50 shadow-md">
                    {market.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] text-amber-300 font-mono font-bold block bg-stone-900/90 px-2 py-0.5 rounded w-fit mb-1 border border-stone-800">
                    ★ {market.highlight}
                  </span>
                </div>
              </div>

              {/* Right Column: Nav, Kay Milte, Timings & Actions */}
              <div className="md:w-7/12 p-5 sm:p-6 space-y-4 flex flex-col justify-between">
                <div>
                  {/* Market Nav (Name) */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 border-b border-stone-800 pb-2.5">
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-white font-serif">
                        {market.nameMr}
                      </h2>
                      <span className="text-xs text-amber-400 font-semibold font-sans">
                        {market.name}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-stone-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{market.location.split(',')[0]}</span>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                    {market.description}
                  </p>

                  {/* Kay Milte (What you get) Box */}
                  <div className="mt-3 p-3 rounded-2xl bg-stone-950 border border-stone-850 space-y-1.5">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                      <Tag className="w-3.5 h-3.5 text-amber-400" />
                      <span>काय मिळते? (Kay Milte):</span>
                    </span>
                    <ul className="space-y-1 text-stone-300 text-[11px] list-disc list-inside">
                      {market.kayMilte.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Timings & Best Day */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-[11px]">
                    <div className="p-2 rounded-xl bg-stone-900 border border-stone-850 flex items-center gap-1.5 text-stone-300">
                      <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>वेळ: {market.timing}</span>
                    </div>

                    <div className="p-2 rounded-xl bg-stone-900 border border-stone-850 flex items-center gap-1.5 text-amber-300 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>उत्तम दिवस: {market.bestDay}</span>
                    </div>
                  </div>

                  {/* Parking Advice */}
                  <p className="text-[10px] text-stone-400 italic mt-2">
                    🚗 पार्किंग सल्ला: {market.parkingAdvice}
                  </p>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-3 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                  <span className="text-[10px] text-stone-500 font-mono">
                    ★ ऐतिहासिक पुणेरी बाजारपेठ
                  </span>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleOpenMap(market.mapQuery)}
                      className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Google Map Var Bagha</span>
                    </button>

                    <button
                      onClick={() => handleShareMarket(market.nameMr, market.location)}
                      className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                    >
                      <FaWhatsapp className="w-3.5 h-3.5" />
                      <span>Share on WhatsApp 9021745403</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Page Footer with Gold Border & WhatsApp 9021745403 */}
        <PageFooter pageName="Pune Local Market - Bajarpeth" />
      </div>
    </div>
  );
};
