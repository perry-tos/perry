import { NextResponse } from "next/server";
import { generateTos } from "@/lib/tos-generator";

// In-memory store — persists for the lifetime of the dev server
let currentTos = generateTos();
let lastUpdated = new Date().toISOString();

export async function GET() {
  return NextResponse.json({
    content: currentTos,
    lastUpdated,
    wordCount: currentTos.split(/\s+/).filter(Boolean).length,
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  currentTos = body.content;
  lastUpdated = new Date().toISOString();

  return NextResponse.json({
    success: true,
    lastUpdated,
    wordCount: currentTos.split(/\s+/).filter(Boolean).length,
  });
}
