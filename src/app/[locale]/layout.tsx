import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import { Metadata } from 'next/types';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MBTI Personality Test",
  description: "Discover your personality type with MBTI assessment",
};

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();
  const t = await getTranslations();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* Navigation Bar */}
          <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Link href="/" className="text-2xl font-bold text-blue-600">
                    {t('site.logo')}
                  </Link>
                </div>
                <div className="flex items-center space-x-6">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors hidden md:block"
                  >
                    {t('nav.home')}
                  </Link>
                  <Link
                    href="/test"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors hidden md:block"
                  >
                    {t('nav.test')}
                  </Link>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </nav>

          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
