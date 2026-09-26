export interface GanpatiSong {
  id: string;
  title: string;
  titleMr: string;
  singer: string;
  singerMr: string;
  duration: string;
  youtubeId: string;
  descriptionMr: string;
  thumbnail: string;
}

export interface NewsRssItem {
  id: string;
  source: 'Sakal' | 'Loksatta' | 'Maharashtra Times' | 'Pune Mirror';
  sourceLogo: string;
  title: string;
  titleMr: string;
  snippet: string;
  snippetMr: string;
  timeAgo: string;
  url: string;
  category: 'city' | 'civic' | 'metro' | 'culture';
}

export const GANPATI_SONGS: GanpatiSong[] = [
  {
    id: 'song-1',
    title: 'Sukhkarta Dukhharta (Official Aarti)',
    titleMr: 'सुखकर्ता दुःखहर्ता (पुणेरी पारंपरिक महाआरती)',
    singer: 'Lata Mangeshkar',
    singerMr: 'भारतरत्न लता मंगेशकर',
    duration: '4:18',
    youtubeId: 'Wz_xwbq3Z0U',
    descriptionMr: 'समर्थ रामदास स्वामी रचित जगप्रसिद्ध व पवित्र गणपती बाप्पाची महाआरती.',
    thumbnail: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'song-2',
    title: 'Shendur Lal Chadhayo',
    titleMr: 'शेंदूर लाल चढायो (बाप्पाची आरती)',
    singer: 'Ravindra Sathe',
    singerMr: 'रवींद्र साठे',
    duration: '3:45',
    youtubeId: '3H_gGk0B2pA',
    descriptionMr: 'दगडूशेठ व मानाच्या गणपतींच्या दरबारात दररोज गायली जाणारी मंगल आरती.',
    thumbnail: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'song-3',
    title: 'Gajanana Shri Ganraya',
    titleMr: 'गजानना श्री गणराया आधी वंदू तुज मोरया',
    singer: 'Anuradha Paudwal',
    singerMr: 'अनुराधा पौडवाल',
    duration: '5:12',
    youtubeId: 'aY1l2oG-xP0',
    descriptionMr: 'हृदयाला भिडणारे भावगीत, प्रभातफेरी व पुणेरी उत्सवाचे लाडके गीत.',
    thumbnail: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'song-4',
    title: 'Moraya Moraya (Uladhal)',
    titleMr: 'मोरया मोरया मी एकटा माणसात आलो',
    singer: 'Ajay Gogavale (Ajay-Atul)',
    singerMr: 'अजय-अतुल',
    duration: '5:40',
    youtubeId: '9gP0vE3O2cQ',
    descriptionMr: 'अंगावर रोमांच उभे करणारे आणि पुणेरी विसर्जन मिरवणुकीची शान असलेले गाणे.',
    thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'song-5',
    title: 'Deva Shree Ganesha',
    titleMr: 'देवा श्री गणेशा (महाआरती व तांडव)',
    singer: 'Ajay Gogavale',
    singerMr: 'अजय गोगावले',
    duration: '6:15',
    youtubeId: 'v86jH1FfG5M',
    descriptionMr: 'पुण्यातील प्रत्येक ढोल-ताशा पथकाचा आवडता जोशपूर्ण ठेका.',
    thumbnail: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80',
  },
];

export const PUNE_NEWS_FEED: NewsRssItem[] = [
  {
    id: 'news-1',
    source: 'Sakal',
    sourceLogo: 'सकाळ',
    title: 'Pune Metro Phase 2: Detailed Project Report for Swargate to Katraj sent for Central Cabinet approval',
    titleMr: 'पुणे मेट्रो टप्पा २: स्वारगेट ते कात्रज भुयारी मार्गाच्या डीपीआरला मंजुरी मिळण्याची शक्यता',
    snippet: 'The underground extension will cover 5.4 km connecting Market Yard, Bibwewadi, and Katraj Chowk.',
    snippetMr: '५.४ किमीचा हा भुयारी मार्ग मार्केट यार्ड, पद्मावती, बिबवेवाडी व कात्रज चौक थेट जोडणार आहे.',
    timeAgo: '२० मिनिटांपूर्वी',
    url: 'https://www.esakal.com/pune',
    category: 'metro',
  },
  {
    id: 'news-2',
    source: 'Loksatta',
    sourceLogo: 'लोकसत्ता',
    title: 'PMC launches automated property tax rebate for solar-enabled housing societies',
    titleMr: 'पुणे मनपा: सौरऊर्जा प्रकल्प असलेल्या गृहनिर्माण सोसायट्यांना करामध्ये १०% विशेष सवलत',
    snippet: 'Green energy initiative by PMC rewards environmentally conscious residential complexes across Pune.',
    snippetMr: 'पर्यावरणपूरक शहराच्या दिशेने मनपाचे पाऊल; ऑनलाइन अर्जाची सोय pmc.gov.in वर सुरू.',
    timeAgo: '४५ मिनिटांपूर्वी',
    url: 'https://www.loksatta.com/pune',
    category: 'civic',
  },
  {
    id: 'news-3',
    source: 'Maharashtra Times',
    sourceLogo: 'मटा',
    title: 'Pune University (SPPU) announces winter examination timetable and online hall tickets',
    titleMr: 'पुणे विद्यापीठ: हिवाळी सत्राच्या परीक्षांचे वेळापत्रक जाहीर, हॉल तिकीट ऑनलाइन उपलब्ध',
    snippet: 'Over 4 lakh students across Pune, Ahmednagar and Nashik districts can download their exam passes.',
    snippetMr: 'पुणे, नगर व नाशिक जिल्ह्यातील विद्यार्थ्यांसाठी विद्यापीठ संकेतस्थळावर लिंक सक्रिय.',
    timeAgo: '१ तासापूर्वी',
    url: 'https://maharashtratimes.com/maharashtra/pune-news',
    category: 'city',
  },
  {
    id: 'news-4',
    source: 'Pune Mirror',
    sourceLogo: 'Mirror',
    title: 'PMPML adds 50 new air-conditioned e-buses on IT corridor from Pune Station to Hinjawadi Phase 3',
    titleMr: 'PMPML: पुणे स्टेशन ते हिंजवडी फेज ३ मार्गावर ५० नवीन वातानुकूलित ई-बसेस दाखल',
    snippet: 'Direct non-stop shuttle services starting every 10 minutes to alleviate peak-hour traffic jams.',
    snippetMr: 'आयटी कर्मचाऱ्यांच्या सोयीसाठी दर १० मिनिटांनी नॉन-स्टॉप एसी बस सेवा सुरू.',
    timeAgo: '२ तासांपूर्वी',
    url: 'https://punemirror.com',
    category: 'city',
  },
];
