import React, { useState } from 'react';
import {
  AlertCircle,
  X,
  CheckCircle,
  Send,
  ShieldCheck,
  Building,
  Phone,
  Clock,
  MapPin,
} from 'lucide-react';
import { Language } from '../data/translations';
import { PlaceItem, WrongInfoReport } from '../types';

interface ReportWrongInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  place: PlaceItem | null;
  language: Language;
}

export const ReportWrongInfoModal: React.FC<ReportWrongInfoModalProps> = ({
  isOpen,
  onClose,
  place,
  language,
}) => {
  const [issueType, setIssueType] = useState<
    'wrong_phone' | 'wrong_address' | 'wrong_timing' | 'permanently_closed' | 'other'
  >('wrong_phone');
  const [correctionText, setCorrectionText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState('');

  if (!isOpen || !place) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctionText.trim()) return;

    const newReport: WrongInfoReport = {
      id: `rep-${Date.now()}`,
      placeId: place.id,
      placeName: place.name,
      placeNameMr: place.nameMr,
      category: place.categoryId,
      issueType,
      correctionText: correctionText.trim(),
      reportedAt: new Date().toISOString(),
      status: 'Submitted',
    };

    // Store in localStorage
    try {
      const existing = JSON.parse(
        localStorage.getItem('pune_wrong_info_reports') || '[]'
      );
      localStorage.setItem(
        'pune_wrong_info_reports',
        JSON.stringify([newReport, ...existing])
      );
    } catch (err) {
      console.error('Error saving report:', err);
    }

    setReportId(newReport.id);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setCorrectionText('');
    setReportId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-600 text-white">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5" />
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {language === 'mr' ? 'चुकीची माहिती नोंदवा' : 'Report Wrong Info'}
              </h3>
              <p className="text-xs text-orange-100">
                {language === 'mr'
                  ? 'पुणेकरांसाठी अचूक व अधिकृत डेटा सुनिश्चित करा'
                  : 'Help keep Pune public directory 100% verified & accurate'}
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">
                {language === 'mr' ? 'नोंद यशस्वीरित्या स्वीकारली!' : 'Report Submitted Successfully!'}
              </h4>
              <p className="text-sm text-stone-600 dark:text-stone-300 mb-4 max-w-sm mx-auto">
                {language === 'mr'
                  ? `आपल्या दुरुस्तीची नोंद Reference ID: ${reportId} सह घेतली गेली आहे. आमची टीम डेटा पडताळणी करेल.`
                  : `Your correction has been logged under Reference ID: ${reportId}. Our verification team will review and update.`}
              </p>
              <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs text-stone-600 dark:text-stone-300 font-mono mb-6">
                Place: {place.name} ({place.nameMr})
              </div>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors"
              >
                {language === 'mr' ? 'पूर्ण झाले (Done)' : 'Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Place Snapshot */}
              <div className="p-3.5 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 rounded-2xl flex items-center gap-3">
                <img
                  src={place.photo}
                  alt={place.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                    {language === 'mr' ? place.nameMr : place.name}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                    {language === 'mr' ? place.addressMr : place.address}
                  </p>
                  <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    {language === 'mr' ? 'सध्याचा अधिकृत फोन:' : 'Current Listed Phone:'}{' '}
                    {place.officialPhone || place.phone}
                  </p>
                </div>
              </div>

              {/* Select Issue Type */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  {language === 'mr' ? 'समस्येचा प्रकार निवडा:' : 'Select Issue Type:'}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'wrong_phone', labelMr: 'चुकीचा फोन नंबर', labelEn: 'Wrong Phone Number' },
                    { id: 'wrong_address', labelMr: 'चुकीचा पत्ता/लोकेशन', labelEn: 'Wrong Address/Map' },
                    { id: 'wrong_timing', labelMr: 'बदललेली वेळ/टायमिंग', labelEn: 'Changed Timings' },
                    { id: 'permanently_closed', labelMr: 'ठिकाण कायमचे बंद', labelEn: 'Permanently Closed' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setIssueType(opt.id as any)}
                      className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                        issueType === opt.id
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-200'
                          : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {language === 'mr' ? opt.labelMr : opt.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Correction details */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  {language === 'mr'
                    ? 'अचूक माहिती / दुरुस्ती तपशील:'
                    : 'Correct Information / Details:'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={correctionText}
                  onChange={(e) => setCorrectionText(e.target.value)}
                  placeholder={
                    language === 'mr'
                      ? 'उदा. नवीन अधिकृत फोन नंबर 020-..., नवीन कार्यालयीन वेळ स. ९ ते सायं. ६...'
                      : 'e.g. Correct official phone is 020-..., office hours changed to 9 AM - 6 PM...'
                  }
                  className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              {/* Public Safety Note */}
              <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-300">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  {language === 'mr'
                    ? 'सूचना: केवळ सार्वजनिक व अधिकृत व्यवसाय/कार्यालयीन माहितीच पाठवा. वैयक्तिक मोबाईल नंबर टाकू नयेत.'
                    : 'Note: Please submit only public & official business contact details. Never submit private personal phone numbers.'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-sm hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                >
                  {language === 'mr' ? 'रद्द करा' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={!correctionText.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold text-sm transition-colors shadow-md shadow-orange-600/20"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'mr' ? 'नोंद पाठवा' : 'Submit Correction'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
