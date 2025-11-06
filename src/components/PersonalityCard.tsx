'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface PersonalityType {
  type: string;
  title: string;
  description: string;
  role?: string;
}

interface PersonalityCardProps {
  personality: PersonalityType;
  locale: string;
}

// Personality type colors for better visual distinction
const personalityColors = {
  'ENFJ': 'from-pink-500 to-rose-600',
  'ENFP': 'from-yellow-500 to-orange-600', 
  'ENTJ': 'from-red-500 to-pink-600',
  'ENTP': 'from-orange-500 to-red-600',
  'ESFJ': 'from-green-500 to-emerald-600',
  'ESFP': 'from-blue-500 to-cyan-600',
  'ESTJ': 'from-indigo-500 to-purple-600',
  'ESTP': 'from-purple-500 to-pink-600',
  'INFJ': 'from-teal-500 to-cyan-600',
  'INFP': 'from-blue-500 to-indigo-600',
  'INTJ': 'from-gray-600 to-gray-800',
  'INTP': 'from-cyan-500 to-blue-600',
  'ISFJ': 'from-amber-500 to-yellow-600',
  'ISFP': 'from-lime-500 to-green-600',
  'ISTJ': 'from-slate-500 to-gray-700',
  'ISTP': 'from-emerald-500 to-teal-600'
};

export default function PersonalityCard({ personality, locale }: PersonalityCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations();

  return (
    <Link
      href={`/personality/${personality.type}`}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 cursor-pointer transform hover:-translate-y-3 border border-gray-100 hover:border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-center">
        {/* Personality Type Badge */}
        <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${personalityColors[personality.type as keyof typeof personalityColors] || 'from-blue-500 to-indigo-500'} text-white text-2xl font-bold rounded-2xl mb-5 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
          {personality.type}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {personality.title}
        </h3>

        {/* Role (if available) */}
        {personality.role && (
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-3">
            {personality.role}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
          {personality.description}
        </p>

        {/* Learn More Indicator */}
        <div className={`flex items-center justify-center text-blue-600 font-medium text-sm transition-all duration-300 transform ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          {t('common.learnMore', { defaultValue: 'Learn More' })}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}