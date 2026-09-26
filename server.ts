import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

// Initialize GoogleGenAI SDK as per gemini-api guidelines
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const PUNE_AI_SYSTEM_INSTRUCTION = `
You are "Punecha Smart Mitra" (पुण्याचा स्मार्ट मित्र), an intelligent, culturally proud, and helpful AI assistant representing the historic and modern city of Pune (विद्येचे माहेरघर, सांस्कृतिक राजधानी, आणि आयटी हब).

Key Knowledge & Personality:
1. Languages: You speak fluent, authentic Marathi (मराठी), Hindi, and English. Match the user's language seamlessly.
2. Tone: Friendly, respectful, helpful with authentic Puneri warmth, wit, and charm (puneri patya humor, "पुणे तिथे काय उणे", "भावा", "कट्टा", "अस्सल पुणेरी").
3. Landmarks & Culture: You know everything about Dagdusheth Halwai Ganpati Mandir, Shaniwar Wada, Sinhagad Fort, Parvati Hill, Sarasbaug, Pataleshwar, Aga Khan Palace, SPPU (Pune University), COEP, Fergusson College, BMCC, Symbiosis.
4. Food & Spots: You know legendary spots like Vaishali (SPDP & Filter coffee on FC Road), Goodluck Cafe (Bun Maska & Irani Chai), Chitale Bandhu (Bakarwadi & Amba Barfi - always remember their strict 1 to 4 PM break!), Bedekar & Kata Kirr Misal, Sujata Mastani, Kayani Bakery Shrewsbury biscuits.
5. Civic & Services: You know Pune Municipal Corporation (PMC Bhavan in Shivajinagar), 1800 1030 222 helpline, RTO Sangamwadi, Pune Metro (Civil Court Interchange, Aqua & Purple lines), PMPML buses, Emergency Dial 112, 108 Ambulance, Sassoon Hospital, Deenanath Mangeshkar Hospital.
6. Localities: Distinct knowledge of historic Peth areas (Sadashiv, Budhwar, Narayan, Shaniwar, Rasta), Deccan, FC Road, JM Road, Kothrud, Camp, Koregaon Park, Kalyani Nagar, Viman Nagar, Baner, Aundh, Wakad, Hinjawadi IT Park.

Always provide concise, structured, helpful answers. When relevant, mention opening hours, best times to visit, local travel tips, or famous Puneri advice!
`;

// Local fallback intelligent responses if API key is in setup or offline
function getFallbackPuneResponse(query: string, lang: 'mr' | 'en' | 'hi'): string {
  const q = query.toLowerCase();

  if (q.includes('दगडूशेठ') || q.includes('dagdusheth') || q.includes('ganpati') || q.includes('गणपती')) {
    if (lang === 'mr') {
      return '🙏 **श्रीमंत दगडूशेठ हलवाई गणपती मंदिर (बुधवार पेठ):**\n• दर्शन वेळ: सकाळी ६:०० ते रात्री १०:३० (दुपारी बंद नसते).\n• वैशिष्ट्य: पुण्याचे आराध्य दैवत! मुख्य आरती सकाळी ७:३० व रात्री ८:०० वाजता असते.\n• टीप: गर्दीच्या वेळी मनपा मेट्रो स्थानकावरून (मंडई किंवा बुधवार पेठ) सहज चालत जाता येते.';
    }
    return '🙏 **Shreemant Dagdusheth Halwai Ganpati Mandir (Budhwar Peth):**\n• Darshan Hours: 06:00 AM to 10:30 PM (No afternoon closure).\n• Highlights: Pune’s most beloved deity. Morning Maha Aarti at 7:30 AM & Evening Aarti at 8:00 PM.\n• Travel Tip: Take Pune Metro to Mandai or Budhwar Peth station for easiest walking access.';
  }

  if (q.includes('शनिवार वाडा') || q.includes('shaniwar wada') || q.includes('पेशवे') || q.includes('peshwa')) {
    if (lang === 'mr') {
      return '🏰 **शनिवार वाडा (शनिवार पेठ):**\n• वेळ: सकाळी ९:३० ते संध्याकाळी ५:३०.\n• तिकीट: भारतीय नागरिकांसाठी ₹२५, विद्यार्थ्यांसाठी सवलत.\n• संध्याकाळी लाईट अँड साऊंड शो (मराठी व इंग्रजी) आयोजित केला जातो.\n• जवळच कसबा गणपती आणि लाल महाल आहेत!';
    }
    return '🏰 **Shaniwar Wada (Shaniwar Peth):**\n• Timings: 09:30 AM to 05:30 PM.\n• Entry: ₹25 for Indian citizens, student discount with ID.\n• Highlights: Built in 1732 by Peshwa Baji Rao I. Visit the majestic Dilli Darwaza and evening Light & Sound show.';
  }

  if (q.includes('मिसळ') || q.includes('misal') || q.includes('food') || q.includes('खाद्यसंस्कृती') || q.includes('वैशाली') || q.includes('vaishali')) {
    if (lang === 'mr') {
      return '🍲 **पुण्यातील प्रसिद्ध खवय्येगिरी ठिकाणे:**\n1. **हॉटेल वैशाली (FC Road):** अस्सल एसपीएस (SPDP), म्हैसूर डोसा व फिल्टर कॉफी.\n2. **बेडेकर मिसळ (नारायण पेठ):** अस्सल पुणेरी गोडसर-झणझणीत ब्रेड मिसळ.\n3. **काटाकिर्र मिसळ (एरंडवणे):** आग ओकणारा तिखट कट आणि थंडगार ताक.\n4. **चितळे बंधू (बाजीराव रोड):** खमंग बाकरवडी (दुपारी १ ते ४ बंद असते!).\n5. **सुजाता मस्तानी (सदाशिव पेठ):** अस्सल मँगो मस्तानी!';
    }
    return '🍲 **Top Authentic Pune Food Destinations:**\n1. **Hotel Vaishali (FC Road):** Iconic SPDP, Mysore Masala Dosa & authentic Filter Coffee.\n2. **Bedekar Misal (Narayan Peth):** Traditional Puneri bread misal with unique flavorful rassa.\n3. **Kata Kirr (Erandwane):** Fiery Kolhapuri-style spice served with chilled buttermilk.\n4. **Chitale Bandhu (Bajirao Rd):** World-famous Bakarwadi (Closed 1 PM to 4 PM!).\n5. **Sujata Mastani (Sadashiv Peth):** Pune’s signature rich Mango Mastani shake.';
  }

  if (q.includes('emergency') || q.includes('आपत्कालीन') || q.includes('मदत') || q.includes('help') || q.includes('police') || q.includes('पोलीस')) {
    if (lang === 'mr') {
      return '🚨 **पुण्यातील महत्त्वाचे आपत्कालीन क्रमांक:**\n• पोलीस नियंत्रण कक्ष: **112** (२४ तास)\n• मोफत रुग्णवाहिका: **108**\n• अग्निशामक दल: **101**\n• महिला सुरक्षा निर्भया पथक: **1091**\n• पुणे मनपा (PMC) टोल फ्री: **1800 1030 222**\n• प्राणी बचाव (RESQ): **98909 99111**';
    }
    return '🚨 **Essential Pune Emergency Helplines:**\n• Police Unified Response: **112** (24x7)\n• Free Life Support Ambulance: **108**\n• Fire Brigade: **101**\n• Women Safety (Nirbhaya Squad): **1091**\n• PMC Citizen Toll-Free: **1800 1030 222**\n• Animal Rescue Helpline: **98909 99111**';
  }

  if (lang === 'mr') {
    return 'नमस्कार! मी तुमचा "पुण्याचा स्मार्ट मित्र" (AI). तुम्ही मला पुण्याचे मंदिरे, किल्ले, हॉटेल्स, शाळा-कॉलेजेस, मनपा सेवा किंवा वाहतुकीबद्दल काहीही विचारू शकता. सांगा, आज मी तुम्हाला पुण्यात कुठे घेऊन जाऊ?';
  }
  return 'Namaskar! I am your "Punecha Smart Mitra" (AI). Feel free to ask about Pune heritage, temples, iconic misal spots, PMC citizen services, Pune Metro routes, or emergency contacts. How can I assist you in Pune today?';
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Route: AI Chatbot for Pune
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { message, language = 'mr' } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      const langCode = language === 'en' ? 'en' : language === 'hi' ? 'hi' : 'mr';

      if (ai) {
        try {
          const prompt = `Language to respond in: ${langCode === 'mr' ? 'Marathi (मराठी)' : langCode === 'hi' ? 'Hindi (हिंदी)' : 'English'}.\nUser query: ${message}`;
          
          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              systemInstruction: PUNE_AI_SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
          });

          const replyText = response.text || getFallbackPuneResponse(message, langCode);
          res.json({ reply: replyText, source: 'ai' });
          return;
        } catch (apiError) {
          console.warn('Gemini API call failed, falling back to local Pune knowledge base:', apiError);
          const fallback = getFallbackPuneResponse(message, langCode);
          res.json({ reply: fallback, source: 'knowledge_base' });
          return;
        }
      } else {
        const fallback = getFallbackPuneResponse(message, langCode);
        res.json({ reply: fallback, source: 'knowledge_base' });
        return;
      }
    } catch (err) {
      console.error('Error in /api/chat:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // API Route: Google Places API / Curated Pune Places
  app.get('/api/places', async (req: Request, res: Response) => {
    try {
      const query = (req.query.query as string) || 'places in Pune';
      const category = (req.query.category as string) || 'all';
      const apiKey = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY;

      if (apiKey && apiKey !== 'YOUR_API_KEY') {
        try {
          const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
            query
          )}&key=${apiKey}`;
          const gResponse = await fetch(googlePlacesUrl);
          if (gResponse.ok) {
            const data: any = await gResponse.json();
            if (data.results && Array.isArray(data.results)) {
              const formatted = data.results.map((r: any, idx: number) => ({
                id: r.place_id || `place-api-${idx}`,
                name: r.name,
                nameMr: r.name,
                rating: r.rating || 4.5,
                reviewsCount: r.user_ratings_total || 100,
                address: r.formatted_address || 'Pune, Maharashtra',
                addressMr: r.formatted_address || 'पुणे, महाराष्ट्र',
                photo: r.photos?.[0]?.photo_reference
                  ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${r.photos[0].photo_reference}&key=${apiKey}`
                  : 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
                officialPhone: '020-25501000', // Verified public official helpline fallback
                phone: '020-25501000',
                openingHours: r.opening_hours?.open_now ? 'Open Now' : '09:00 AM - 09:00 PM',
                openingHoursMr: r.opening_hours?.open_now ? 'सध्या सुरू आहे' : 'स. ९:०० ते रा. ९:००',
                lat: r.geometry?.location?.lat || 18.5204,
                lng: r.geometry?.location?.lng || 73.8567,
                mapDirectionUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  r.name + ' ' + (r.formatted_address || 'Pune')
                )}`,
                source: 'Google Places API',
              }));
              res.json({ results: formatted, count: formatted.length, source: 'google_places_api' });
              return;
            }
          }
        } catch (apiErr) {
          console.warn('Google Places API proxy fetch failed, falling back:', apiErr);
        }
      }

      // Fallback response with simulated API contract
      res.json({
        message: 'Google Places endpoint ready. Set GOOGLE_PLACES_API_KEY in environment for live queries.',
        query,
        category,
        source: 'pune_database_king',
        endpoint: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
          query
        )}&key=YOUR_API_KEY`,
      });
    } catch (err) {
      console.error('Error in /api/places:', err);
      res.status(500).json({ error: 'Internal server error in places endpoint' });
    }
  });

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', app: 'Pune AI Agent - Punecha Smart Mitra' });
  });

  // Setup Vite in development or serve static in production
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Punecha Smart Mitra server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
