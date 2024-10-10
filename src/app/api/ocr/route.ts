import { NextResponse } from 'next/server';
import fakeData from './data.json';

export function GET() {
  const data = fakeData.fullTextAnnotation.pages[0].blocks.map((block) => {
    return {
      boundings: block.boundingBox,
      text: block.paragraphs
        .map((p) => {
          return p.words
            .map((w) => w.symbols.map((s) => s.text).join(''))
            .join('');
        })
        .join(''),
    };
  });
  return NextResponse.json(data);
}
