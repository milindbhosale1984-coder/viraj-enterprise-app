import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Download,
  Share2,
  Printer,
  Copy,
  Check,
  Sparkles,
  QrCode,
  DollarSign,
  Link as LinkIcon,
  Phone,
  MapPin,
  Building,
  History,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { VeLogo } from '../components/VeLogo';
import { VIRAJ_ENTERPRISE_INFO } from '../utils/constants';

interface RecentQR {
  id: string;
  title: string;
  value: string;
  type: 'upi' | 'text' | 'phone' | 'location';
  timestamp: number;
}

export const QRGenerator: React.FC = () => {
  const [mode, setMode] = useState<'text' | 'upi'>('upi');
  
  // Text / General QR states
  const [textInput, setTextInput] = useState('https://wa.me/919021745403');
  const [qrLabel, setQrLabel] = useState('Viraj Enterprise Pune');

  // UPI specific states
  const [upiId, setUpiId] = useState('9021745403@upi');
  const [upiPayee, setUpiPayee] = useState('Viraj Enterprise');
  const [upiAmount, setUpiAmount] = useState('');
  const [upiNote, setUpiNote] = useState('Pune AI Agent Support');

  // Customization
  const [includeMargin, setIncludeMargin] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // History
  const [history, setHistory] = useState<RecentQR[]>(() => {
    try {
      const saved = localStorage.getItem('ve_qr_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: '1',
        title: 'VE Viraj Enterprise UPI',
        value: 'upi://pay?pa=9021745403@upi&pn=Viraj%20Enterprise&cu=INR',
        type: 'upi',
        timestamp: Date.now() - 3600000,
      },
      {
        id: '2',
        title: 'Viraj Enterprise Contact',
        value: 'tel:9021745403',
        type: 'phone',
        timestamp: Date.now() - 7200000,
      },
      {
        id: '3',
        title: 'Shreemant Dagdusheth Halwai Mandir',
        value: 'https://maps.google.com/?q=Dagdusheth+Halwai+Ganpati+Temple+Pune',
        type: 'location',
        timestamp: Date.now() - 86400000,
      },
    ];
  });

  const qrCanvasRef = useRef<HTMLDivElement>(null);

  // Calculate current QR value
  const qrValue = React.useMemo(() => {
    if (mode === 'upi') {
      const cleanUpi = upiId.trim();
      const cleanPn = encodeURIComponent(upiPayee.trim() || 'Viraj Enterprise');
      const cleanNote = encodeURIComponent(upiNote.trim() || 'Payment');
      let upiStr = `upi://pay?pa=${cleanUpi}&pn=${cleanPn}&cu=INR`;
      if (upiAmount && Number(upiAmount) > 0) {
        upiStr += `&am=${upiAmount}`;
      }
      if (cleanNote) {
        upiStr += `&tn=${cleanNote}`;
      }
      return upiStr;
    }
    return textInput.trim() || 'https://virajenterprise.in';
  }, [mode, upiId, upiPayee, upiAmount, upiNote, textInput]);

  // Save to history helper
  const saveToHistory = (title: string, value: string, type: 'upi' | 'text' | 'phone' | 'location') => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.value !== value);
      const updated = [
        {
          id: Date.now().toString(),
          title: title || 'Custom QR',
          value,
          type,
          timestamp: Date.now(),
        },
        ...filtered,
      ].slice(0, 5); // Keep recent 5

      try {
        localStorage.setItem('ve_qr_history', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Download QR code as PNG image
  const handleDownloadPNG = () => {
    const canvas = qrCanvasRef.current?.querySelector('canvas');
    if (!canvas) return;

    // Create a framed canvas with gold & black border and VE branding
    const framedCanvas = document.createElement('canvas');
    const borderPadding = 32;
    const footerHeight = 60;
    framedCanvas.width = canvas.width + borderPadding * 2;
    framedCanvas.height = canvas.height + borderPadding * 2 + footerHeight;
    const ctx = framedCanvas.getContext('2d');

    if (ctx) {
      // Dark Luxury Background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, framedCanvas.width, framedCanvas.height);

      // Gold Outer Border
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 4;
      ctx.strokeRect(6, 6, framedCanvas.width - 12, framedCanvas.height - 12);

      // Inner Gold Ring
      ctx.strokeStyle = '#996515';
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, framedCanvas.width - 20, framedCanvas.height - 20);

      // White Backing for QR Code readability
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(borderPadding - 4, borderPadding - 4, canvas.width + 8, canvas.height + 8);

      // Draw QR Canvas
      ctx.drawImage(canvas, borderPadding, borderPadding);

      // Draw Header Text
      ctx.fillStyle = '#F3E5AB';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      const labelText = mode === 'upi' ? `Scan & Pay: ${upiPayee}` : qrLabel || 'Scan QR Code';
      ctx.fillText(labelText.slice(0, 36), framedCanvas.width / 2, borderPadding + canvas.height + 24);

      // Draw VE Brand text
      ctx.fillStyle = '#D4AF37';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('VE VIRAJ ENTERPRISE PUNE', framedCanvas.width / 2, borderPadding + canvas.height + 42);

      const url = framedCanvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `Pune-QR-${Date.now()}.png`;
      a.href = url;
      a.click();

      saveToHistory(
        mode === 'upi' ? `UPI: ${upiPayee} (${upiAmount ? '₹' + upiAmount : upiId})` : qrLabel || textInput,
        qrValue,
        mode === 'upi' ? 'upi' : 'text'
      );
    }
  };

  // Share to WhatsApp
  const handleShareWhatsApp = () => {
    const shareText =
      mode === 'upi'
        ? `*Pay via UPI (Pune QR Generator - Viraj Enterprise)*\nPayee: ${upiPayee}\nUPI ID: ${upiId}\nAmount: ${upiAmount ? '₹' + upiAmount : 'Any'}\nUPI Link: ${qrValue}`
        : `*Pune QR Code by Viraj Enterprise*\n${qrLabel ? '*' + qrLabel + '*\n' : ''}${qrValue}`;

    const url = `https://wa.me/919021745403?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    saveToHistory(
      mode === 'upi' ? `UPI: ${upiPayee}` : qrLabel || textInput,
      qrValue,
      mode === 'upi' ? 'upi' : 'text'
    );
  };

  // Print QR
  const handlePrint = () => {
    const canvas = qrCanvasRef.current?.querySelector('canvas');
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');

    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Pune QR Code - Viraj Enterprise</title>
          <style>
            body { font-family: sans-serif; text-align: center; padding: 40px; background: #fff; color: #111; }
            .card { border: 3px solid #d4af37; border-radius: 16px; padding: 24px; max-width: 380px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
            img { width: 250px; height: 250px; margin: 16px 0; }
            h2 { color: #b38728; margin: 0 0 6px 0; font-size: 20px; }
            p { margin: 4px 0; color: #555; font-size: 13px; }
            .brand { font-weight: bold; color: #111; font-size: 14px; margin-top: 14px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>VE VIRAJ ENTERPRISE PUNE</h2>
            <p>Official QR Code Service • Pune AI Agent</p>
            <img src="${dataUrl}" alt="QR Code" />
            <p><strong>${mode === 'upi' ? 'Scan & Pay: ' + upiPayee : qrLabel}</strong></p>
            ${mode === 'upi' && upiAmount ? `<p style="font-size:18px;color:#059669;font-weight:bold;">₹${upiAmount}</p>` : ''}
            <div class="brand">Owner: Milind Bhosale • 9021745403</div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
        </html>
      `);
      printWin.document.close();
    }
  };

  // Copy raw value
  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Apply Presets
  const applyPreset = (preset: 'hotel' | 'phone' | 'upi' | 'office' | 'temple') => {
    if (preset === 'hotel') {
      setMode('text');
      setTextInput('https://maps.google.com/?q=Goodluck+Cafe+FC+Road+Pune');
      setQrLabel('Goodluck Cafe, FC Road Pune - Location & Menu');
    } else if (preset === 'phone') {
      setMode('text');
      setTextInput('tel:9021745403');
      setQrLabel('Call Viraj Enterprise: 9021745403');
    } else if (preset === 'upi') {
      setMode('upi');
      setUpiId('9021745403@upi');
      setUpiPayee('Viraj Enterprise Pune');
      setUpiAmount('499');
      setUpiNote('Directory Ad / Premium Boost');
    } else if (preset === 'office') {
      setMode('text');
      setTextInput('https://maps.google.com/?q=Bhekrai+Nagar+Fursungi+Pune+412308');
      setQrLabel('Viraj Enterprise Office - Bhekrai Nagar Fursungi');
    } else if (preset === 'temple') {
      setMode('text');
      setTextInput('https://maps.google.com/?q=Shreemant+Dagdusheth+Halwai+Ganpati+Temple+Pune');
      setQrLabel('Shreemant Dagdusheth Ganpati Mandir Pune');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white pt-6 pb-20 px-4 sm:px-6">
      {/* Header Container */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        {/* Gold VE Royal Crest */}
        <div className="flex justify-center mb-3">
          <VeLogo size={70} />
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
          Pune QR Generator - by Viraj Enterprise
        </h1>
        <p className="text-xs sm:text-sm text-[#F7E7A9] font-medium mt-1">
          Create Instant UPI Payment, Hotel Location, Phone & Menu QR Codes with Gold Framing
        </p>

        {/* Mode Selector Tabs */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex p-1 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
            <button
              onClick={() => setMode('upi')}
              className={`flex items-center gap-2 py-2 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                mode === 'upi'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 shadow-md font-black'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>UPI Payment QR (पेमेंट कोड)</span>
            </button>

            <button
              onClick={() => setMode('text')}
              className={`flex items-center gap-2 py-2 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                mode === 'text'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 shadow-md font-black'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              <span>Text / Link / Location QR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs Left, QR Display Right */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Controls & Inputs */}
        <div className="lg:col-span-7 bg-[#141418] p-5 sm:p-6 rounded-3xl border border-[#D4AF37]/30 shadow-xl space-y-5">
          {/* Quick Preset Chips */}
          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
              ⚡ Quick Presets (उदाहरणे):
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => applyPreset('upi')}
                className="py-1 px-2.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/20 cursor-pointer"
              >
                💰 My UPI Payment (₹499)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('phone')}
                className="py-1 px-2.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/20 cursor-pointer"
              >
                📞 My Phone 9021745403
              </button>
              <button
                type="button"
                onClick={() => applyPreset('hotel')}
                className="py-1 px-2.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/20 cursor-pointer"
              >
                🍽️ My Hotel Location
              </button>
              <button
                type="button"
                onClick={() => applyPreset('office')}
                className="py-1 px-2.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/20 cursor-pointer"
              >
                🏢 Viraj Enterprise Office
              </button>
            </div>
          </div>

          {/* Mode 1: UPI Inputs */}
          {mode === 'upi' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  UPI ID (उदा. 9021745403@upi किंवा yourname@okhdfcbank) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="9021745403@upi"
                    className="w-full bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-hidden"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-amber-400 font-mono">
                    UPI
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Payee Name (नाव / दुकान / हॉटेल)
                  </label>
                  <input
                    type="text"
                    value={upiPayee}
                    onChange={(e) => setUpiPayee(e.target.value)}
                    placeholder="Viraj Enterprise Pune"
                    className="w-full bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Amount (रक्कम ₹ ऐच्छिक)
                  </label>
                  <input
                    type="number"
                    value={upiAmount}
                    onChange={(e) => setUpiAmount(e.target.value)}
                    placeholder="₹499 (optional)"
                    className="w-full bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  Payment Note / Remark (शेरा)
                </label>
                <input
                  type="text"
                  value={upiNote}
                  onChange={(e) => setUpiNote(e.target.value)}
                  placeholder="Pune Hotel Bill / Super App Ad"
                  className="w-full bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-hidden"
                />
              </div>
            </div>
          ) : (
            /* Mode 2: Text / Link Inputs */
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  Enter Hotel Name / Phone / Location / UPI ID / URL *
                </label>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  rows={3}
                  placeholder="उदा. https://maps.google.com/... किंवा 9021745403 किंवा Hotel Shreyas Pune"
                  className="w-full bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  Display Label (QR कोडचे नाव / शीर्षक)
                </label>
                <input
                  type="text"
                  value={qrLabel}
                  onChange={(e) => setQrLabel(e.target.value)}
                  placeholder="Viraj Enterprise Pune"
                  className="w-full bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {/* Toggle Margin */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-xs text-stone-400">
            <span>Include Safe Border Margin for Easy Scanning</span>
            <input
              type="checkbox"
              checked={includeMargin}
              onChange={(e) => setIncludeMargin(e.target.checked)}
              className="accent-amber-400 w-4 h-4 cursor-pointer"
            />
          </div>

          {/* Raw string preview */}
          <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
            <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
              <span>QR Code Payload Value:</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="font-mono text-xs text-stone-300 break-all select-all">
              {qrValue}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: The 250x250 QR Code with Gold Border & Action Buttons */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Framed QR Code Card */}
          <div className="w-full max-w-[340px] bg-gradient-to-b from-[#18181d] to-[#0a0a0a] rounded-3xl p-6 border-2 border-[#D4AF37] shadow-[0_10px_35px_rgba(212,175,55,0.25)] flex flex-col items-center text-center">
            {/* Top Brand Stamp */}
            <div className="flex items-center gap-2 mb-3">
              <VeLogo size={32} />
              <div className="text-left">
                <span className="block text-[11px] font-black tracking-widest text-[#D4AF37] uppercase">
                  VIRAJ ENTERPRISE
                </span>
                <span className="block text-[9px] text-stone-400">PUNE AI AGENT</span>
              </div>
            </div>

            {/* QR Code Canvas 250x250 with white background */}
            <div
              ref={qrCanvasRef}
              className="p-4 bg-white rounded-2xl shadow-inner border border-stone-300 flex items-center justify-center my-2"
            >
              <QRCodeCanvas
                value={qrValue}
                size={230}
                level="M"
                includeMargin={includeMargin}
              />
            </div>

            {/* Label below QR */}
            <h3 className="mt-3 text-sm font-bold text-[#FCF6BA] truncate max-w-[280px]">
              {mode === 'upi' ? `Pay: ${upiPayee}` : qrLabel || 'Scan QR'}
            </h3>
            {mode === 'upi' && upiAmount && (
              <p className="text-emerald-400 font-extrabold text-base">
                ₹{upiAmount}
              </p>
            )}
            <p className="text-[10px] text-stone-400 mt-0.5">
              Works with Google Pay, PhonePe, Paytm & Cameras
            </p>

            {/* Action Buttons: Download, WhatsApp Share, Print */}
            <div className="w-full space-y-2 mt-5">
              {/* 1. Download PNG Button */}
              <button
                type="button"
                onClick={handleDownloadPNG}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Download QR (PNG)</span>
              </button>

              {/* 2. Share on WhatsApp */}
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-[0.98]"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>Share on WhatsApp</span>
              </button>

              {/* 3. Print QR */}
              <button
                type="button"
                onClick={handlePrint}
                className="w-full py-2 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs flex items-center justify-center gap-2 border border-stone-700 cursor-pointer transition-all"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Print QR Code (प्रिंट करा)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT 5 QR CODES SECTION */}
      <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-stone-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent QR Codes (इतिहास - शेवटचे ५ कोड)
            </h3>
          </div>
          {history.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setHistory([]);
                localStorage.removeItem('ve_qr_history');
              }}
              className="text-[11px] text-stone-500 hover:text-rose-400 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {history.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.type === 'upi') {
                    setMode('upi');
                  } else {
                    setMode('text');
                    setTextInput(item.value);
                    setQrLabel(item.title);
                  }
                }}
                className="bg-stone-900/80 hover:bg-stone-850 p-3 rounded-2xl border border-stone-800 hover:border-amber-500/40 transition-all cursor-pointer group flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-stone-800 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-500/20">
                  <QrCode className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-stone-200 truncate group-hover:text-amber-300">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-stone-400 font-mono truncate mt-0.5">
                    {item.value}
                  </p>
                  <span className="inline-block mt-1 text-[9px] text-stone-500">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-stone-500 text-center py-4">
            No recent QR codes saved yet. Generate a QR code to see it here!
          </p>
        )}
      </div>
    </div>
  );
};
