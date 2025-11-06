import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import Personality from '@/lib/models/Personality';
import PersonalityPageContent from '@/components/PersonalityPageContent';
import { Metadata } from 'next';

interface PersonalityData {
  type: string;
  title: string;
  description: string;
  role: string;
  markdown: string;
}

interface PersonalityPageProps {
  params: Promise<{
    locale: string;
    type: string;
  }>;
}

export async function generateMetadata({ params }: PersonalityPageProps): Promise<Metadata> {
  const { locale, type } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const baseTitle = t('site.title', { defaultValue: 'MBTI Personality Test with AI Advice' });

  // Get personality title for SEO
  let personalityTitle = '';
  let personalityDescription = '';
  try {
    await connectToDatabase();
    const personalityData = await Personality.findOne({
      type: type.toUpperCase(),
      language: locale
    }).select('title description').lean();

    if (personalityData) {
      personalityTitle = (personalityData as any).title;
      personalityDescription = (personalityData as any).description;
    }
  } catch (error) {
    console.error('Error fetching personality for SEO:', error);
  }

  const seoData = {
    en: {
      title: `${personalityTitle} (${type}) | MBTI Personality Type with AI Advice`,
      description: `${personalityDescription} Get personalized AI-powered advice for career, relationships, and personal development based on your ${type} personality type.`,
      keywords: `${type}, ${personalityTitle}, MBTI ${type}, ${type} personality, ${type} traits, ${type} careers, ${type} relationships, ${type} AI advice, 16 personalities, Myers-Briggs`
    },
    zh: {
      title: `${personalityTitle} (${type}) | MBTI性格类型与AI建议`,
      description: `${personalityDescription} 获取基于您的${type}性格类型的个性化AI驱动的职业、人际关系和个人发展建议。`,
      keywords: `${type}, ${personalityTitle}, MBTI ${type}, ${type}性格, ${type}特征, ${type}职业, ${type}关系, ${type} AI建议, 16种人格, 迈尔斯-布里格斯`
    },
    de: {
      title: `${personalityTitle} (${type}) | MBTI Persönlichkeitstyp mit KI-Beratung`,
      description: `${personalityDescription} Erhalten Sie personalisierte KI-gestützte Ratschläge für Karriere, Beziehungen und persönliche Entwicklung basierend auf Ihrem ${type} Persönlichkeitstyp.`,
      keywords: `${type}, ${personalityTitle}, MBTI ${type}, ${type} Persönlichkeit, ${type} Merkmale, ${type} Karriere, ${type} Beziehungen, ${type} KI Beratung, 16 Persönlichkeiten, Myers-Briggs`
    },
    es: {
      title: `${personalityTitle} (${type}) | Tipo de Personalidad MBTI con Consejos IA`,
      description: `${personalityDescription} Obtén consejos personalizados con IA para carrera, relaciones y desarrollo personal basados en tu tipo de personalidad ${type}.`,
      keywords: `${type}, ${personalityTitle}, MBTI ${type}, tipo de personalidad ${type}, rasgos ${type}, carrera ${type}, relaciones ${type}, consejos IA ${type}, 16 personalidades, Myers-Briggs`
    },
    fr: {
      title: `${personalityTitle} (${type}) | Type de Personnalité MBTI avec Conseils IA`,
      description: `${personalityDescription} Obtenez des conseils personnalisés par IA pour carrière, relations et développement personnel basés sur votre type de personnalité ${type}.`,
      keywords: `${type}, ${personalityTitle}, MBTI ${type}, type de personnalité ${type}, traits ${type}, carrière ${type}, relations ${type}, conseils IA ${type}, 16 personnalités, Myers-Briggs`
    },
    pt: {
      title: `${personalityTitle} (${type}) | Tipo de Personalidade MBTI com Conselhos IA`,
      description: `${personalityDescription} Obtenha conselhos personalizados com IA para carreira, relacionamentos e desenvolvimento pessoal baseados no seu tipo de personalidade ${type}.`,
      keywords: `${type}, ${personalityTitle}, MBTI ${type}, tipo de personalidade ${type}, traços ${type}, carreira ${type}, relacionamentos ${type}, conselhos IA ${type}, 16 personalidades, Myers-Briggs`
    },
    ru: {
      title: `${personalityTitle} (${type}) | Тип Личности MBTI с ИИ-Советами`,
      description: `${personalityDescription} Получите персонализированные советы от ИИ по карьере, отношениям и личностному развитию на основе вашего типа личности ${type}.`,
      keywords: `${type}, ${personalityTitle}, MBTI ${type}, тип личности ${type}, черты ${type}, карьера ${type}, отношения ${type}, ИИ-советы ${type}, 16 личностей, Майерс-Бриггс`
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
      type: 'article',
      locale: locale,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/${locale}/personality/${type}`,
      siteName: baseTitle,
      images: [
        {
          url: `/og-image.png`,
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
      images: [`/og-image.png`],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/${locale}/personality/${type}`,
      languages: {
        'en': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/en/personality/${type}`,
        'zh': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/zh/personality/${type}`,
        'de': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/de/personality/${type}`,
        'es': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/es/personality/${type}`,
        'fr': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/fr/personality/${type}`,
        'pt': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/pt/personality/${type}`,
        'ru': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti.elysiatools.com'}/ru/personality/${type}`,
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

// Personality type colors (same as homepage)
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

export default async function PersonalityPage({ params }: PersonalityPageProps) {
  const { locale, type } = await params;

  // Set the request locale for static rendering
  setRequestLocale(locale);

  let personality: PersonalityData | null = null;
  let error: string | null = null;

  try {
    // Connect to database and fetch personality data
    await connectToDatabase();
    const personalityData = await Personality.findOne({
      type: type.toUpperCase(),
      language: locale
    }).lean();

    if (personalityData) {
      personality = {
        type: (personalityData as any).type,
        title: (personalityData as any).title,
        description: (personalityData as any).description,
        role: (personalityData as any).role,
        markdown: (personalityData as any).markdown
      };
      console.log(`✅ Server-side loaded personality ${type} for locale: ${locale}`);
    } else {
      error = 'Personality type not found';
    }
  } catch (err) {
    console.error('Error fetching personality:', err);
    error = err instanceof Error ? err.message : 'Failed to load personality data';
  }

  // If personality not found, return 404
  if (!personality) {
    notFound();
  }

  // Get translations for the client component
  const t = await getTranslations();

  return <PersonalityPageContent personality={personality} locale={locale} personalityColors={personalityColors} />;
}