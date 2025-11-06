import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import TestQuestion from '@/lib/models/TestQuestion';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';

    await connectToDatabase();

    const questions = await TestQuestion.find({ language })
      .sort({ id: 1 })
      .select('-__v -createdAt -updatedAt');

    return NextResponse.json({
      success: true,
      data: questions
    });
  } catch (error) {
    console.error('Error fetching test questions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch test questions' },
      { status: 500 }
    );
  }
}