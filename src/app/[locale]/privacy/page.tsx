import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy' });
  const siteT = await getTranslations();

  const baseTitle = siteT('site.title', { defaultValue: 'MBTI Personality Test with AI Advice' });

  const seoData = {
    en: {
      title: 'Privacy Policy | MBTI AI Personality Test',
      description: 'Our comprehensive privacy policy for the MBTI AI personality test. Learn how we protect your data, ensure complete anonymity, and never store personal information.',
      keywords: 'privacy policy, MBTI privacy, personality test privacy, data protection, anonymous testing, AI privacy, no data collection, personal data protection'
    },
    zh: {
      title: '隐私政策 | MBTI AI人格测试',
      description: '我们MBTI AI人格测试的全面隐私政策。了解我们如何保护您的数据，确保完全匿名，从不存储个人信息。',
      keywords: '隐私政策, MBTI隐私, 人格测试隐私, 数据保护, 匿名测试, AI隐私, 不收集数据, 个人数据保护'
    },
    de: {
      title: 'Datenschutzerklärung | MBTI KI-Persönlichkeitstest',
      description: 'Unsere umfassende Datenschutzerklärung für den MBTI KI-Persönlichkeitstest. Erfahren Sie, wie wir Ihre Daten schützen, völlige Anonymität gewährleisten und niemals persönliche Informationen speichern.',
      keywords: 'Datenschutzerklärung, MBTI Datenschutz, Persönlichkeitstest Datenschutz, Datenschutz, anonymer Test, KI Datenschutz, keine Datensammlung, persönlicher Datenschutz'
    },
    es: {
      title: 'Política de Privacidad | Test de Personalidad MBTI IA',
      description: 'Nuestra política de privacidad integral para el test de personalidad MBTI IA. Aprende cómo protegemos tus datos, garantizamos anonimato completo y nunca almacenamos información personal.',
      keywords: 'política de privacidad, privacidad MBTI, privacidad test personalidad, protección de datos, prueba anónima, privacidad IA, sin recopilación de datos, protección datos personales'
    },
    fr: {
      title: 'Politique de Confidentialité | Test de Personnalité MBTI IA',
      description: 'Notre politique de confidentialité complète pour le test de personnalité MBTI IA. Découvrez comment nous protégeons vos données, garantissons un anonymat complet et ne stockons jamais d\'informations personnelles.',
      keywords: 'politique de confidentialité, confidentialité MBTI, confidentialité test personnalité, protection des données, test anonyme, confidentialité IA, aucune collecte de données, protection données personnels'
    },
    pt: {
      title: 'Política de Privacidade | Teste de Personalidade MBTI IA',
      description: 'Nossa política de privacidade abrangente para o teste de personalidade MBTI IA. Saiba como protegemos seus dados, garantimos anonimato completo e nunca armazenamos informações pessoais.',
      keywords: 'política de privacidade, privacidade MBTI, privacidade teste personalidade, proteção de dados, teste anônimo, privacidade IA, sem coleta de dados, proteção dados pessoais'
    },
    ru: {
      title: 'Политика Конфиденциальности | Тест Личности MBTI ИИ',
      description: 'Наша комплексная политика конфиденциальности для теста личности MBTI ИИ. Узнайте, как мы защищаем ваши данные, обеспечиваем полную анонимность и никогда не храним личную информацию.',
      keywords: 'политика конфиденциальности, конфиденциальность MBTI, конфиденциальность теста личности, защита данных, анонимный тест, конфиденциальность ИИ, без сбора данных, защита личных данных'
    }
  };

  const seo = seoData[locale as keyof typeof seoData] || seoData.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      locale: locale,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/${locale}/privacy`,
      siteName: baseTitle,
      images: [
        {
          url: '/og-image.png',
          width: 630,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/${locale}/privacy`,
      languages: {
        'en': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/en/privacy`,
        'zh': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/zh/privacy`,
        'de': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/de/privacy`,
        'es': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/es/privacy`,
        'fr': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/fr/privacy`,
        'pt': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/pt/privacy`,
        'ru': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/ru/privacy`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium transition duration-300"
            >
              ← {t('nav.home')}
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('privacy.title', { defaultValue: 'Privacy Policy' })}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg prose-gray max-w-none">

            {/* 最后更新 */}
            <p className="text-gray-600 italic mb-8">
              <strong>{t('privacy.lastUpdated', { defaultValue: 'Last Updated' })}:</strong> {new Date().toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>

            {/* 介绍 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.introduction.title', { defaultValue: 'Introduction' })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('privacy.introduction.content', {
                  defaultValue: 'At ElysiaTools, we are committed to protecting your privacy. This Privacy Policy explains how we handle data when you use our MBTI personality test service.'
                })}
              </p>
            </section>

            {/* 数据收集 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.dataCollection.title', { defaultValue: 'Data Collection' })}
              </h2>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="text-green-800 font-medium">
                  {t('privacy.dataCollection.noData', {
                    defaultValue: 'We do not collect any personal information or store any user data.'
                  })}
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t('privacy.dataCollection.content', {
                  defaultValue: 'Our MBTI test is completely anonymous. We do not require registration, email addresses, names, or any other personal information. Your test responses are processed locally in your browser and are not transmitted to our servers.'
                })}
              </p>
            </section>

            {/* 数据使用 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.dataUsage.title', { defaultValue: 'How We Use Data' })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('privacy.dataUsage.content', {
                  defaultValue: 'Since we do not collect any personal data, we do not use your information for any purpose. The MBTI test results are generated locally in your browser and are not stored or transmitted anywhere.'
                })}
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.cookies.title', { defaultValue: 'Cookies' })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('privacy.cookies.content', {
                  defaultValue: 'Our website does not use cookies to track or store personal information. The only cookies used are essential for the website to function properly, such as maintaining your language preference.'
                })}
              </p>
            </section>

            {/* 第三方服务 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.thirdParty.title', { defaultValue: 'Third-Party Services' })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('privacy.thirdParty.content', {
                  defaultValue: 'We do not share any information with third parties, as we do not collect any personal data to begin with.'
                })}
              </p>
            </section>

            {/* 数据安全 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.security.title', { defaultValue: 'Data Security' })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('privacy.security.content', {
                  defaultValue: 'Since we do not collect or store any personal data, there is no risk of data breaches. Your privacy and anonymity are completely protected.'
                })}
              </p>
            </section>

            {/* 用户权利 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.rights.title', { defaultValue: 'Your Rights' })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('privacy.rights.content', {
                  defaultValue: 'Since we do not collect any personal data, you do not need to worry about data deletion, modification, or access requests. Your use of our service is completely anonymous.'
                })}
              </p>
            </section>

            {/* 联系信息 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.contact.title', { defaultValue: 'Contact Us' })}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('privacy.contact.content', {
                  defaultValue: 'If you have any questions about this Privacy Policy or our privacy practices, please contact us:'
                })}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900">
                  <strong>{t('privacy.contact.email', { defaultValue: 'Email' })}:</strong>{' '}
                  <a href="mailto:admin@elysiatools.com" className="text-blue-600 hover:text-blue-800">
                    admin@elysiatools.com
                  </a>
                </p>
              </div>
            </section>

            {/* 政策更新 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.changes.title', { defaultValue: 'Changes to This Policy' })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('privacy.changes.content', {
                  defaultValue: 'We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated "Last Updated" date.'
                })}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}