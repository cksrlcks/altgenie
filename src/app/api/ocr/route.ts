import { NextRequest, NextResponse } from 'next/server';
import vision from '@google-cloud/vision';

export const config = {
  api: {
    bodyParser: false, // multipart/form-data처리를 위해 bodyParser 비활성화
  },
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: '에러발생 : 파일을 확인해주세요' },
      { status: 500 },
    );
  }

  //nodejs에서는 브라우저api를 쓰지못하므로  nodejs의 Buffer를 사용함
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64Image = buffer.toString('base64');
  const mimeType = file.type || 'application/octet-stream';

  const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });
  const [result] = await client.documentTextDetection({
    image: {
      content: base64Image, // base64 인코딩된 이미지
    },
  });

  const blocks = result.fullTextAnnotation?.pages?.[0].blocks;
  if (!blocks) {
    return NextResponse.json(
      { error: '검출된 텍스트가 없습니다.' },
      { status: 500 },
    );
  }

  //TODO : 데이터가 제대로 없으면 응답을 다르게 보내기
  const data = blocks.map((block) => {
    return {
      boundings: block.boundingBox?.vertices,
      text: block.paragraphs
        ?.map((p) => {
          return p.words
            ?.map((w) => w.symbols?.map((s) => s.text).join(''))
            .join('');
        })
        .join(''),
    };
  });

  return NextResponse.json({
    img: { type: mimeType, base64: base64Image },
    blocks: data,
  });
}
