import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Personality from '@/lib/models/Personality';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    await connectToDatabase();
    
    const { type } = await params;
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get('lang') || 'zh';
    const personalityType = type.toUpperCase();
    
    const personality = await Personality.findOne({
      type: personalityType,
      language: language
    });

    if (!personality) {
      return NextResponse.json(
        { error: 'Personality type not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(personality);
  } catch (error) {
    console.error('Error fetching personality:', error);
    return NextResponse.json(
      { error: 'Failed to fetch personality' },
      { status: 500 }
    );
  }
}