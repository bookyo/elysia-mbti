'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AIAdviceModal from './AIAdviceModal';

interface PersonalityData {
  type: string;
  title: string;
  description: string;
  role: string;
  markdown: string;
}

interface PersonalityPageContentProps {
  personality: PersonalityData;
  locale: string;
  personalityColors: Record<string, string>;
}

export default function PersonalityPageContent({ personality, locale, personalityColors }: PersonalityPageContentProps) {
  const t = useTranslations();
  const [showAIAdvice, setShowAIAdvice] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${personality.type} - ${personality.title}`,
        text: personality.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium transition duration-300"
            >
              ← {t('nav.home')}
            </Link>
            <Link
              href="/test"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
            >
              {t('nav.test')}
            </Link>
          </div>
        </div>
      </div>

      {/* Personality Content */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Type Header */}
        <div className="text-center mb-12">
          {/* Personality Type Badge */}
          <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${personalityColors[personality.type as keyof typeof personalityColors] || 'from-blue-500 to-indigo-500'} text-white text-3xl font-bold rounded-3xl mb-6 shadow-xl transform hover:scale-105 transition-transform duration-300`}>
            {personality.type}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {personality.title}
          </h1>

          {/* Role Badge */}
          {personality.role && (
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-lg font-medium rounded-full mb-6">
              {personality.role}
            </div>
          )}

          {/* Description */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {personality.description}
          </p>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAIAdvice(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 text-lg shadow-lg flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>{t('ai.advice.getAdvice', { defaultValue: 'Get AI Advice' })}</span>
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-10 prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:text-gray-700 prose-li:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:my-6 prose-code:bg-blue-50 prose-code:text-blue-800 prose-code:border prose-code:border-blue-200 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-300 prose-pre:text-gray-800 prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-4 prose-pre:whitespace-pre-wrap">
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
              >
                {personality.markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/test`}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 text-lg shadow-lg"
          >
            {t('result.retakeTest', { defaultValue: 'Retake Test' })}
          </Link>
          <button
            onClick={handleShare}
            className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 hover:border-blue-700 font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 text-lg shadow-md"
          >
            {t('personality.shareProfile', { defaultValue: 'Share Profile' })}
          </button>
        </div>

        {/* Related Personalities */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t('personalities.exploreOtherTypes', { defaultValue: 'Explore Other Personality Types' })}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
              'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP']
              .filter(ptype => ptype !== personality.type)
              .slice(0, 8)
              .map((ptype) => (
                <Link
                  key={ptype}
                  href={`/personality/${ptype}`}
                  className={`group bg-white hover:shadow-lg rounded-2xl p-8 text-center font-bold text-gray-900 hover:text-white transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-transparent ${personalityColors[ptype as keyof typeof personalityColors] || 'from-blue-500 to-indigo-500'} hover:bg-gradient-to-r`}
                >
                  <div className="text-2xl mb-2">{ptype}</div>
                  <div className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t('common.learnMore', { defaultValue: 'Learn More' })}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* AI Advice Modal */}
      <AIAdviceModal
        isOpen={showAIAdvice}
        onClose={() => setShowAIAdvice(false)}
        personalityType={personality.type}
        locale={locale}
      />
    </div>
  );
}