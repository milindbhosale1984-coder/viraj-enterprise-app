import React, { useState } from 'react';
import {
  FileCheck2,
  Users,
  HeartHandshake,
  Home,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Calendar,
  Sparkles,
  ArrowRight,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { FaWhatsapp, FaUserFriends } from 'react-icons/fa';
import { VeLogo } from '../components/VeLogo';
import { PageFooter } from '../components/PageFooter';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';
import { recordWhatsAppClick } from '../utils/sheet';

interface YojanaItem {
  id: string;
  nameMr: string;
  nameEn: string;
  benefit: string;
  department: string;
  eligibility: string;
  documents: string[];
  portalUrl: string;
  badge: string;
}

const MAHARASHTRA_YOJANAS: YojanaItem[] = [
  {
    id: 'ladki-bahin',
    nameMr: 'मुख्यमंत्री माझी लाडकी बहीण योजना',
    nameEn: 'Majhi Ladki Bahin Yojana',
    benefit: 'दरमहा ₹१,५०० थेट बँक खात्यात (वार्षिक ₹१८,०००)',
    department: 'महिला व बालविकास विभाग, महाराष्ट्र शासन',
    eligibility: '२१ ते ६५ वर्षे वयोगटातील विवाहित, विधवा, घटस्फोटित, परित्यक्त्या व निराधार महिला. कुटुंबाचे वार्षिक उत्पन्न ₹२.५ लाखांपेक्षा कमी असावे.',
    documents: [
      'आधार कार्ड (Aadhaar Card) व बँक खात्याशी आधार लिंक (DBT Active)',
      'महाराष्ट्राचे अधिवास प्रमाणपत्र (Domicile) किंवा १५ वर्षांपूर्वीचे रेशन कार्ड / मतदान कार्ड',
      'उत्पन्नाचा दाखला किंवा पिवळे/केशरी रेशन कार्ड',
      'हमीपत्र व स्वतःचा पासपोर्ट फोटो',
    ],
    portalUrl: 'https://ladakibahin.maharashtra.gov.in',
    badge: 'सर्वात लोकप्रिय योजना',
  },
  {
    id: 'namo-shetkari',
    nameMr: 'नमो शेतकरी महासन्मान निधी + PM किसान',
    nameEn: 'Namo Shetkari Mahasanman Nidhi',
    benefit: 'वार्षिक ₹१२,००० (केंद्र ₹६,००० + राज्य ₹६,००० थेट खात्यात)',
    department: 'कृषी विभाग, महाराष्ट्र व केंद्र शासन',
    eligibility: 'जमीन धारक शेतकरी ज्यांची नावे ७/१२ वर नोंद आहेत आणि ज्यांचे ई-केवायसी पूर्ण झाले आहे.',
    documents: [
      '७/१२ आणि ८-अ उतारा',
      'आधार कार्ड व बँक खाते लिंक (Aadhaar Seeding)',
      'PM Kisan नोंदणी क्रमांक',
    ],
    portalUrl: 'https://pmkisan.gov.in',
    badge: 'शेतकऱ्यांसाठी थेट मदत',
  },
  {
    id: 'pmay',
    nameMr: 'प्रधानमंत्री आवास योजना (PMAY - शहरी व ग्रामीण)',
    nameEn: 'Pradhan Mantri Awas Yojana',
    benefit: 'घर बांधण्यासाठी किंवा फ्लॅट खरेदीसाठी ₹२.५० लाखांपर्यंत थेट अनुदान',
    department: 'गृहनिर्माण व नगर विकास मंत्रालय',
    eligibility: 'भारतात कुठेही स्वतःचे पक्के घर नसलेले कुटुंबीय. EWS/LIG उत्पन्न गट.',
    documents: [
      'कुटुंबातील सर्व सदस्यांचे आधार कार्ड',
      'उत्पन्नाचा अधिकृत दाखला (तहसीलदार / अधिकृत अधिकारी)',
      'जागेची मालकी कागदपत्रे / बिल्डर खरेदीखत',
      'बँक पासबुक व पॅन कार्ड',
    ],
    portalUrl: 'https://pmaymis.gov.in',
    badge: 'हक्काचे पक्के घर',
  },
  {
    id: 'mjpjay',
    nameMr: 'महात्मा ज्योतिराव फुले जन आरोग्य योजना (मोफत उपचार)',
    nameEn: 'Maha Jyotirao Phule Jan Arogya Yojana',
    benefit: 'कुटुंबाला वार्षिक ₹५,००,००० पर्यंत मोफत कॅशलेस वैद्यकीय उपचार व शस्त्रक्रिया',
    department: 'सार्वजनिक आरोग्य विभाग, महाराष्ट्र',
    eligibility: 'महाराष्ट्रातील सर्व रेशनकार्ड धारक (पिवळे, केशरी, पांढरे). पुण्यातील सर्व प्रमुख खाजगी व सरकारी रुग्णालयांमध्ये लागू.',
    documents: [
      'रेशन कार्ड (पिवळे, केशरी किंवा शुभ्र)',
      'आधार कार्ड / मतदार ओळखपत्र',
    ],
    portalUrl: 'https://www.jeevandayee.gov.in',
    badge: '₹५ लाख मोफत हॉस्पिटल',
  },
  {
    id: 'sanjay-gandhi',
    nameMr: 'संजय गांधी निराधार अनुदान योजना',
    nameEn: 'Sanjay Gandhi Niradhar Yojana',
    benefit: 'दरमहा ₹१,५०० निवृत्तीवेतन',
    department: 'सामाजिक न्याय विभाग, महाराष्ट्र',
    eligibility: 'निराधार व्यक्ती, अंध, अपंग, अनाथ मुले, गंभीर आजारी, आणि ६५ वर्षांवरील वृद्ध नागरिक ज्यांचे उत्पन्न ₹२१,००० पेक्षा कमी आहे.',
    documents: [
      'वय आणि वास्तव्याचा दाखला',
      'तहसीलदार यांचा उत्पन्नाचा दाखला',
      'अपंग असल्यास जिल्हा शल्यचिकित्सकांचे प्रमाणत्र',
    ],
    portalUrl: 'https://aaplesarkar.mahaonline.gov.in',
    badge: 'निराधारांना आधार',
  },
];

export const GovtYojana: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const handleInquireWhatsApp = (yojanaName: string) => {
    recordWhatsAppClick(`Yojana Inquire: ${yojanaName}`);
    const text = encodeURIComponent(
      `Namaste Milind Bhosale (Viraj Enterprise Pune), I want complete details and application guidance for: ${yojanaName}. Krupaya form kiti tarikh paryant aani documents mahiti sanga.`
    );
    window.open(`https://wa.me/919021745403?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 py-6 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="text-center space-y-3 pb-3 border-b border-stone-800">
          <div className="flex justify-center mb-1">
            <VeLogo size={68} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-[#D4AF37]/40 text-amber-300 text-xs font-bold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>महाराष्ट्र व केंद्र शासन अधिकृत जनकल्याणकारी योजना २०२६</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
            सरकारी योजना माहिती केंद्र - Milind Bhosale
          </h1>

          <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium max-w-xl mx-auto">
            लाडकी बहीण योजना, पीएम किसान, मोफत ५ लाख आरोग्य उपचार व घरकुल योजना • विरज एंटरप्राइज पुणे
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => handleInquireWhatsApp('Majhi Ladki Bahin / Sarkari Yojana')}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-stone-950 font-black text-sm flex items-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.35)] cursor-pointer transition-all active:scale-95"
            >
              <FaWhatsapp className="w-5 h-5 text-stone-950" />
              <span>योजना फॉर्म भरण्यासाठी मदत (WhatsApp ९०२१७४५४०३)</span>
            </button>
          </div>
        </div>

        {/* YOJANAS LIST */}
        <div className="space-y-5">
          {MAHARASHTRA_YOJANAS.map((yojana) => (
            <div
              key={yojana.id}
              className="rounded-3xl bg-[#141419] p-5 sm:p-6 border-2 border-[#D4AF37] shadow-xl space-y-4"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-black text-white font-serif">
                      {yojana.nameMr}
                    </h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {yojana.badge}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {yojana.department}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs sm:text-sm font-black text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-500/40 inline-block">
                    {yojana.benefit}
                  </span>
                </div>
              </div>

              {/* Grid: Eligibility & Documents */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Eligibility */}
                <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-850 space-y-2">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>कोण पात्र आहे? (Eligibility):</span>
                  </span>
                  <p className="text-stone-300 leading-relaxed text-[11px]">
                    {yojana.eligibility}
                  </p>
                </div>

                {/* Documents */}
                <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-850 space-y-2">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                    <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>लागणारी कागदपत्रे (Required Documents):</span>
                  </span>
                  <ul className="space-y-1 text-stone-300 text-[11px] list-disc list-inside">
                    {yojana.documents.map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-stone-500">
                  ★ अधिकृत शासकीय पोर्टलद्वारे थेट अर्ज करा
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleInquireWhatsApp(yojana.nameMr)}
                    className="flex-1 sm:flex-none py-2 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    <span>कागदपत्रे तपासा (WhatsApp)</span>
                  </button>

                  <a
                    href={yojana.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3.5 rounded-xl bg-stone-900 hover:bg-stone-850 text-amber-300 border border-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>अधिकृत पोर्टल</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Page Footer with Gold Border & WhatsApp 9021745403 */}
        <PageFooter pageName="Sarkari Yojana Information Hub" />
      </div>
    </div>
  );
};
