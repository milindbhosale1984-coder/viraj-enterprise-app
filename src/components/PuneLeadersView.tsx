import React, { useState } from 'react';
import {
  Users,
  Building,
  PhoneCall,
  MapPin,
  Share2,
  AlertCircle,
  ShieldCheck,
  Search,
  ExternalLink,
  Info,
} from 'lucide-react';
import { Language } from '../data/translations';
import {
  PUNE_AMDARS,
  PUNE_KHASDARS,
  PUNE_NAGARSEVAKS,
  PUNE_LEADERS_DISCLAIMER,
} from '../data/puneLeadersData';
import { LeaderItem } from '../types';

interface PuneLeadersViewProps {
  language: Language;
  onReportWrongInfo: (leader: { id: string; name: string; nameMr: string; categoryId: any; address: string; addressMr: string; officialPhone: string; phone: string; photo: string }) => void;
}

export const PuneLeadersView: React.FC<PuneLeadersViewProps> = ({
  language,
  onReportWrongInfo,
}) => {
  const [activeTab, setActiveTab] = useState<'amdar' | 'khasdar' | 'nagarsevak'>('amdar');
  const [searchQuery, setSearchQuery] = useState('');

  const currentList =
    activeTab === 'amdar'
      ? PUNE_AMDARS
      : activeTab === 'khasdar'
      ? PUNE_KHASDARS
      : PUNE_NAGARSEVAKS;

  const filteredLeaders = currentList.filter((leader) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      leader.name.toLowerCase().includes(q) ||
      leader.nameMr.includes(q) ||
      leader.constituency.toLowerCase().includes(q) ||
      leader.constituencyMr.includes(q) ||
      leader.party.toLowerCase().includes(q)
    );
  });

  const handleShare = (leader: LeaderItem) => {
    const text = `${leader.name} (${leader.nameMr}) - ${leader.constituencyMr}\nअधिकृत कार्यालय: ${leader.officeAddressMr}\nफोन: ${leader.officePhone}`;
    if (navigator.share) {
      navigator.share({ title: leader.name, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(language === 'mr' ? 'अधिकृत संपर्क माहिती कॉपी झाली!' : 'Official contact details copied!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Prominent Legal & Safety Disclaimer Banner */}
      <div className="mb-6 p-4 sm:p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 shadow-sm flex items-start gap-3.5">
        <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-extrabold text-sm sm:text-base text-amber-900 dark:text-amber-200 mb-1">
            {language === 'mr'
              ? 'अधिकृत जनसंपर्क व शासकीय कामासाठी संपर्क निर्देशिका'
              : 'Official Public Work & Grievance Directory'}
          </h4>
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
            {PUNE_LEADERS_DISCLAIMER}
          </p>
        </div>
      </div>

      {/* Header and Intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'पुणे लोकप्रतिनिधी संपर्क' : 'Pune Elected Representatives'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
            {language === 'mr' ? 'आमदार, खासदार व नगरसेवक अधिकृत यादी' : 'MLAs, MPs & Corporators Directory'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            {language === 'mr'
              ? 'केवळ अधिकृत कार्यालयीन पत्ता व शासकीय दूरध्वनी क्रमांक (डेटा स्त्रोत: pmc.gov.in)'
              : 'Official constituency office addresses and desk landlines from verified PMC records'}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'mr'
                ? 'मतदारसंघ किंवा नाव शोधा...'
                : 'Search by name or constituency...'
            }
            className="w-full py-2.5 pl-9 pr-4 text-sm rounded-2xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-orange-500 focus:outline-hidden font-medium"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('amdar')}
          className={`py-2.5 px-5 rounded-2xl font-extrabold text-sm sm:text-base transition-all shrink-0 cursor-pointer ${
            activeTab === 'amdar'
              ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          {language === 'mr' ? 'आमदार (विधानसभा - MLA)' : 'MLAs (विधानसभा)'} ({PUNE_AMDARS.length})
        </button>

        <button
          onClick={() => setActiveTab('khasdar')}
          className={`py-2.5 px-5 rounded-2xl font-extrabold text-sm sm:text-base transition-all shrink-0 cursor-pointer ${
            activeTab === 'khasdar'
              ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          {language === 'mr' ? 'खासदार (लोकसभा - MP)' : 'MPs (लोकसभा)'} ({PUNE_KHASDARS.length})
        </button>

        <button
          onClick={() => setActiveTab('nagarsevak')}
          className={`py-2.5 px-5 rounded-2xl font-extrabold text-sm sm:text-base transition-all shrink-0 cursor-pointer ${
            activeTab === 'nagarsevak'
              ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          {language === 'mr' ? 'नगरसेवक / प्रभाग कार्यालय (PMC)' : 'Corporators / Ward Offices'} ({PUNE_NAGARSEVAKS.length})
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeaders.map((leader) => (
          <div
            key={leader.id}
            className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Leader Top info */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={leader.photo}
                  alt={leader.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border-2 border-orange-400/40 shadow-xs"
                />
                <div className="min-w-0">
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 mb-1">
                    {language === 'mr' ? leader.partyMr : leader.party}
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-stone-100 leading-snug">
                    {language === 'mr' ? leader.nameMr : leader.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 line-clamp-1">
                    {language === 'mr' ? leader.constituencyMr : leader.constituency}
                  </p>
                </div>
              </div>

              {/* Office Address */}
              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-100 dark:border-stone-800 text-xs mb-3">
                <div className="flex items-start gap-1.5 text-stone-700 dark:text-stone-300">
                  <Building className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-stone-900 dark:text-stone-100">
                      {language === 'mr' ? 'अधिकृत कार्यालय पत्ता:' : 'Official Office Address:'}
                    </span>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                      {language === 'mr' ? leader.officeAddressMr : leader.officeAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Phone */}
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between text-xs mb-4">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'कार्यालय फोन:' : 'Office Landline:'}</span>
                </span>
                <span className="font-mono font-bold text-emerald-900 dark:text-emerald-200">
                  {leader.officePhone}
                </span>
              </div>
            </div>

            {/* Action Buttons: Call, Map, Share, Report */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${leader.officePhone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs"
                  title="Call Official Desk"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'कार्यालयात कॉल' : 'Call Office'}</span>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${leader.name} Office ${leader.officeAddress}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 hover:bg-orange-200 transition-colors border border-orange-200 dark:border-orange-800 shadow-xs"
                  title="Official Office Location on Map"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'कार्यालय नकाशा' : 'Office Map'}</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleShare(leader)}
                  className="flex items-center justify-center gap-1 py-1.5 px-2 text-xs font-semibold rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'शेअर' : 'Share'}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onReportWrongInfo({
                      id: leader.id,
                      name: leader.name,
                      nameMr: leader.nameMr,
                      categoryId: 'sarkari' as any,
                      address: leader.officeAddress,
                      addressMr: leader.officeAddressMr,
                      officialPhone: leader.officePhone,
                      phone: leader.officePhone,
                      photo: leader.photo,
                    })
                  }
                  className="flex items-center justify-center gap-1 py-1.5 px-2 text-xs font-semibold rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'दुरुस्ती नोंदवा' : 'Report Wrong'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
