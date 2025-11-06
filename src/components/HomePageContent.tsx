'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import PersonalityCard from './PersonalityCard';
import Footer from './Footer';

interface PersonalityType {
  type: string;
  title: string;
  description: string;
  role?: string;
}

interface HomePageContentProps {
  locale: string;
  personalities: PersonalityType[];
  error: string | null;
}

export default function HomePageContent({ locale, personalities, error }: HomePageContentProps) {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [localPersonalities, setLocalPersonalities] = useState(personalities);

  // 如果服务器端数据加载失败，客户端重试
  useEffect(() => {
    if (error && localPersonalities.length === 0) {
      const retryFetch = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/${locale}/api/api/personalities?lang=${locale}`);
          if (response.ok) {
            const data = await response.json();
            setLocalPersonalities(data);
            console.log(`✅ Client-side loaded ${data.length} personalities for locale: ${locale}`);
          }
        } catch (err) {
          console.error('Retry failed:', err);
        } finally {
          setLoading(false);
        }
      };
      retryFetch();
    }
  }, [error, localPersonalities.length, locale]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">
            {t('common.loading', { defaultValue: 'Loading personality types...' })}
          </p>
        </div>
      </div>
    );
  }

  if (error && localPersonalities.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-xl text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
          >
            {t('common.retry', { defaultValue: 'Retry' })}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
              {t('hero.title', { defaultValue: 'MBTI Personality Test' })}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle', { defaultValue: 'Discover your personality type and unlock your potential' })}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/test"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 text-lg shadow-lg"
              >
                {t('hero.startTest', { defaultValue: 'Start Test' })}
              </Link>
              <Link
                href="#personalities"
                className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 text-lg shadow-md"
              >
                {t('hero.learnMore', { defaultValue: 'Learn More' })}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Personalities Cards Section */}
      <section id="personalities" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('personalities.title', { defaultValue: '16 Personality Types' })}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('personalities.subtitle', { defaultValue: 'Explore the 16 MBTI personality types and discover yours' })}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {localPersonalities.map((personality) => (
              <PersonalityCard
                key={personality.type}
                personality={personality}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}