import React, { useState, useMemo } from 'react';
import {
  Heart,
  Search,
  Sparkles,
  Share2,
  Copy,
  Check,
  AlertTriangle,
  Sun,
  Activity,
  Flame,
  UserCheck,
  CloudRain,
  Coffee,
  ShieldAlert,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { VeLogo } from '../components/VeLogo';
import { PageFooter } from '../components/PageFooter';
import { recordWhatsAppClick, saveLeadToSheet } from '../utils/sheet';

interface HealthTip {
  id: string;
  category: 'morning' | 'diabetes_bp' | 'gharguti' | 'women' | 'seasonal';
  categoryTitle: string;
  title: string;
  remedy: string;
  benefits: string;
  icon: string;
  badge: string;
}

const ALL_HEALTH_TIPS: HealthTip[] = [
  // 1. SAKALCHE ROUTINE (6am - 10am)
  {
    id: 'm1',
    category: 'morning',
    categoryTitle: 'सकाळचे रुटीन (६ ते १०)',
    title: 'कोथिंबीर + जिरे पाणी (वजन व पचन)',
    remedy: 'रात्री १ ग्लास पाण्यात १ चमचा जिरे व ताजी कोथिंबीर भिजत घाला. सकाळी कोमट उकळून गाळून प्या.',
    benefits: 'पोटाची चरबी कमी होते, पचनक्रिया सुधारते व शरीरातील उष्णता शांत होते.',
    icon: '🥛',
    badge: 'Weight Loss & Digestion',
  },
  {
    id: 'm2',
    category: 'morning',
    categoryTitle: 'सकाळचे रुटीन (६ ते १०)',
    title: '१० मिनिटे अनुलोम-विलोम व प्राणायाम',
    remedy: 'सकाळी मोकळ्या हवेत उपाशीपोटी १० मिनिटे दीर्घ श्वसन व अनुलोम-विलोम प्राणायाम करा.',
    benefits: 'रक्तदाब (BP) नियंत्रणात राहतो, मानसिक ताण-तणाव कमी होतो व फुफ्फुसे मजबूत होतात.',
    icon: '🧘',
    badge: 'BP & Stress Relief',
  },
  {
    id: 'm3',
    category: 'morning',
    categoryTitle: 'सकाळचे रुटीन (६ ते १०)',
    title: 'कोमट पाण्यात लिंबू + मध (डिटॉक्स ड्रिंक)',
    remedy: 'एका ग्लास कोमट पाण्यात अर्धे लिंबू पिळून १ चमचा शुद्ध मध मिसळून सकाळी प्या.',
    benefits: 'पोट स्वच्छ होते, बद्धकोष्ठतेपासून आराम मिळतो व दिवसभर ताजेतवाने वाटते.',
    icon: '🍋',
    badge: 'Natural Detox',
  },
  {
    id: 'm4',
    category: 'morning',
    categoryTitle: 'सकाळचे रुटीन (६ ते १०)',
    title: 'रात्री भिजवलेले ५ बदाम व १ अक्रोड',
    remedy: 'रात्री पाण्यात भिजवलेले बदाम सकाळी सालासकट न खाता साल काढून चावून खावेत.',
    benefits: 'मेंदूची कार्यक्षमता वाढते, स्मरणशक्ती तीक्ष्ण होते व हाडे मजबूत राहतात.',
    icon: '🥜',
    badge: 'Memory Booster',
  },
  {
    id: 'm5',
    category: 'morning',
    categoryTitle: 'सकाळचे रुटीन (६ ते १०)',
    title: 'तांब्याच्या भांड्यातील पाणी (उषापान)',
    remedy: 'रात्री तांब्याच्या भांड्यात झाकून ठेवलेले पाणी सकाळी ब्रश करण्यापूर्वी प्यावे.',
    benefits: 'शरीरातील टॉक्सिन्स बाहेर पडतात, कफ-पित्त-वात या त्रिदोषांचे संतुलन राखले जाते.',
    icon: '🫗',
    badge: 'Ayurvedic Usha Paan',
  },
  {
    id: 'm6',
    category: 'morning',
    categoryTitle: 'सकाळचे रुटीन (६ ते १०)',
    title: 'सकाळचे कोवळे ऊन (व्हिटॅमिन D)',
    remedy: 'सकाळी ७ ते ८ दरम्यान १५ ते २० मिनिटे अंगावर कोवळे सूर्यकिरण पडू द्या.',
    benefits: 'व्हिटॅमिन D ची कमतरता भरून निघते, सांधेदुखी टळते व रोगप्रतिकारक शक्ती वाढते.',
    icon: '☀️',
    badge: 'Vitamin D Natural',
  },

  // 2. MADHUMEH + BP (Pune madhe khup common)
  {
    id: 'd1',
    category: 'diabetes_bp',
    categoryTitle: 'मधुमेह व रक्तदाब (BP)',
    title: 'कारल्याचा रस किंवा जांभूळ बी पावडर',
    remedy: 'आठवड्यातून २-३ वेळा सकाळी अर्धा कप कारल्याचा रस किंवा १ चमचा जांभूळ बी चूर्ण कोमट पाण्यात घ्या.',
    benefits: 'रक्तातील साखर (Sugar Level) नैसर्गिकरीत्या नियंत्रणात राहण्यास मदत होते.',
    icon: '🥒',
    badge: 'Sugar Control',
  },
  {
    id: 'd2',
    category: 'diabetes_bp',
    categoryTitle: 'मधुमेह व रक्तदाब (BP)',
    title: 'रात्री भिजवलेले मेथी दाणे',
    remedy: '१ चमचा मेथी दाणे रात्री अर्ध्या वाटी पाण्यात भिजत घाला. सकाळी पाणी पिऊन मेथी चावून खा.',
    benefits: 'इन्सुलिन कार्यक्षमता वाढते व पोटातील गॅसेस-आंबट ढेकरांचा त्रास थांबतो.',
    icon: '🌱',
    badge: 'Diabetes Remedy',
  },
  {
    id: 'd3',
    category: 'diabetes_bp',
    categoryTitle: 'मधुमेह व रक्तदाब (BP)',
    title: 'मीठ कमी करा व सैंधव मिठाचा वापर',
    remedy: 'जेवणात पांढऱ्या रिफाइंड मिठाऐवजी शुद्ध सैंधव मिठाचा (Rock Salt) मोजका वापर करा.',
    benefits: 'उच्च रक्तदाब (High BP) अचानक वाढण्याचा धोका टळतो व हृदयाचे रक्षण होते.',
    icon: '🧂',
    badge: 'BP Management',
  },
  {
    id: 'd4',
    category: 'diabetes_bp',
    categoryTitle: 'मधुमेह व रक्तदाब (BP)',
    title: 'दररोज ३० मिनिटे जलद चालणे (Brisk Walking)',
    remedy: 'सकाळी किंवा संध्याकाळी जेवणानंतर ३० मिनिटे नियमाने सपाट रस्त्यावर किंवा बागेत चाला.',
    benefits: 'रक्तभिसरण सुधारते, कोलेस्ट्रॉल कमी होते व वजन नियंत्रणात राहते.',
    icon: '🚶',
    badge: 'Heart Cardio',
  },
  {
    id: 'd5',
    category: 'diabetes_bp',
    categoryTitle: 'मधुमेह व रक्तदाब (BP)',
    title: 'अर्जुन सालाचा काढा (हृदयासाठी अमृत)',
    remedy: '१ चमचा अर्जुन वृक्षाच्या सालीची पावडर १ कप पाण्यात उकळून अर्धा कप झाल्यावर गाळून प्या.',
    benefits: 'हृदयाचे स्नायू बळकट होतात, ब्लॉक होण्याची शक्यता कमी होते व बीपी स्थिर राहतो.',
    icon: '🪵',
    badge: 'Heart Health',
  },
  {
    id: 'd6',
    category: 'diabetes_bp',
    categoryTitle: 'मधुमेह व रक्तदाब (BP)',
    title: 'लसूण पाकळी व कोमट पाणी',
    remedy: 'सकाळी उपाशीपोटी १ ते २ लसणाच्या पाकळ्या ठेचून कोमट पाण्यासोबत गिळा किंवा चावून खा.',
    benefits: 'बॅड कोलेस्ट्रॉल (LDL) कमी होते व रक्त पातळ राहण्यास मदत होते.',
    icon: '🧄',
    badge: 'Cholesterol Control',
  },

  // 3. GHARGUTI UPAY - AAJI CHA BATWA
  {
    id: 'g1',
    category: 'gharguti',
    categoryTitle: 'आजीच्या बटव्यातील घरगुती उपाय',
    title: 'डोकेदुखी व मायग्रेन - पुदिना तेल व शेक',
    remedy: 'कपाळावर पुदिना किंवा नीलगिरी तेलाचे हलके २ थेंब लावा किंवा सुंठीचा लेप कपाळावर लावा.',
    benefits: '१० मिनिटांत डोक्याचा ताण व कपाळाची कळ शांत होते.',
    icon: '🌿',
    badge: 'Headache Relief',
  },
  {
    id: 'g2',
    category: 'gharguti',
    categoryTitle: 'आजीच्या बटव्यातील घरगुती उपाय',
    title: 'सर्दी-खोकला व कफ - हळद + गरम दूध',
    remedy: '१ कप गरम दुधात १ चिमूट हळद, २ मिरे पावडर व १ चमचा गाईचे तूप घालून झोपताना प्या.',
    benefits: 'घशातील खवखव थांबते, छातीतील कफ वितळतो व गाढ झोप लागते.',
    icon: '🥛',
    badge: 'Golden Milk Immunity',
  },
  {
    id: 'g3',
    category: 'gharguti',
    categoryTitle: 'आजीच्या बटव्यातील घरगुती उपाय',
    title: 'अ‍ॅसिडिटी व छातीत जळजळ - ओवा + काळे मीठ',
    remedy: 'अर्धा चमचा ओवा हातावर चोळून चिमूटभर काळे मीठ टाकून कोमट पाण्यासोबत घ्या.',
    benefits: '५ मिनिटांत पित्ताची आग, आंबट पाणी व पोट फुगणे शांत होते.',
    icon: '🌾',
    badge: 'Instant Acidity Cure',
  },
  {
    id: 'g4',
    category: 'gharguti',
    categoryTitle: 'आजीच्या बटव्यातील घरगुती उपाय',
    title: 'दातदुखी - लवंग किंवा लवंग तेल',
    remedy: 'दुखऱ्या दाढेत १ लवंग दाबून धरा किंवा कापसाच्या बोळ्यावर लवंग तेलाचा १ थेंब लावून ठेवा.',
    benefits: 'दातांमधील किटाणू नष्ट होतात व वेदना त्वरित कमी होतात.',
    icon: '🦷',
    badge: 'Dental Pain Relief',
  },
  {
    id: 'g5',
    category: 'gharguti',
    categoryTitle: 'आजीच्या बटव्यातील घरगुती उपाय',
    title: 'पोटदुखी व जुलाब - ताक + जिरेपूड',
    remedy: 'ताज्या आंबट नसलेल्या ताकात भाजलेली जिरे पूड व थोडे हिंग घालून प्या.',
    benefits: 'आतड्यांमधील जळजळ थांबते व पचनसंस्थेला त्वरित थंडावा मिळतो.',
    icon: '🥣',
    badge: 'Stomach Coolant',
  },
  {
    id: 'g6',
    category: 'gharguti',
    categoryTitle: 'आजीच्या बटव्यातील घरगुती उपाय',
    title: 'अंगदुखी व सांधेदुखी - मोहरीच्या तेलात लसूण शेक',
    remedy: 'मोहरीच्या तेलात ५ पाकळ्या लसूण व थोडा कापूर उकळून कोमट झाल्यावर दुखऱ्या सांध्यांवर मॉलिश करा.',
    benefits: 'स्नायूंमधील आखडलेपण दूर होते व हाडांचे दुखणे कमी होते.',
    icon: '🪔',
    badge: 'Joint Pain Relief',
  },

  // 4. STRIYAN SATHI TIPS
  {
    id: 'w1',
    category: 'women',
    categoryTitle: 'स्त्रियांसाठी आरोग्य व सौंदर्य',
    title: 'केस गळतीवर रामबाण - कांद्याचा रस व कोरफड',
    remedy: 'लाल कांद्याचा रस काढून त्यात ताजी कोरफड जेल मिसळा व केसांच्या मुळांशी हलक्या हाताने लावा.',
    benefits: 'केसांची मुळे घट्ट होतात, कोंडा नष्ट होतो व नवीन केस उगवण्यास चालना मिळते.',
    icon: '🧅',
    badge: 'Hair Fall Solution',
  },
  {
    id: 'w2',
    category: 'women',
    categoryTitle: 'स्त्रियांसाठी आरोग्य व सौंदर्य',
    title: 'नैसर्गिक ग्लोइंग त्वचा - बेसन + हळद + दूध',
    remedy: '२ चमचे बेसन, चिमूटभर हळद व थोडे कच्चे दूध कालवून चेहऱ्याला लावा व १५ मिनिटांनी धुवा.',
    benefits: 'टॅनिंग दूर होते, चेहऱ्यावर नैसर्गिक तेज येते व पिंपल्सचे डाग फिकट होतात.',
    icon: '✨',
    badge: 'Natural Skin Glow',
  },
  {
    id: 'w3',
    category: 'women',
    categoryTitle: 'स्त्रियांसाठी आरोग्य व सौंदर्य',
    title: 'अशक्तपणा व थकवा - शतावरी व गूळ-शेंगदाणे',
    remedy: 'दररोज १ चमचा शतावरी कल्प दुधासोबत घ्या आणि दुपारी गूळ-शेंगदाण्याची चिक्की किंवा लाडू खा.',
    benefits: 'हिमोग्लोबिन वाढते, पाळीच्या दिवसांतील अशक्तपणा व कंबरदुखी दूर होते.',
    icon: '🌺',
    badge: 'Women Vitality',
  },
  {
    id: 'w4',
    category: 'women',
    categoryTitle: 'स्त्रियांसाठी आरोग्य व सौंदर्य',
    title: 'कंबरदुखी व हाडे मजबूत - खारीक-बदाम खीर',
    remedy: 'खारीक पूड, बदाम व डिंक तुपात तळून दुधात उकळून आठवड्यातून दोनदा खीर करून खा.',
    benefits: 'कॅल्शियमची कमतरता भरून निघते व मणक्याचे दुखणे कमी होते.',
    icon: '🌰',
    badge: 'Bone Strength',
  },
  {
    id: 'w5',
    category: 'women',
    categoryTitle: 'स्त्रियांसाठी आरोग्य व सौंदर्य',
    title: 'पाळीतील पोटदुखी - ओवा, बडीशेप व गुळाचा चहा',
    remedy: '१ कप पाण्यात ओवा, बडीशेप व थोडा सेंद्रिय गूळ टाकून उकळून गरम गरम चहासारखा प्या.',
    benefits: 'पोटातील पेटके (Cramps) थांबतात व पाळीचा प्रवाह सुरळीत होतो.',
    icon: '☕',
    badge: 'Period Cramp Relief',
  },
  {
    id: 'w6',
    category: 'women',
    categoryTitle: 'स्त्रियांसाठी आरोग्य व सौंदर्य',
    title: 'डोळ्यांखालील काळी वर्तुळे - काकडी व बटाटा चकत्या',
    remedy: 'थंड काकडी किंवा बटाट्याच्या चकत्या डोळ्यांवर १० मिनिटे ठेवून शांत पडून राहा.',
    benefits: 'डोळ्यांचा ताण कमी होतो व डोळ्यांखालील काळे डाग कमी होतात.',
    icon: '🥒',
    badge: 'Dark Circles Cure',
  },

  // 5. RUTU NUSAR (उन्हाळा, पावसाळा, हिवाळा)
  {
    id: 's1',
    category: 'seasonal',
    categoryTitle: 'ऋतूनुसार आरोग्य काळजी',
    title: 'उन्हाळ्यात तांदळाचे धुवण व काकडी-कलिंगड',
    remedy: 'उन्हाळ्यात तांदूळ धुतलेले पाणी किंवा वाळा घातलेले माठातील पाणी प्या. काकडी व कलिंगड भरपूर खा.',
    benefits: 'उन्हाची लाहीलाही होत नाही, डिहायड्रेशन टळते व लघवीची जळजळ थांबते.',
    icon: '🍉',
    badge: 'Summer Coolant',
  },
  {
    id: 's2',
    category: 'seasonal',
    categoryTitle: 'ऋतूनुसार आरोग्य काळजी',
    title: 'पावसाळ्यात उकळलेले पाणी व तुळस-सुंठ चहा',
    remedy: 'पावसाळ्यात नेहमी पाणी २० मिनिटे उकळून कोमट प्या. तुळशीची पाने, आले व लवंग घातलेला चहा प्या.',
    benefits: 'पाण्यावाटे होणारे इन्फेक्शन, टायफॉइड, कॉलरा व डेंग्यू-मलेरियाचा धोका टळतो.',
    icon: '🌧️',
    badge: 'Monsoon Shield',
  },
  {
    id: 's3',
    category: 'seasonal',
    categoryTitle: 'ऋतूनुसार आरोग्य काळजी',
    title: 'पावसाळ्यात बाहेरील उघडे अन्न पूर्ण टाळा',
    remedy: 'रस्त्यावरील उघडे पदार्थ, चाट, बर्फाचे गोळे व कच्च्या भाज्या खाणे कटाक्षाने टाळा.',
    benefits: 'पोट खराब होणे व गॅस्ट्रोचा संसर्ग होण्यापासून संपूर्ण संरक्षण मिळते.',
    icon: '🍲',
    badge: 'Food Safety',
  },
  {
    id: 's4',
    category: 'seasonal',
    categoryTitle: 'ऋतूनुसार आरोग्य काळजी',
    title: 'हिवाळ्यात तीळ-गूळ व सुकामेवा लाडू',
    remedy: 'हिवाळ्यात डिंकाचे लाडू, तिळाची पोळी व रोज थोडे बदाम, काजू व अक्रोड खा.',
    benefits: 'शरीराला आतून उष्णता व ऊर्जा मिळते आणि सांधेदुखीपासून रक्षण होते.',
    icon: '🥮',
    badge: 'Winter Energy',
  },
  {
    id: 's5',
    category: 'seasonal',
    categoryTitle: 'ऋतूनुसार आरोग्य काळजी',
    title: 'हिवाळ्यात त्वचेची कोरडेपणावर खोबरेल तेल',
    remedy: 'आंघोळीनंतर अंगाला शुद्ध खोबरेल तेल किंवा तिळाचे तेल हलके चोळा.',
    benefits: 'त्वचेला खाज सुटत नाही, त्वचा फुटत नाही व मऊ-मुलायम राहते.',
    icon: '🥥',
    badge: 'Winter Skin Care',
  },
  {
    id: 's6',
    category: 'seasonal',
    categoryTitle: 'ऋतूनुसार आरोग्य काळजी',
    title: 'बदलत्या ऋतूत च्यवनप्राश व आवळा',
    remedy: 'ऋतू बदलताना दररोज सकाळी १ चमचा च्यवनप्राश किंवा ताजे आवळ्याचे ज्यूस घ्या.',
    benefits: 'हवामान बदलामुळे होणारी सर्दी, खोकला व ताप प्रतिकारशक्तीमुळे रोखला जातो.',
    icon: '🏺',
    badge: 'Seasonal Immunity',
  },
];

export const HealthTips: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTips = useMemo(() => {
    return ALL_HEALTH_TIPS.filter((tip) => {
      const matchCat = selectedCategory === 'all' || tip.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        tip.title.toLowerCase().includes(q) ||
        tip.remedy.toLowerCase().includes(q) ||
        tip.benefits.toLowerCase().includes(q) ||
        tip.categoryTitle.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyTip = (tip: HealthTip) => {
    const text = `💪 *${tip.title}* (${tip.categoryTitle})\n\n👉 *उपाय:* ${tip.remedy}\n✅ *फायदे:* ${tip.benefits}\n\n- साभार: Viraj Enterprise Pune Super App (Milind Bhosale - 9021745403)`;
    navigator.clipboard.writeText(text);
    setCopiedId(tip.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareWhatsApp = (tip: HealthTip) => {
    recordWhatsAppClick(`Health Tip Share: ${tip.title}`);
    saveLeadToSheet({
      name: 'Health Tip Reader',
      search: tip.title,
      action: `Shared Tip: ${tip.title}`,
    });

    const text = encodeURIComponent(
      `💪 *${tip.title}* (${tip.categoryTitle})\n\n👉 *उपाय:* ${tip.remedy}\n✅ *फायदे:* ${tip.benefits}\n\n🌟 *पुणे सुपर ॲपवर दररोज मिळवा ताज्या आरोग्य टिप्स:*\nhttps://ais-dev-2usv7s3yt5wmbatoxlswxf-644109255886.asia-east1.run.app/health-tips\n\n- Milind Bhosale (Viraj Enterprise Pune) WhatsApp: 9021745403`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 py-6 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-3 pb-3 border-b border-stone-800">
          <div className="flex justify-center mb-1">
            <VeLogo size={68} />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold font-mono">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Viraj Enterprise • आरोग्याची गुरुकिल्ली</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
            💪 Rojche Aarogya Tips - Viraj Enterprise
          </h1>

          <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium max-w-xl mx-auto">
            डॉक्टरांचा सल्ला नाही, घरगुती सोपे उपाय • ३० पारंपारिक आरोग्य टिप्स (Milind Bhosale)
          </p>

          {/* Daily 7:00 AM Morning Notification Badge */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-stone-900 border border-amber-500/30 text-xs text-stone-300">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>
                <strong>दररोज सकाळी ७ वाजता:</strong> आजची ताजी आरोग्य टीप आपल्या मोबाईलवर!
              </span>
            </div>
          </div>
        </div>

        {/* ⚠️ Mandatory Health Disclaimer */}
        <div className="rounded-2xl bg-gradient-to-r from-red-950/80 via-stone-900 to-red-950/80 p-4 border-2 border-red-500/50 shadow-lg text-center space-y-1">
          <div className="flex items-center justify-center gap-2 text-red-400 font-bold text-xs sm:text-sm">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>⚠️ वैधानिक इशारा व महत्त्वाची सूचना (Health Advisory)</span>
          </div>
          <p className="text-[11px] sm:text-xs text-stone-300 max-w-3xl mx-auto leading-relaxed">
            येथे दिलेले सर्व उपाय हे केवळ पारंपारिक आयुर्वेदातील व आजीच्या बटव्यातील सामान्य माहितीसाठी आहेत.
            कोणताही जुनाट आजार किंवा गंभीर लक्षणे असल्यास आपल्या डॉक्टरांचा (MBBS / MD / BAMS) सल्ला नक्की घ्या.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="काहीही शोधा... डोकेदुखी, मधुमेह, बीपी, वजन, केस गळती..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#141419] border-2 border-[#D4AF37] text-white placeholder-stone-500 text-xs sm:text-sm outline-none shadow-md focus:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'सर्व ३० टिप्स (All)' },
            { id: 'morning', label: '🥛 सकाळचे रुटीन (6-10am)' },
            { id: 'diabetes_bp', label: '🩺 मधुमेह व BP' },
            { id: 'gharguti', label: '🌿 आजीचा बटवा' },
            { id: 'women', label: '🌺 स्त्रियांसाठी टिप्स' },
            { id: 'seasonal', label: '🌦️ ऋतूनुसार उपाय' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 shadow-md font-black'
                  : 'bg-stone-900 border border-stone-800 text-stone-300 hover:border-[#D4AF37]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTips.map((tip) => (
            <div
              key={tip.id}
              className="rounded-3xl bg-[#141419] border-2 border-[#D4AF37] p-5 shadow-xl hover:shadow-[0_8px_30px_rgba(212,175,55,0.2)] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-[#D4AF37]/50 text-amber-300">
                    {tip.badge}
                  </span>
                  <span className="text-xl">{tip.icon}</span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-white font-serif flex items-start gap-2">
                  <span>{tip.title}</span>
                </h3>

                <div className="space-y-1.5 text-xs">
                  <div className="p-3 rounded-2xl bg-stone-950 border border-stone-850">
                    <span className="font-bold text-amber-400 block mb-0.5">
                      👉 घरगुती उपाय कसा करावा:
                    </span>
                    <p className="text-stone-300 leading-relaxed">{tip.remedy}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                    <span className="font-bold text-emerald-400 block mb-0.5">
                      ✅ आरोग्य फायदे:
                    </span>
                    <p className="text-stone-300 leading-relaxed">{tip.benefits}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-800/80 gap-2">
                <button
                  onClick={() => handleCopyTip(tip)}
                  className="py-1.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                >
                  {copiedId === tip.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">कॉपी झाले!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>कॉपी करा</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleShareWhatsApp(tip)}
                  className="py-1.5 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>WhatsApp वर पाठवा</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTips.length === 0 && (
          <div className="text-center py-12 space-y-2 bg-stone-900 rounded-2xl border border-stone-800">
            <p className="text-stone-400 text-sm">
              "{searchQuery}" या शोध संदर्भात कोणतीही टीप आढळली नाही.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-amber-400 font-bold underline cursor-pointer"
            >
              सर्व टिप्स पुन्हा दाखवा
            </button>
          </div>
        )}

        {/* Dedicated Page Footer with Gold Border & Milind Bhosale + AU Bank UPI */}
        <PageFooter pageName="Rojche Aarogya Tips" />
      </div>
    </div>
  );
};
