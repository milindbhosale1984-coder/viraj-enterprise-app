import React, { useState } from 'react';
import {
  MessageSquare,
  Heart,
  Share2,
  MapPin,
  Sparkles,
  Camera,
  Send,
  AlertTriangle,
  Car,
  Vote,
  Calendar,
  Newspaper,
  CheckCircle,
  PlusCircle,
  X,
} from 'lucide-react';
import { Language } from '../data/translations';
import { INITIAL_PULSE_POSTS } from '../data/punePulseData';
import { PunePulsePost } from '../types';

interface PunePulseFeedViewProps {
  language: Language;
}

export const PunePulseFeedView: React.FC<PunePulseFeedViewProps> = ({ language }) => {
  const [posts, setPosts] = useState<PunePulsePost[]>(() => {
    try {
      const saved = localStorage.getItem('pune_pulse_posts');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PULSE_POSTS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // New Post Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState<'traffic' | 'accident' | 'election' | 'events' | 'batmya'>('traffic');
  const [newImagePreview, setNewImagePreview] = useState<string>('');

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      })
    );
  };

  const handleShare = (post: PunePulsePost) => {
    const text = `पुणे पल्स बातमी: ${post.titleMr || post.title}\nस्थान: ${post.locationMr || post.location}\n${post.contentMr || post.content}`;
    if (navigator.share) {
      navigator.share({ title: post.title, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(language === 'mr' ? 'बातमी कॉपी झाली!' : 'Post copied to clipboard!');
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: PunePulsePost = {
      id: `pulse-${Date.now()}`,
      author: language === 'mr' ? 'पुणेकर नागरिक (Citizen Report)' : 'Citizen Journalist',
      authorBadge: 'Verified Citizen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      category: newCategory,
      title: newTitle,
      titleMr: newTitle,
      content: newContent,
      contentMr: newContent,
      location: newLocation || 'Pune',
      locationMr: newLocation || 'पुणे',
      timestamp: 'आत्ताच (Just now)',
      likes: 1,
      commentsCount: 0,
      imageUrl:
        newImagePreview ||
        'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80',
      verified: true,
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    try {
      localStorage.setItem('pune_pulse_posts', JSON.stringify(updated));
    } catch {}

    setIsReportModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewLocation('');
    setNewImagePreview('');
  };

  const filteredPosts = posts.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'traffic':
        return <Car className="w-3.5 h-3.5 text-amber-500" />;
      case 'accident':
        return <AlertTriangle className="w-3.5 h-3.5 text-red-500" />;
      case 'election':
        return <Vote className="w-3.5 h-3.5 text-purple-500" />;
      case 'events':
        return <Calendar className="w-3.5 h-3.5 text-pink-500" />;
      default:
        return <Newspaper className="w-3.5 h-3.5 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'पुणे पल्स - थेट नागरी फीड' : 'Pune Pulse - Live Citizen Feed'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
            {language === 'mr' ? 'पुण्यातील ताजी खलबतं, ट्रॅफिक व बातम्या' : 'Pune City Live Feed (Twitter Style)'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            {language === 'mr'
              ? 'ट्रॅफिक जाम, अपघात, निवडणूक, उत्सव व पुणेकरांचे थेट ग्राऊंड रिपोर्ट्स'
              : 'Traffic jams, accidents, elections, civic events & real-time ground updates from citizens'}
          </p>
        </div>

        {/* Report News Button */}
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="inline-flex items-center gap-2 py-2.5 px-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-orange-600/20 transition-all cursor-pointer shrink-0"
        >
          <Camera className="w-4 h-4" />
          <span>{language === 'mr' ? 'बातमी / अलर्ट नोंदवा' : 'Report News / Alert'}</span>
        </button>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'all', labelMr: 'सर्व अपडेट्स', labelEn: 'All Feed' },
          { id: 'traffic', labelMr: 'ट्रॅफिक जाम', labelEn: 'Traffic' },
          { id: 'batmya', labelMr: 'बातम्या (News)', labelEn: 'City News' },
          { id: 'events', labelMr: 'उत्सव व संस्कृती', labelEn: 'Events' },
          { id: 'election', labelMr: 'निवडणूक / मनपा', labelEn: 'Election' },
          { id: 'accident', labelMr: 'आपत्कालीन', labelEn: 'Accidents' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            {language === 'mr' ? tab.labelMr : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Feed Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs hover:border-orange-300 dark:hover:border-stone-700 transition-all"
          >
            {/* Author row */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200 dark:border-stone-700 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
                      {post.author}
                    </span>
                    {post.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-current" />
                    )}
                  </div>
                  <span className="text-[11px] text-stone-400 font-medium">
                    {post.timestamp}
                  </span>
                </div>
              </div>

              {/* Category Badge */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-[11px] font-bold text-stone-700 dark:text-stone-300">
                {getCategoryIcon(post.category)}
                <span className="capitalize">{post.category}</span>
              </div>
            </div>

            {/* Post Content */}
            <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100 mb-1.5 leading-snug">
              {language === 'mr' ? post.titleMr || post.title : post.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
              {language === 'mr' ? post.contentMr || post.content : post.content}
            </p>

            {/* Location Pill */}
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg mb-3">
              <MapPin className="w-3 h-3" />
              <span>{language === 'mr' ? post.locationMr || post.location : post.location}</span>
            </div>

            {/* Optional Attached Photo */}
            {post.imageUrl && (
              <div className="rounded-2xl overflow-hidden mb-3 max-h-72 bg-stone-100 dark:bg-stone-800">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Interaction Bar: Likes, Comments, Share */}
            <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 font-semibold">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1.5 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4 hover:fill-rose-500" />
                <span>{post.likes}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-stone-400" />
                <span>{post.commentsCount} {language === 'mr' ? 'प्रतिक्रिया' : 'comments'}</span>
              </div>

              <button
                onClick={() => handleShare(post)}
                className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{language === 'mr' ? 'शेअर' : 'Share'}</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Report News / Create Post Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-lg text-stone-900 dark:text-stone-100">
                {language === 'mr' ? 'पुणे पल्सवर बातमी किंवा अलर्ट नोंदवा' : 'Publish to Pune Pulse'}
              </h3>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3.5">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'mr' ? 'कॅटेगरी निवडा:' : 'Select Category:'}
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-semibold"
                >
                  <option value="traffic">ट्रॅफिक जाम (Traffic Jam Alert)</option>
                  <option value="accident">अपघात / आपत्कालीन (Accident)</option>
                  <option value="batmya">पुणे शहर बातमी (City News)</option>
                  <option value="events">सांस्कृतिक / उत्सव (Events)</option>
                  <option value="election">निवडणूक / मनपा (Election / Civic)</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'mr' ? 'ठळक बातमी / हेडलाईन:' : 'Headline:'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="उदा. फर्ग्युसन कॉलेज रोडवर वाहतूक कोंडी"
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-semibold"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'mr' ? 'परिसर / चौक (Location):' : 'Location:'}
                </label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="उदा. अलका टॉकीज चौक, डेक्कन"
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-semibold"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'mr' ? 'तपशीलवार माहिती:' : 'Description:'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="नागरिकांसाठी महत्त्वाची माहिती येथे लिहा..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-semibold"
                />
              </div>

              {/* Photo Upload Simulator */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'mr' ? 'फोटो जोडा (Photo Upload):' : 'Add Photo:'}
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setNewImagePreview(
                        'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80'
                      )
                    }
                    className="py-1.5 px-3 rounded-lg bg-stone-100 dark:bg-stone-800 text-[11px] font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-200"
                  >
                    📷 कॅमेरामधून फोटो घ्या
                  </button>
                  {newImagePreview && (
                    <span className="text-[11px] text-emerald-600 font-bold self-center">
                      ✓ फोटो जोडला गेला!
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-700"
                >
                  {language === 'mr' ? 'रद्द करा' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs"
                >
                  {language === 'mr' ? 'पोस्ट करा (Publish)' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
