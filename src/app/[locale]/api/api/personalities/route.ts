import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Personality from '@/lib/models/Personality';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get('lang') || 'zh';
    
    const personalities = await Personality.aggregate([
      {
        $match: { language: language }
      },
      {
        $group: {
          _id: '$type',
          title: { $first: '$title' },
          description: { $first: '$description' },
          type: { $first: '$type' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    return NextResponse.json(personalities);
  } catch (error) {
    console.error('Error fetching personalities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch personalities' },
      { status: 500 }
    );
  }
}