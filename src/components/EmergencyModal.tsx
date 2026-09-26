import React from 'react';
import {
  PhoneCall,
  X,
  ShieldAlert,
  HeartPulse,
  Flame,
  Droplet,
  Users,
  Building2,
  Car,
} from 'lucide-react';
import { Language } from '../data/translations';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const emergencyContacts = [
    {
      titleMr: 'पोलीस नियंत्रण कक्ष (Police)',
      titleEn: 'Police Emergency Response',
      number: '112',
      tel: '112',
      subMr: 'सर्व आपत्कालीन परिस्थितीसाठी २४ तास',
      subEn: '24/7 Unified Emergency Helpline',
      icon: ShieldAlert,
      bg: 'bg-rose-600',
    },
    {
      titleMr: 'मोफत रुग्णवाहिका (Ambulance)',
      titleEn: 'Medical Ambulance (Free)',
      number: '108',
      tel: '108',
      subMr: 'तातडीची वैद्यकीय मदत व आयसीयू ॲम्ब्युलन्स',
      subEn: 'Immediate Trauma & ICU Ambulance',
      icon: HeartPulse,
      bg: 'bg-emerald-600',
    },
    {
      titleMr: 'अग्निशामक दल (Fire Brigade)',
      titleEn: 'Pune Fire Brigade',
      number: '101',
      tel: '101',
      subMr: 'आग, आपत्ती व बचाव कार्य',
      subEn: 'Fire & Disaster Rescue Operation',
      icon: Flame,
      bg: 'bg-orange-600',
    },
    {
      titleMr: 'जनकल्याण रक्तपेढी (Blood Bank)',
      titleEn: 'Jankalyan Blood Bank',
      number: '020-24449524',
      tel: '02024449524',
      subMr: '२४ तास सर्व रक्तगट उपलब्ध',
      subEn: '24/7 All Blood Groups Available',
      icon: Droplet,
      bg: 'bg-red-700',
    },
    {
      titleMr: 'महिला सुरक्षा निर्भया पथक',
      titleEn: 'Women Safety / Nirbhaya Squad',
      number: '1091',
      tel: '1091',
      subMr: 'महिलांसाठी विशेष सुरक्षा हेल्पलाईन',
      subEn: 'Special Safety Helpline for Women',
      icon: Users,
      bg: 'bg-purple-600',
    },
    {
      titleMr: 'पुणे मनपा (PMC) तक्रार निवारण',
      titleEn: 'PMC Civic Grievance Helpline',
      number: '1800 1030 222',
      tel: '18001030222',
      subMr: 'पाणी, रस्ते, स्वच्छता व आरोग्य',
      subEn: 'Toll-free Citizen Support',
      icon: Building2,
      bg: 'bg-blue-600',
    },
    {
      titleMr: 'पुणे ट्रॅफिक पोलीस हेल्पलाईन',
      titleEn: 'Pune Traffic Police Helpline',
      number: '020-26208225',
      tel: '02026208225',
      subMr: 'वाहतूक कोंडी व अपघात मदत',
      subEn: 'Traffic Control & Assistance',
      icon: Car,
      bg: 'bg-teal-600',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-stone-900 border-2 border-rose-500 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center font-bold text-xl">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-stone-100 font-devanagari-hero">
              {language === 'mr' ? 'पुणे आपत्कालीन संपर्क (One-Tap Dial)' : 'Pune Emergency Help (One-Tap Dial)'}
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'mr' ? 'कोणत्याही क्रमांकावर टॅप करून थेट कॉल करा' : 'Tap any number to call immediately'}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {emergencyContacts.map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <a
                key={idx}
                href={`tel:${contact.tel}`}
                className="p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 hover:bg-rose-50/60 dark:hover:bg-rose-950/40 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${contact.bg} text-white flex items-center justify-center shadow-xs shrink-0`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-100">
                      {language === 'mr' ? contact.titleMr : contact.titleEn}
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">
                      {language === 'mr' ? contact.subMr : contact.subEn}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-xs group-hover:scale-105 transition-transform shrink-0">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{contact.number}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
