import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import TestPageClient from './TestPageClient';

interface TestPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TestPageProps): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const baseTitle = t('site.title', { defaultValue: 'MBTI Personality Test with AI Advice' });

  const seoData = {
    en: {
      title: 'Take MBTI Personality Test with AI Advice | Free Assessment',
      description: 'Take our comprehensive MBTI personality test with 70 questions to discover your personality type. Get personalized AI advice for career, relationships, and personal development.',
      keywords: 'MBTI test, personality assessment, personality quiz, Myers-Briggs test, 16 personalities test, AI personality advice, career test, personality analysis, free personality test'
    },
    zh: {
      title: '参加MBTI人格测试与AI建议 | 免费评估',
      description: '参加我们全面的MBTI人格测试，包含70个问题，发现您的性格类型。获得AI驱动的个性化职业、人际关系和个人发展建议。',
      keywords: 'MBTI测试,性格评估,性格测验,迈尔斯-布里格斯测试,16种人格测试,AI性格建议,职业测试,性格分析,免费性格测试'
    },
    de: {
      title: 'MBTI-Persönlichkeitstest mit KI-Beratung | Kostenlose Bewertung',
      description: 'Machen Sie unseren umfassenden MBTI-Persönlichkeitstest mit 70 Fragen, um Ihren Persönlichkeitstyp zu entdecken. Erhalten Sie personalisierte KI-Ratschläge für Karriere, Beziehungen und persönliche Entwicklung.',
      keywords: 'MBTI Test, Persönlichkeitsbewertung, Persönlichkeitsquiz, Myers-Briggs Test, 16 Persönlichkeiten Test, KI Persönlichkeitsberatung, Karrieretest, Persönlichkeitsanalyse, kostenloser Persönlichkeitstest'
    },
    es: {
      title: 'Realiza Test de Personalidad MBTI con Consejos IA | Evaluación Gratuita',
      description: 'Realiza nuestro test de personalidad MBTI completo con 70 preguntas para descubrir tu tipo de personalidad. Obtén consejos personalizados con IA para carrera, relaciones y desarrollo personal.',
      keywords: 'Test MBTI, evaluación de personalidad, quiz de personalidad, test Myers-Briggs, test 16 personalidades, consejos IA personalidad, test de carrera, análisis de personalidad, test de personalidad gratuito'
    },
    fr: {
      title: 'Passez le Test de Personnalité MBTI avec Conseils IA | Évaluation Gratuite',
      description: 'Passez notre test de personnalité MBTI complet avec 70 questions pour découvrir votre type de personnalité. Obtenez des conseils personnalisés par IA pour carrière, relations et développement personnel.',
      keywords: 'Test MBTI, évaluation de personnalité, quiz de personnalité, test Myers-Briggs, test 16 personnalités, conseils IA personnalité, test de carrière, analyse de personnalité, test de personnalité gratuit'
    },
    pt: {
      title: 'Faça Teste de Personalidade MBTI com Conselhos IA | Avaliação Gratuita',
      description: 'Faça nosso teste de personalidade MBTI completo com 70 perguntas para descobrir seu tipo de personalidade. Obtenha conselhos personalizados com IA para carreira, relacionamentos e desenvolvimento pessoal.',
      keywords: 'Teste MBTI, avaliação de personalidade, quiz de personalidade, test Myers-Briggs, teste 16 personalidades, conselhos IA personalidade, teste de carreira, análise de personalidade, teste de personalidade gratuito'
    },
    ru: {
      title: 'Пройдите Тест Личности MBTI с ИИ-Советами | Бесплатная Оценка',
      description: 'Пройдите наш комплексный тест личности MBTI с 70 вопросами, чтобы открыть свой тип личности. Получите персонализированные советы от ИИ по карьере, отношениям и личностному развитию.',
      keywords: 'Тест MBTI, оценка личности, квиз личности, тест Майерс-Бриггс, тест 16 личностей, ИИ-советы личности, тест карьеры, анализ личности, бесплатный тест личности'
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
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/${locale}/test`,
      siteName: baseTitle,
      images: [
        {
          url: '/og-image.png',
          width: 600,
          height: 600,
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
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/${locale}/test`,
      languages: {
        'en': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/en/test`,
        'zh': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/zh/test`,
        'de': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/de/test`,
        'es': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/es/test`,
        'fr': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/fr/test`,
        'pt': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/pt/test`,
        'ru': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/ru/test`,
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

export default async function TestPage({ params }: TestPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TestPageClient locale={locale} />;
}