'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 品牌信息 */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              MBTI {t('footer.test', { defaultValue: 'Test' })}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              {t('footer.description', {
                defaultValue: 'Discover your personality type with our scientifically-based MBTI assessment. Free, accurate, and confidential.'
              })}
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a href="mailto:admin@elysiatools.com" className="hover:text-white transition-colors">
                admin@elysiatools.com
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">
              {t('footer.quickLinks', { defaultValue: 'Quick Links' })}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('nav.home', { defaultValue: 'Home' })}
                </Link>
              </li>
              <li>
                <Link
                  href="/test"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('nav.test', { defaultValue: 'MBTI Test' })}
                </Link>
              </li>
              <li>
                <Link
                  href="#personalities"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('personalities.title', { defaultValue: '16 Personality Types' })}
                </Link>
              </li>
            </ul>
          </div>

          {/* 法律信息 */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">
              {t('footer.legal', { defaultValue: 'Legal' })}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.privacy', { defaultValue: 'Privacy Policy' })}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('footer.terms', { defaultValue: 'Terms of Service' })}
                </Link>
              </li>
              <li>
                <Link
                  href="https://elysiatools.com"
                  target='_blank'
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  ElysiaTools
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* 隐私保护声明 */}
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>
                  {t('footer.privacyProtected', {
                    defaultValue: 'Your privacy is protected. We do not collect or store any personal data.'
                  })}
                </span>
              </div>
            </div>

            {/* 版权信息 */}
            <div className="text-sm text-gray-400">
              <p>
                © {new Date().getFullYear()} ElysiaTools. {t('footer.allRightsReserved', { defaultValue: 'All rights reserved.' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}