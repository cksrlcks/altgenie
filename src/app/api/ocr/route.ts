import { NextRequest, NextResponse } from 'next/server';
import vision from '@google-cloud/vision';
import mockData from './data.json';
import { google } from '@google-cloud/vision/build/protos/protos';

function extractOCRData(result: google.cloud.vision.v1.IAnnotateImageResponse) {
  const blocks = result.fullTextAnnotation?.pages?.[0].blocks;
  return blocks?.map((block) => {
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
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: '파일을 확인해주세요' },
        { status: 400 },
      );
    }

    //nodejs에서는 브라우저api를 쓰지못하므로  nodejs의 Buffer를 사용함
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');
    const mimeType = file.type || 'application/octet-stream';

    if (process.env.NEXT_PUBLIC_ENV === 'development') {
      const data = extractOCRData(
        mockData as google.cloud.vision.v1.IAnnotateImageResponse,
      );
      if (!data || data.length === 0) {
        return NextResponse.json(
          { error: '검출된 텍스트가 없습니다.' },
          { status: 422 },
        );
      }

      console.log('test용 api');
      return NextResponse.json({
        img: { type: mimeType, base64: base64Image },
        blocks: data,
      });
    } else {
      //real api(테스트할때는 목업데이터 이용하기)

      //배포문제때문에 base64인코딩된 키 사용
      const apiKeyBase64 = process.env.SERVICE_ACCOUNT_KEY_BASE64;
      if (!apiKeyBase64) {
        return NextResponse.json(
          { error: 'API키를 찾을 수 없습니다.' },
          { status: 401 },
        );
      }
      const apiKey = JSON.parse(
        Buffer.from(apiKeyBase64, 'base64').toString('utf-8'),
      );
      const client = new vision.ImageAnnotatorClient({
        credentials: apiKey,
      });
      const [result] = await client.documentTextDetection({
        image: {
          content: base64Image, // base64 인코딩된 이미지
        },
      });

      const data = extractOCRData(result);
      if (!data || data.length === 0) {
        return NextResponse.json(
          { error: '검출된 텍스트가 없습니다.' },
          { status: 422 },
        );
      }
      console.log('실제 api');
      return NextResponse.json({
        img: { type: mimeType, base64: base64Image },
        blocks: data,
      });
    }
  } catch (error) {
    console.error('api 요청중 에러발생 : ', error);

    return NextResponse.json(
      {
        error: '문제가 생겼습니다. 다시 시도해주세요.',
      },
      { status: 500 },
    );
  }
}
