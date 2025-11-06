'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useParams } from 'next/navigation';

interface PersonalityData {
  type: string;
  title: string;
  description: string;
  markdown: string;
}

export default function ResultPage() {
  const t = useTranslations();
  const locale = useLocale();
  const params = useParams();
  const type = params.type as string;

  const [personality, setPersonality] = useState<PersonalityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonality = async () => {
      try {
        const response = await fetch(`/api/personality/${type}?lang=${locale}`);
        if (response.ok) {
          const data = await response.json();
          setPersonality(data);
        } else {
          setError('Personality type not found');
        }
      } catch (err) {
        setError('Failed to load personality data');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonality();
  }, [type, locale]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !personality) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error || t('common.error')}</p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
          >
            {t('common.retry')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl font-bold text-blue-600 mb-4">{personality.type}</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('result.title')} {personality.type}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {personality.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href={`/personality/${personality.type}`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 text-lg"
          >
            {t('result.viewFullProfile')}
          </Link>
          <Link
            href="/test"
            className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-semibold py-3 px-8 rounded-full transition duration-300 text-lg"
          >
            {t('result.retakeTest')}
          </Link>
        </div>

        {/* Personality Summary Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {personality.title}
            </h2>
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: personality.markdown
                  .replace(/^##\s+/gm, '<h2 class="text-xl font-bold mt-6 mb-3">')
                  .replace(/^#\s+/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n/g, '<br />')
              }}
            />
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {t('result.shareResult')}
          </h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `My MBTI type is ${personality.type}!`,
                    text: `I just discovered that my MBTI personality type is ${personality.type}. Take the test to find out yours!`,
                    url: window.location.href
                  });
                }
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
            >
              Share
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium transition duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}