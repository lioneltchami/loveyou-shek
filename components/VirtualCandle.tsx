"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot, getCountFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useLanguage } from '@/contexts/LanguageContext';

interface Candle {
  id: string;
  name?: string;
  litAt: any;
}

export default function VirtualCandle() {
  const { t, language } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [isLighting, setIsLighting] = useState(false);
  const [totalCandles, setTotalCandles] = useState(0);
  const [recentCandles, setRecentCandles] = useState<Candle[]>([]);
  const [justLit, setJustLit] = useState(false);

  // Fetch total candles count and recent candles
  useEffect(() => {
    const candlesRef = collection(db, 'candles');

    // Get total count
    getCountFromServer(candlesRef).then(snapshot => {
      setTotalCandles(snapshot.data().count);
    }).catch(error => {
      console.error('Error getting candle count:', error);
    });

    // Listen to recent candles
    const recentQuery = query(
      candlesRef,
      orderBy('litAt', 'desc'),
      limit(12)
    );

    const unsubscribe = onSnapshot(recentQuery, (snapshot) => {
      const candles: Candle[] = [];
      snapshot.forEach((doc) => {
        candles.push({ id: doc.id, ...doc.data() } as Candle);
      });
      setRecentCandles(candles);

      // Update count in real-time
      getCountFromServer(candlesRef).then(countSnapshot => {
        setTotalCandles(countSnapshot.data().count);
      });
    }, (error) => {
      console.error('Error fetching recent candles:', error);
    });

    return () => unsubscribe();
  }, []);

  const handleLightCandle = async () => {
    setIsLighting(true);
    try {
      await addDoc(collection(db, 'candles'), {
        name: visitorName.trim() || null,
        litAt: serverTimestamp(),
      });

      // Success animation
      setJustLit(true);
      setTimeout(() => setJustLit(false), 3000);

      setShowModal(false);
      setVisitorName('');
    } catch (error: any) {
      console.error('Error lighting candle:', error);

      // Show detailed error for debugging
      const errorMessage = error?.message || 'Unknown error';
      const detailedMsg = language === 'fr'
        ? `Erreur: ${errorMessage}\n\nVérifiez les règles de sécurité Firestore.`
        : `Error: ${errorMessage}\n\nCheck Firestore security rules.`;

      alert(detailedMsg);
    } finally {
      setIsLighting(false);
    }
  };

  const formatDate = (timestamp: any): string => {
    if (!timestamp) return language === 'fr' ? 'À l\'instant' : 'Just now';
    try {
      const date = timestamp.toDate();
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (minutes < 1) return language === 'fr' ? 'À l\'instant' : 'Just now';
      if (minutes < 60) return language === 'fr' ? `Il y a ${minutes} min` : `${minutes} min ago`;
      if (hours < 24) return language === 'fr' ? `Il y a ${hours}h` : `${hours}h ago`;
      if (days === 1) return language === 'fr' ? 'Hier' : 'Yesterday';
      if (days < 7) return language === 'fr' ? `Il y a ${days} jours` : `${days} days ago`;

      return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return language === 'fr' ? 'À l\'instant' : 'Just now';
    }
  };

  return (
    <section
      id="candles"
      className="py-20 bg-gradient-to-b from-white to-[#f5f3f0] relative overflow-hidden"
      aria-labelledby="candles-heading"
    >
      {/* Success Animation Overlay */}
      {justLit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white/95 rounded-full p-8 shadow-2xl animate-scale-up">
            <div className="text-6xl animate-bounce">🕯️</div>
            <p className="text-xl font-semibold text-[#8b7355] mt-4 text-center">
              {language === 'fr' ? 'Bougie allumée' : 'Candle lit'}
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <h2 id="candles-heading" className="text-4xl font-bold text-center mb-4 text-[#8b7355]">
          {language === 'fr' ? 'Allumez une Bougie' : 'Light a Candle'}
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {language === 'fr'
            ? 'Allumez une bougie virtuelle en mémoire de Joëlle. Chaque flamme représente l\'amour et les souvenirs partagés.'
            : 'Light a virtual candle in memory of Joëlle. Each flame represents the love and memories shared.'}
        </p>

        {/* Candle Counter */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-8 py-4 shadow-lg">
            <span className="text-4xl">🕯️</span>
            <p className="text-3xl font-bold text-[#8b7355]">{totalCandles.toLocaleString()}</p>
          </div>
        </div>

        {/* Light Candle Button */}
        <div className="text-center mb-16">
          <button
            onClick={() => setShowModal(true)}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#8b7355] to-[#6f5a43] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="text-2xl group-hover:animate-pulse">🕯️</span>
            {language === 'fr' ? 'Allumer une Bougie' : 'Light a Candle'}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Recently Lit Candles */}
        {recentCandles.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
              {language === 'fr' ? 'Bougies Récemment Allumées' : 'Recently Lit Candles'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recentCandles.map((candle) => (
                <div
                  key={candle.id}
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
                >
                  <div className="text-3xl mb-2 animate-flicker">🕯️</div>
                  <p className="text-sm font-semibold text-gray-800 text-center truncate w-full">
                    {candle.name || (language === 'fr' ? 'Anonyme' : 'Anonymous')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(candle.litAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => !isLighting && setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 animate-flicker">🕯️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {language === 'fr' ? 'Allumer une Bougie' : 'Light a Candle'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'fr'
                  ? 'En mémoire de Joëlle Shekinah Tchami'
                  : 'In memory of Joëlle Shekinah Tchami'}
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="candle-name" className="block text-gray-700 font-medium mb-2 text-sm">
                {language === 'fr' ? 'Votre nom (optionnel)' : 'Your name (optional)'}
              </label>
              <input
                type="text"
                id="candle-name"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition-all"
                placeholder={language === 'fr' ? 'Votre nom' : 'Your name'}
                maxLength={50}
                disabled={isLighting}
              />
              <p className="text-xs text-gray-500 mt-1">
                {language === 'fr'
                  ? 'Laissez vide pour rester anonyme'
                  : 'Leave blank to remain anonymous'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={isLighting}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {language === 'fr' ? 'Annuler' : 'Cancel'}
              </button>
              <button
                onClick={handleLightCandle}
                disabled={isLighting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#8b7355] to-[#6f5a43] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                {isLighting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === 'fr' ? 'Allumage...' : 'Lighting...'}
                  </>
                ) : (
                  <>
                    <span>🕯️</span>
                    {language === 'fr' ? 'Allumer' : 'Light Candle'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(-2px); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scale-up {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-flicker {
          animation: flicker 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-scale-up {
          animation: scale-up 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}
