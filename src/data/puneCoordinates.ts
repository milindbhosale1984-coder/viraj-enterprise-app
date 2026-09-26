export const PUNE_COORDINATES_MAP: Record<string, { lat: number; lng: number; price?: string }> = {
  // Hotels
  'hotel-1': { lat: 18.5173, lng: 73.8415, price: 'Bun Maska Chai @ ₹95' }, // Cafe Goodluck
  'hotel-2': { lat: 18.5235, lng: 73.8418, price: 'Puneri SPDP @ ₹120' }, // Vaishali
  'hotel-3': { lat: 18.5228, lng: 73.8421, price: 'Medu Vada + Filter Coffee @ ₹110' }, // Roopali
  'hotel-4': { lat: 18.5152, lng: 73.8496, price: 'Bread Slice Misal @ ₹120' }, // Bedekar
  'hotel-5': { lat: 18.5085, lng: 73.8340, price: 'Kata Kirr Misal + Taak @ ₹130' }, // Kata Kirr
  'hotel-6': { lat: 18.5165, lng: 73.8808, price: 'Shrewsbury Biscuits @ ₹380/kg' }, // Kayani Bakery
  'hotel-7': { lat: 18.5229, lng: 73.8425, price: 'Maharashtrian Thali @ ₹380' }, // Shabree
  'hotel-8': { lat: 18.5186, lng: 73.8765, price: 'Chutney Sandwich + Shake @ ₹160' }, // Marz-O-Rin

  // Mandir & Tourist
  'mandir-1': { lat: 18.5164, lng: 73.8560, price: 'Free Darshan / VIP Pass' }, // Dagdusheth
  'mandir-2': { lat: 18.5195, lng: 73.8553, price: 'Entry Ticket ₹25' }, // Shaniwar Wada
  'mandir-3': { lat: 18.3663, lng: 73.7558, price: 'Pithla Bhakri @ ₹140' }, // Sinhagad
  'mandir-4': { lat: 18.5028, lng: 73.8530, price: 'Free Entry & Lake View' }, // Sarasbaug
  'mandir-5': { lat: 18.4962, lng: 73.8479, price: 'Free Hill Ascent' }, // Parvati
  'mandir-6': { lat: 18.5282, lng: 73.8475, price: 'Free Monolith Caves' }, // Pataleshwar
  'mandir-7': { lat: 18.5524, lng: 73.9015, price: 'Entry Ticket ₹25' }, // Aga Khan Palace
  'mandir-8': { lat: 18.5376, lng: 73.8290, price: 'Free Goddess Darshan' }, // Chaturshringi

  // Hospitals
  'hospital-1': { lat: 18.5033, lng: 73.8298, price: '24x7 Emergency Care' }, // Deenanath
  'hospital-2': { lat: 18.5306, lng: 73.8778, price: 'NABH Super Speciality' }, // Ruby Hall
  'hospital-3': { lat: 18.5140, lng: 73.8375, price: '24x7 Trauma & Neuro' }, // Sahyadri
  'hospital-4': { lat: 18.5190, lng: 73.8690, price: 'Affordable Care Trust' }, // KEM
  'hospital-5': { lat: 18.5286, lng: 73.8752, price: 'Station Emergency ICU' }, // Jehangir
  'hospital-6': { lat: 18.5298, lng: 73.8520, price: 'Robotic Joint Surgery' }, // Sancheti
  'hospital-7': { lat: 18.4600, lng: 73.8580, price: 'Katraj Campus Hospital' }, // Bharati Vidyapeeth
  'hospital-8': { lat: 18.5025, lng: 73.8965, price: 'Wanowrie Multi-speciality' }, // Inamdar

  // Schools & Colleges
  'school-1': { lat: 18.5222, lng: 73.8398, price: 'Historic Arts & Science' }, // Fergusson
  'school-2': { lat: 18.5292, lng: 73.8566, price: 'Premier Engineering (Est 1854)' }, // COEP
  'school-3': { lat: 18.5385, lng: 73.8285, price: 'Global International Campus' }, // Symbiosis
  'school-4': { lat: 18.5529, lng: 73.8260, price: 'Oxford of the East Campus' }, // SPPU
  'school-5': { lat: 18.5175, lng: 73.8320, price: 'Elite Commerce & Business' }, // BMCC
  'school-6': { lat: 18.5188, lng: 73.8305, price: 'National Premier Law College' }, // ILS Law
  'school-7': { lat: 18.5440, lng: 73.8180, price: 'Pashan Jesuit School' }, // Loyola
  'school-8': { lat: 18.5150, lng: 73.8510, price: 'Sadashiv Peth National School' }, // Jnana Prabodhini

  // Sarkari
  'sarkari-1': { lat: 18.5285, lng: 73.8525, price: 'Citizen CFC Services Free' }, // PMC Main Bhavan
  'sarkari-2': { lat: 18.5340, lng: 73.8655, price: 'Driving License / Parivahan' }, // RTO Pune
  'sarkari-3': { lat: 18.5220, lng: 73.8760, price: '24x7 Dial 112 Control' }, // Police Comm.
  'sarkari-4': { lat: 18.5265, lng: 73.8745, price: 'District Revenue & 7/12 Kiosk' }, // Collector Office
  'sarkari-5': { lat: 18.5280, lng: 73.8530, price: 'One Pune Metro Card' }, // Metro Bhavan
  'sarkari-6': { lat: 18.5200, lng: 73.8680, price: 'PM Surya Ghar Solar Desk' }, // MSEDCL
  'sarkari-7': { lat: 18.5235, lng: 73.8770, price: 'Speed Post 24x7 Counter' }, // GPO
  'sarkari-8': { lat: 18.5080, lng: 73.8820, price: 'E-Chhawani Citizen Desk' }, // PCB Office

  // Shops
  'shop-1': { lat: 18.5135, lng: 73.8540, price: 'Bakarwadi 500g @ ₹190' }, // Chitale Bajirao Rd
  'shop-2': { lat: 18.5160, lng: 73.8550, price: 'Traditional Copper & Sarees' }, // Tulshibaug
  'shop-3': { lat: 18.5155, lng: 73.8535, price: 'Yeola Paithani & PNG Gold' }, // Laxmi Road
  'shop-4': { lat: 18.5620, lng: 73.9165, price: 'Lifestyle Mega Sale' }, // Phoenix Marketcity
  'shop-5': { lat: 18.5180, lng: 73.9310, price: '15 Screen Cinepolis Mall' }, // Seasons Mall
  'shop-6': { lat: 18.5240, lng: 73.8415, price: 'College Streetwear @ ₹199+' }, // FC Road
  'shop-7': { lat: 18.5170, lng: 73.8410, price: 'Gadgets & Accessories @ ₹50+' }, // Hong Kong Lane
  'shop-8': { lat: 18.5130, lng: 73.8515, price: 'Mango Mastani @ ₹140' }, // Sujata Mastani

  // Cars
  'car-1': { lat: 18.5365, lng: 73.8300, price: 'Nexon EV Festive Exchange' }, // Tata Motors
  'car-2': { lat: 18.5590, lng: 73.7820, price: 'Thar ROXX & XUV700 Demo' }, // Mahindra Baner
  'car-3': { lat: 18.5350, lng: 73.8500, price: 'Creta & Venue IT Rebate' }, // Hyundai
  'car-4': { lat: 18.5020, lng: 73.8570, price: 'Swift & Brezza CNG Offers' }, // Maruti Swargate
  'car-5': { lat: 18.5980, lng: 73.7620, price: 'Innova Hycross Strong Hybrid' }, // Toyota Wakad
  'car-6': { lat: 18.5580, lng: 73.8050, price: 'Seltos & Sonet Test Drive' }, // Kia Aundh
  'car-7': { lat: 18.5160, lng: 73.8390, price: 'City & Elevate Honda Sensing' }, // Honda Deccan
  'car-8': { lat: 18.5230, lng: 73.8410, price: 'Ather 450X Test Rides' }, // Ather FC Road

  // Emergency
  'emergency-1': { lat: 18.5220, lng: 73.8760, price: 'Toll-Free 24x7 112' }, // Police 112
  'emergency-2': { lat: 18.5040, lng: 73.8640, price: 'Fire Rescue 101' }, // Fire Brigade Bhavani Peth
  'emergency-3': { lat: 18.5310, lng: 73.8740, price: 'Free 108 Ambulance' }, // 108 Ambulance
  'emergency-4': { lat: 18.5270, lng: 73.8720, price: 'Govt Level-1 Trauma' }, // Sassoon Casualty
  'emergency-5': { lat: 18.5045, lng: 73.8520, price: '24x7 Blood Helpline' }, // Janakalyan Blood Bank
  'emergency-6': { lat: 18.5285, lng: 73.8525, price: 'Disaster Cell 020 2550 1269' }, // Disaster Cell
  'emergency-7': { lat: 18.5190, lng: 73.7850, price: 'Animal Helpline 98909 99111' }, // RESQ Bavdhan
  'emergency-8': { lat: 18.5225, lng: 73.8765, price: 'Women Helpline 1091' }, // Nirbhaya Squad
};
