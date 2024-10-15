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
