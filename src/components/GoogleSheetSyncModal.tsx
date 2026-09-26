import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Info,
} from 'lucide-react';
import { Language, translations } from '../data/translations';
import { PlaceItem } from '../types';
import {
  normalizeGoogleSheetUrl,
  parseGoogleSheetCsv,
  SAMPLE_GOOGLE_SHEET_CSV,
} from '../utils/googleSheetsSync';

interface GoogleSheetSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onImportPlaces: (newPlaces: PlaceItem[]) => void;
  syncedCount: number;
}

export const GoogleSheetSyncModal: React.FC<GoogleSheetSyncModalProps> = ({
  isOpen,
  onClose,
  language,
  onImportPlaces,
  syncedCount,
}) => {
  const t = translations[language];

  const [sheetUrl, setSheetUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleFetchSheet = async () => {
    const url = sheetUrl.trim();
    if (!url) {
      setStatusMessage({
        type: 'error',
        text: language === 'mr' ? 'कृपया गुगल शीटची लिंक टाका.' : 'Please enter a valid Google Sheet link.',
      });
      return;
    }

    setLoading(true);
    setStatusMessage({
      type: 'info',
      text: language === 'mr' ? 'गुगल शीटवरून डेटा डाऊनलोड होत आहे...' : 'Fetching live rows from Google Sheet...',
    });

    try {
      const csvUrl = normalizeGoogleSheetUrl(url);
      const res = await fetch(csvUrl);

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}. Check if Sheet is Shared as "Anyone with link can view".`);
      }

      const csvText = await res.text();
      const parsed = parseGoogleSheetCsv(csvText);

      if (parsed.length === 0) {
        throw new Error('No valid rows found. Ensure header has: Name, Category, Owner, Mobile, Address, Lat/Lng, Price');
      }

      onImportPlaces(parsed);
      setStatusMessage({
        type: 'success',
        text:
          language === 'mr'
            ? `अभिनंदन! गुगल शीटवरून ${parsed.length} नवीन दुकाने / ठिकाणे यशस्वीरित्या जोडली गेली आहेत!`
            : `Success! Successfully imported ${parsed.length} places directly from your Google Sheet!`,
      });
    } catch (err: any) {
      console.error('Sheet fetch error:', err);
      setStatusMessage({
        type: 'error',
        text:
          err.message ||
          (language === 'mr'
            ? 'शीट लोड करण्यात अडचण आली. कृपया शीट "Anyone with link" वर शेअर केली असल्याची खात्री करा किंवा खालील नमुना वापरा.'
            : 'Failed to fetch Sheet. Ensure Sheet sharing is set to "Anyone with the link can view".'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSampleData = () => {
    setLoading(true);
    try {
      const samplePlaces = parseGoogleSheetCsv(SAMPLE_GOOGLE_SHEET_CSV);
      onImportPlaces(samplePlaces);
      setStatusMessage({
        type: 'success',
        text:
          language === 'mr'
            ? `नमुना गुगल शीट डेटा लोड झाला! ${samplePlaces.length} नवीन ठिकाणे जोडली.`
            : `Sample Google Sheet data loaded! ${samplePlaces.length} new merchant places synced.`,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-stone-900 border-2 border-emerald-500/80 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full"
        >
          ✕
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xl shadow-xs">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-stone-100 font-devanagari-hero">
              {language === 'mr' ? 'गुगल शीट = तुमचा डेटाबेस' : 'Google Sheet = Your Live Database'}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {language === 'mr'
                ? 'कोणताही प्रोग्रॅमर नको! शीटमध्ये दुकान जोडले की ॲपवर आपोआप दिसेल.'
                : 'No backend programmer needed! Add shops in your Sheet & they appear instantly.'}
            </p>
          </div>
        </div>

        {/* Instructions Box */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-4 mb-5 text-xs text-stone-700 dark:text-stone-300 space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
            <Info className="w-4 h-4 shrink-0" />
            <span>
              {language === 'mr' ? 'गुगल शीटमधील स्तंभ (Columns) खालीलप्रमाणे ठेवा:' : 'Google Sheet Columns Structure:'}
            </span>
          </div>
          <code className="block bg-white dark:bg-stone-850 p-2 rounded-lg font-mono text-[11px] text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-stone-800 overflow-x-auto">
            Name | Category | Owner | Mobile | Address | Lat/Lng | Price
          </code>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
            {language === 'mr'
              ? 'टीप: गुगल शीटच्या "Share" बटणावर क्लिक करून "Anyone with the link can view" करा.'
              : 'Tip: Click "Share" in your Google Sheet and set to "Anyone with the link can view".'}
          </p>
        </div>

        {/* Input */}
        <div className="space-y-3 mb-5">
          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
            {language === 'mr' ? 'गुगल शीट शेअर लिंक पेस्ट करा:' : 'Paste Google Sheet Share Link:'}
          </label>
          <div className="relative">
            <input
              type="url"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5n.../edit?usp=sharing"
              className="w-full py-3 px-3.5 text-xs sm:text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`p-3 rounded-xl mb-4 text-xs font-semibold flex items-start gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                : statusMessage.type === 'error'
                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleFetchSheet}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>
              {language === 'mr' ? 'शीटमधून डेटा लोड करा (Fetch Data)' : 'Fetch Data from Google Sheet'}
            </span>
          </button>

          {/* Instant Sample Loader for Test */}
          <button
            onClick={handleLoadSampleData}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {language === 'mr'
                ? 'नमुना पुणे शीट टेस्ट करा (Load 5 Sample Shops)'
                : 'Test with Sample Pune Sheet Data'}
            </span>
          </button>
        </div>

        {/* Current Synced Counter */}
        {syncedCount > 0 && (
          <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 text-center text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            ✓ {syncedCount} {language === 'mr' ? 'शीटमधील ठिकाणे सध्या ॲपमध्ये सक्रिय आहेत' : 'custom places currently active in app'}
          </div>
        )}
      </div>
    </div>
  );
};
