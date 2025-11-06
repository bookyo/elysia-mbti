import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'terms' });
  const siteT = await getTranslations();

  const baseTitle = siteT('site.title', { defaultValue: 'MBTI Personality Test with AI Advice' });

  const seoData = {
    en: {
      title: 'Terms of Service | MBTI AI Personality Test',
      description: 'Complete terms and conditions for using our MBTI AI personality test service. Learn about your rights, our educational purpose disclaimer, and privacy protection commitments.',
      keywords: 'terms of service, MBTI terms, personality test terms, AI test terms, service terms, educational purpose, legal terms, disclaimer, user agreement'
    },
    zh: {
      title: '服务条款 | MBTI AI人格测试',
      description: '我们MBTI AI人格测试服务的完整服务条款。了解您的权利、教育目的免责声明和隐私保护承诺。',
      keywords: '服务条款, MBTI条款, 人格测试条款, AI测试条款, 服务条款, 教育目的, 法律条款, 免责声明, 用户协议'
    },
    de: {
      title: 'Nutzungsbedingungen | MBTI KI-Persönlichkeitstest',
      description: 'Vollständige Nutzungsbedingungen für unseren MBTI KI-Persönlichkeitstest-Service. Erfahren Sie über Ihre Rechte, unseren Bildungszweck-Verzicht und unsere Datenschutzverpflichtungen.',
      keywords: 'Nutzungsbedingungen, MBTI Bedingungen, Persönlichkeitstest Bedingungen, KI Test Bedingungen, Servicebedingungen, Bildungszweck, rechtliche Bedingungen, Haftungsausschluss, Nutzervertrag'
    },
    es: {
      title: 'Términos de Servicio | Test de Personalidad MBTI IA',
      description: 'Términos y condiciones completos para usar nuestro servicio de test de personalidad MBTI IA. Conoce tus derechos, nuestra exención de propósito educativo y compromisos de privacidad.',
      keywords: 'términos de servicio, términos MBTI, términos test personalidad, términos test IA, términos del servicio, propósito educativo, términos legales, exención de responsabilidad, acuerdo de usuario'
    },
    fr: {
      title: 'Conditions d\'Utilisation | Test de Personnalité MBTI IA',
      description: 'Conditions d\'utilisation complètes pour notre service de test de personnalité MBTI IA. Découvrez vos droits, notre clause d\'exonération à des fins éducatives et nos engagements de confidentialité.',
      keywords: 'conditions d\'utilisation, conditions MBTI, conditions test personnalité, conditions test IA, conditions du service, but éducatif, conditions légales, clause de non-responsabilité, accord utilisateur'
    },
    pt: {
      title: 'Termos de Serviço | Teste de Personalidade MBTI IA',
      description: 'Termos e condições completos para usar nosso serviço de teste de personalidade MBTI IA. Conheça seus direitos, nossa isenção de propósito educacional e compromissos de privacidade.',
      keywords: 'termos de serviço, termos MBTI, termos teste personalidade, termos teste IA, termos do serviço, propósito educacional, termos legais, isenção de responsabilidade, acordo do usuário'
    },
    ru: {
      title: 'Условия Использования | Тест Личности MBTI ИИ',
      description: 'Полные условия использования нашего сервиса теста личности MBTI ИИ. Узнайте о ваших правах, нашем отказе от ответственности за образовательные цели и обязательствах по конфиденциальности.',
      keywords: 'условия использования, условия MBTI, условия теста личности, условия теста ИИ, условия сервиса, образовательная цель, юридические условия, отказ от ответственности, пользовательское соглашение'
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
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/${locale}/terms`,
      siteName: baseTitle,
      images: [
        {
          url: '/og-image-terms.jpg',
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/og-image-terms.jpg'],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/${locale}/terms`,
      languages: {
        'en': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/en/terms`,
        'zh': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/zh/terms`,
        'de': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/de/terms`,
        'es': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/es/terms`,
        'fr': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/fr/terms`,
        'pt': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/pt/terms`,
        'ru': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/ru/terms`,
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

export default async function TermsPage({ params }: TermsPageProps) {
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
              {t('terms.title', { defaultValue: 'Terms of Service' })}
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
              <strong>{t('terms.lastUpdated', { defaultValue: 'Last Updated' })}:</strong> {new Date().toLocaleDateString(locale, { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            {/* 接受条款 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.acceptance.title', { defaultValue: 'Acceptance of Terms' })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('terms.acceptance.content', { 
                  defaultValue: 'By accessing and using ElysiaTools MBTI personality test service, you accept and agree to be bound by the terms and provision of this agreement.' 
                })}
              </p>
            </section>

            {/* 服务描述 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.service.title', { defaultValue: 'Service Description' })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('terms.service.content', { 
                  defaultValue: 'ElysiaTools provides a free MBTI personality test service designed to help individuals understand their personality preferences. The test is based on the Myers-Briggs Type Indicator framework and is provided for educational and self-discovery purposes.' 
                })}
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                <p className="text-blue-800 font-medium">
                  {t('terms.service.disclaimer', { 
                    defaultValue: 'This service is provided for entertainment and educational purposes only and should not be used as a substitute for professional psychological assessment.' 
                  })}
                </p>
              </div>
            </section>

            {/* 使用条款 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.usage.title', { defaultValue: 'Terms of Use' })}
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  {t('terms.usage.freeService', { 
                    defaultValue: 'The service is provided free of charge and is available to all users.' 
                  })}
                </li>
                <li>
                  {t('terms.usage.accuracy', { 
                    defaultValue: 'The test results are based on your responses and are meant for personal insight and self-discovery.' 
                  })}
                </li>
                <li>
                  {t('terms.usage.noProfessional', { 
                    defaultValue: 'This test is not a professional psychological evaluation and should not be used for clinical, employment, or other important decisions.' 
                  })}
                </li>
                <li>
                  {t('terms.usage.responsibility', { 
                    defaultValue: 'You are responsible for how you interpret and use the test results.' 
                  })}
                </li>
              </ul>
            </section>

            {/* 隐私保护 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.privacy.title', { defaultValue: 'Privacy Protection' })}
              </h2>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="text-green-800 font-medium">
                  {t('terms.privacy.noData', { 
                    defaultValue: 'We do not collect, store, or share any personal information or test data.' 
                  })}
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t('terms.privacy.content', { 
                  defaultValue: 'Your privacy is completely protected. The MBTI test processes all responses locally in your browser. No personal data, test responses, or results are transmitted to our servers or stored in our databases.' 
                })}
              </p>
            </section>

            {/* 免责声明 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.disclaimer.title', { defaultValue: 'Disclaimer' })}
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-800 font-medium mb-2">
                  {t('terms.disclaimer.important', { 
                    defaultValue: 'Important Notice' 
                  })}
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
                <li>
                  {t('terms.disclaimer.educationalOnly', { 
                    defaultValue: 'This MBTI test is for educational and entertainment purposes only.' 
                  })}
                </li>
                <li>
                  {t('terms.disclaimer.notProfessional', { 
                    defaultValue: 'It is not a substitute for professional psychological assessment or advice.' 
                  })}
                </li>
                <li>
                  {t('terms.disclaimer.noGuarantee', { 
                    defaultValue: 'We do not guarantee the accuracy or reliability of the test results.' 
                  })}
                </li>
                <li>
                  {t('terms.disclaimer.importantDecisions', { 
                    defaultValue: 'Do not make important life decisions based solely on these test results.' 
                  })}
                </li>
              </ul>
            </section>

            {/* 知识产权 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.intellectual.title', { defaultValue: 'Intellectual Property' })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('terms.intellectual.content', { 
                  defaultValue: 'The content, design, and functionality of this service are owned by ElysiaTools and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our explicit permission.' 
                })}
              </p>
            </section>

            {/* 限制责任 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.liability.title', { defaultValue: 'Limitation of Liability' })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('terms.liability.content', { 
                  defaultValue: 'To the maximum extent permitted by law, ElysiaTools shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of this service.' 
                })}
              </p>
            </section>

            {/* 服务变更 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.changes.title', { defaultValue: 'Service Changes' })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('terms.changes.content', { 
                  defaultValue: 'We reserve the right to modify, suspend, or discontinue the service at any time without prior notice. We are not liable to you or any third party for any modification, suspension, or discontinuation of the service.' 
                })}
              </p>
            </section>

            {/* 联系信息 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.contact.title', { defaultValue: 'Contact Us' })}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('terms.contact.content', { 
                  defaultValue: 'If you have any questions about these Terms of Service, please contact us:' 
                })}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900">
                  <strong>{t('terms.contact.email', { defaultValue: 'Email' })}:</strong>{' '}
                  <a href="mailto:admin@elysiatools.com" className="text-blue-600 hover:text-blue-800">
                    admin@elysiatools.com
                  </a>
                </p>
              </div>
            </section>

            {/* 条款变更 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.modification.title', { defaultValue: 'Modification of Terms' })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('terms.modification.content', { 
                  defaultValue: 'We may revise these terms of service at any time without notice. By using this service, you are agreeing to be bound by the then-current version of these terms of service.' 
                })}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}