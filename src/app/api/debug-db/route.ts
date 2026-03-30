import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const hasDbUrl = !!process.env.DATABASE_URL;
    const dbUrlLength = process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0;
    const dbUrlPrefix = process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 15) : 'none';
    
    // Test Prisma Connection
    let errorFromPrisma = null;
    let count = -1;
    
    try {
      count = await prisma.news.count();
    } catch (e: unknown) {
      if (e instanceof Error) {
        errorFromPrisma = e.message;
      } else {
        errorFromPrisma = String(e);
      }
    }

    return NextResponse.json({
      environment: {
        has_DATABASE_URL: hasDbUrl,
        length_DATABASE_URL: dbUrlLength,
        prefix_DATABASE_URL: dbUrlPrefix,
        NODE_ENV: process.env.NODE_ENV,
      },
      database_test: {
        success: count >= 0,
        news_count: count,
        error: errorFromPrisma
      }
    });

  } catch (globalError: unknown) {
    if (globalError instanceof Error) {
      return NextResponse.json({ success: false, error: globalError.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: String(globalError) }, { status: 500 });
  }
}
