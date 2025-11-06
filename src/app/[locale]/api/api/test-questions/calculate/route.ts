import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// 正确的MBTI评分映射（基于标准MBTI Form M规则）
const correctScoringMap: { [key: string]: { a: string, b: string } } = {
  '1': { a: 'E', b: 'I' }, '8': { a: 'E', b: 'I' }, '15': { a: 'E', b: 'I' }, '22': { a: 'E', b: 'I' }, '29': { a: 'E', b: 'I' }, '36': { a: 'E', b: 'I' }, '43': { a: 'E', b: 'I' }, '50': { a: 'E', b: 'I' }, '57': { a: 'E', b: 'I' }, '64': { a: 'E', b: 'I' },
  '2': { a: 'I', b: 'E' }, '9': { a: 'I', b: 'E' }, '16': { a: 'I', b: 'E' }, '23': { a: 'I', b: 'E' }, '30': { a: 'I', b: 'E' }, '37': { a: 'I', b: 'E' }, '44': { a: 'I', b: 'E' }, '51': { a: 'I', b: 'E' }, '58': { a: 'I', b: 'E' }, '65': { a: 'I', b: 'E' },
  '3': { a: 'S', b: 'N' }, '10': { a: 'S', b: 'N' }, '17': { a: 'S', b: 'N' }, '24': { a: 'S', b: 'N' }, '31': { a: 'S', b: 'N' }, '38': { a: 'S', b: 'N' }, '45': { a: 'S', b: 'N' }, '52': { a: 'S', b: 'N' }, '59': { a: 'S', b: 'N' }, '66': { a: 'S', b: 'N' },
  '4': { a: 'N', b: 'S' }, '11': { a: 'N', b: 'S' }, '18': { a: 'N', b: 'S' }, '25': { a: 'N', b: 'S' }, '32': { a: 'N', b: 'S' }, '39': { a: 'N', b: 'S' }, '46': { a: 'N', b: 'S' }, '53': { a: 'N', b: 'S' }, '60': { a: 'N', b: 'S' }, '67': { a: 'N', b: 'S' },
  '5': { a: 'T', b: 'F' }, '12': { a: 'T', b: 'F' }, '19': { a: 'T', b: 'F' }, '26': { a: 'T', b: 'F' }, '33': { a: 'T', b: 'F' }, '40': { a: 'T', b: 'F' }, '47': { a: 'T', b: 'F' }, '54': { a: 'T', b: 'F' }, '61': { a: 'T', b: 'F' }, '68': { a: 'T', b: 'F' },
  '6': { a: 'F', b: 'T' }, '13': { a: 'F', b: 'T' }, '20': { a: 'F', b: 'T' }, '27': { a: 'F', b: 'T' }, '34': { a: 'F', b: 'T' }, '41': { a: 'F', b: 'T' }, '48': { a: 'F', b: 'T' }, '55': { a: 'F', b: 'T' }, '62': { a: 'F', b: 'T' }, '69': { a: 'F', b: 'T' },
  '7': { a: 'J', b: 'P' }, '14': { a: 'J', b: 'P' }, '21': { a: 'J', b: 'P' }, '28': { a: 'J', b: 'P' }, '35': { a: 'J', b: 'P' }, '42': { a: 'J', b: 'P' }, '49': { a: 'J', b: 'P' }, '56': { a: 'J', b: 'P' }, '63': { a: 'J', b: 'P' }, '70': { a: 'J', b: 'P' }
};

export async function POST(request: NextRequest) {
  try {
    const { answers, language = 'en' } = await request.json();

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid answers data' },
        { status: 400 }
      );
    }

    // console.log('Received answers:', answers);

    // 初始化分数统计
    const scores = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    // 根据正确的评分映射计算分数
    Object.keys(answers).forEach(questionId => {
      const answer = answers[questionId] as 'a' | 'b';
      const scoring = correctScoringMap[questionId];

      if (scoring && answer) {
        const personalityType = scoring[answer];
        if (personalityType && scores.hasOwnProperty(personalityType)) {
          (scores as any)[personalityType]++;
        }
      }
    });

    // 确定每个维度的结果
    const result = `${scores.E > scores.I ? 'E' : 'I'}${scores.S > scores.N ? 'S' : 'N'}${scores.T > scores.F ? 'T' : 'F'}${scores.J > scores.P ? 'J' : 'P'}`;

    console.log(`🧮 MBTI Calculation for ${language}:`, {
      answers,
      scores,
      result
    });

    return NextResponse.json({
      success: true,
      result,
      scores
    });

  } catch (error) {
    console.error('Error calculating MBTI result:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to calculate MBTI result' },
      { status: 500 }
    );
  }
}