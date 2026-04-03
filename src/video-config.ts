import type {MyCompositionProps, ProductItem} from "./Composition";

export const DEFAULT_HEADLINE = "STOP SCROLLING";
export const DEFAULT_CTA = "Visit TrendingBestSellers.com";
export const DEFAULT_SUBCTA = "Find trending products daily.";

export const buildCompositionProps = (
  products: ProductItem[],
  voiceoverSrc?: string | null
): MyCompositionProps => ({
  headline: DEFAULT_HEADLINE,
  cta: DEFAULT_CTA,
  subcta: DEFAULT_SUBCTA,
  products,
  voiceoverSrc: voiceoverSrc ?? null,
});
