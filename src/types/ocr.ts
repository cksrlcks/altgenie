export type Block = {
  boundings: { x: number; y: number }[];
  text: string;
};

export type OcrResult = {
  img: {
    type: string;
    base64: string;
  };
  blocks: Block[];
};

export type OcrApiResponse = {
  fullTextAnnotation: {
    pages?: {
      blocks?: {
        boundingBox?: {
          vertices: {
            x: number;
            y: number;
          }[];
        };
        paragraphs?: {
          words: {
            symbols: {
              text: string;
            }[];
          }[];
        }[];
      }[];
    }[];
  };
};
