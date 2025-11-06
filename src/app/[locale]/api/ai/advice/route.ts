import OpenAI from 'openai';
import { connectToDatabase } from '@/lib/mongodb';
import Personality from '@/lib/models/Personality';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "X-Title": "MBTI Personality Test",
  },
  dangerouslyAllowBrowser: false
});

export async function POST(request: Request) {
  try {
    const { personalityType, locale, userInfo } = await request.json();

    if (!personalityType || !locale) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Connect to database and get personality markdown in English
    await connectToDatabase();
    const personalityData = await Personality.findOne({
      type: personalityType.toUpperCase(),
      language: 'en' // Always use English for AI processing
    });

    if (!personalityData) {
      return new Response(
        JSON.stringify({ error: 'Personality type not found' }),
        { status: 404 }
      );
    }

    // Create the prompt based on user information and personality data
    const userContext = userInfo.age ? `
User Information:
- Age: ${userInfo.age}
- Gender: ${userInfo.gender || 'Not specified'}
- Occupation: ${userInfo.occupation}
- Interests: ${userInfo.interests || 'Not specified'}
- Goals: ${userInfo.goals || 'Not specified'}
` : '';

    const systemPrompt = `You are a professional personality development and career advisor specializing in MBTI personality types. Based on the user's MBTI type ${personalityType} and their personal information, provide comprehensive, personalized advice covering:

1. Career Development - suitable career paths, work environment preferences, leadership style
2. Investment and Financial Planning - risk tolerance, investment approaches, financial habits
3. Social Relationships - communication style, friendship patterns, networking strategies
4. Romantic Relationships - compatibility, communication needs, relationship dynamics
5. Personal Growth - areas for development, stress management, life balance

Personality Reference Information:
${(personalityData as any).markdown}

${userContext}

Please provide advice in ${locale === 'zh' ? 'Chinese' : locale === 'de' ? 'German' : locale === 'es' ? 'Spanish' : locale === 'fr' ? 'French' : locale === 'pt' ? 'Portuguese' : locale === 'ru' ? 'Russian' : 'English'}.

Format your response using markdown with clear sections, bullet points, and actionable advice. Be encouraging, practical, and specific to the ${personalityType} personality type.`;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-v3.2-exp",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Please provide personalized advice for a ${personalityType} personality type based on the information provided above.`
        }
      ],
      stream: true,
      max_tokens: 4000,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              const data = JSON.stringify({ content });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('AI Advice API Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to generate advice',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}