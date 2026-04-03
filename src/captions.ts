export type Caption = {
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: number | null;
  confidence: number | null;
};

export type RawCaption = {
  startMs: number;
  endMs: number;
  text: string;
};

export const normalizeCaptions = (rawCaptions: RawCaption[]): Caption[] => {
  return rawCaptions.map((caption) => ({
    text: caption.text,
    startMs: caption.startMs,
    endMs: caption.endMs,
    timestampMs: caption.startMs,
    confidence: null,
  }));
};

export const getActiveCaption = (
  captions: Caption[],
  currentTimeMs: number
): Caption | null => {
  return (
    captions.find(
      (caption) =>
        currentTimeMs >= caption.startMs && currentTimeMs < caption.endMs
    ) ?? null
  );
};
