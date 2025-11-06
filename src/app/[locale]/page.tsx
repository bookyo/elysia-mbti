import { setRequestLocale, getTranslations } from 'next-intl/server';
import { connectToDatabase } from '@/lib/mongodb';
import Personality from '@/lib/models/Personality';
import HomePageContent from '@/components/HomePageContent';
import { Metadata } from 'next';

interface PersonalityType {
  type: string;
  title: string;
  description: string;
  role?: string;
}

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const baseTitle = t('site.title', { defaultValue: 'MBTI Personality Test with AI Advice' });
  const baseDescription = t('site.description', { defaultValue: 'Discover your personality type with MBTI assessment and get personalized AI-powered advice for career, relationships, and personal growth' });

  const seoData = {
    en: {
      title: 'Free MBTI Personality Test with AI Advice | Discover Your Type',
      description: 'Take our free MBTI personality test and get personalized AI-powered advice for career, relationships, and personal growth. Discover your personality type in just 5 minutes.',
      keywords: 'MBTI test, personality test, free personality quiz, Myers-Briggs, personality types, AI advice, career guidance, personality assessment, 16 personalities, personal development'
    },
    zh: {
      title: '免费MBTI人格测试与AI建议 | 发现您的性格类型',
      description: '参加我们免费的MBTI人格测试，获得AI驱动的个性化职业、人际关系和个人成长建议。只需5分钟即可发现您的性格类型。',
      keywords: 'MBTI测试,人格测试,免费性格测验,迈尔斯-布里格斯,性格类型,AI建议,职业指导,性格评估,16种人格,个人发展'
    },
    de: {
      title: 'Kostenloser MBTI-Persönlichkeitstest mit KI-Beratung | Entdecken Sie Ihren Typ',
      description: 'Machen Sie unseren kostenlosen MBTI-Persönlichkeitstest und erhalten Sie personalisierte KI-gestützte Ratschläge für Karriere, Beziehungen und persönliche Entwicklung. Entdecken Sie Ihren Persönlichkeitstyp in nur 5 Minuten.',
      keywords: 'MBTI Test, Persönlichkeitstest, kostenloser Persönlichkeitsquiz, Myers-Briggs, Persönlichkeitstypen, KI Beratung, Karriereberatung, Persönlichkeitsbewertung, 16 Persönlichkeiten, persönliche Entwicklung'
    },
    es: {
      title: 'Test de Personalidad MBTI Gratuito con Asesoramiento IA | Descubre Tu Tipo',
      description: 'Toma nuestro test de personalidad MBTI gratuito y obtén consejos personalizados con IA para carrera, relaciones y crecimiento personal. Descubre tu tipo de personalidad en solo 5 minutos.',
      keywords: 'Test MBTI, test de personalidad, quiz de personalidad gratuito, Myers-Briggs, tipos de personalidad, consejos IA, orientación profesional, evaluación de personalidad, 16 personalidades, desarrollo personal'
    },
    fr: {
      title: 'Test de Personnalité MBTI Gratuit avec Conseils IA | Découvrez Votre Type',
      description: 'Passez notre test de personnalité MBTI gratuit et obtenez des conseils personnalisés par IA pour carrière, relations et développement personnel. Découvrez votre type de personnalité en seulement 5 minutes.',
      keywords: 'Test MBTI, test de personnalité, quiz de personnalité gratuit, Myers-Briggs, types de personnalité, conseils IA, orientation professionnelle, évaluation de personnalité, 16 personnalités, développement personnel'
    },
    pt: {
      title: 'Teste de Personalidade MBTI Gratuito com Conselhos IA | Descubra Seu Tipo',
      description: 'Faça nosso teste de personalidade MBTI gratuito e obtenha conselhos personalizados com IA para carreira, relacionamentos e crescimento pessoal. Descubra seu tipo de personalidade em apenas 5 minutos.',
      keywords: 'Teste MBTI, teste de personalidade, quiz de personalidade gratuito, Myers-Briggs, tipos de personalidade, conselhos IA, orientação profissional, avaliação de personalidade, 16 personalidades, desenvolvimento pessoal'
    },
    ru: {
      title: 'Бесплатный Тест Личности MBTI с ИИ-Советами | Откройте Свой Тип',
      description: 'Пройдите наш бесплатный тест личности MBTI и получите персонализированные советы от ИИ по карьере, отношениям и личностному росту. Откройте свой тип личности всего за 5 минут.',
      keywords: 'Тест MBTI, тест личности, бесплатный квиз личности, Майерс-Бриггс, типы личности, ИИ-советы, карьерная ориентация, оценка личности, 16 личностей, личностное развитие'
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
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/${locale}`,
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
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/${locale}`,
      languages: {
        'en': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/en`,
        'zh': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/zh`,
        'de': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/de`,
        'es': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/es`,
        'fr': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/fr`,
        'pt': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/pt`,
        'ru': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/ru`,
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

export default async function HomePage({ params }: HomePageProps) {
  // 获取locale并设置请求级别的locale
  const { locale } = await params;
  setRequestLocale(locale);

  // 服务器端获取数据
  let personalities: PersonalityType[] = [];
  let error: string | null = null;

  try {
    await connectToDatabase();

    const data = await Personality.find({ language: locale })
      .select('type title description role')
      .sort({ type: 1 })
      .lean();

    personalities = data.map(doc => ({
      type: doc.type,
      title: doc.title,
      description: doc.description,
      role: doc.role
    }));

    console.log(`✅ Server-side loaded ${personalities.length} personalities for locale: ${locale}`);
  } catch (err) {
    console.error('Error fetching personalities:', err);
    error = 'Failed to load personality types';
  }

  return <HomePageContent
    locale={locale}
    personalities={personalities}
    error={error}
  />;
}