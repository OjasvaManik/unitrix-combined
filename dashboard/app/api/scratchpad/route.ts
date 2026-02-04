import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the file path. process.cwd() points to the project root.
const DATA_FILE = path.join( process.cwd(), 'scratchpad.txt' );

export async function GET() {
  try {
    // Attempt to read the file
    const content = await fs.readFile( DATA_FILE, 'utf-8' );
    return NextResponse.json( { content } );
  } catch ( error: any ) {
    // If file doesn't exist (first run), return empty string without error
    if ( error.code === 'ENOENT' ) {
      return NextResponse.json( { content: '' } );
    }
    return NextResponse.json( { error: 'Failed to read file' }, { status: 500 } );
  }
}

export async function POST( req: Request ) {
  try {
    const { content } = await req.json();

    // Write the content to the file (overwrites existing)
    await fs.writeFile( DATA_FILE, content, 'utf-8' );

    return NextResponse.json( { success: true } );
  } catch ( error ) {
    return NextResponse.json( { error: 'Failed to save file' }, { status: 500 } );
  }
}