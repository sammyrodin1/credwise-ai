import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {getActiveCaption, normalizeCaptions} from "./captions";
import rawCaptions from "../data/captions.json";

export type ProductItem = {
  image: string;
  title: string;
  benefit: string;
  tag: string;
};

export type MyCompositionProps = {
  headline?: string;
  cta?: string;
  subcta?: string;
  products: ProductItem[];
  voiceoverSrc?: string | null;
};

const captions = normalizeCaptions(rawCaptions);

const fallbackProduct: ProductItem = {
  image: "current-product.jpg",
  title: "Featured Product",
  benefit: "A smart Amazon find designed to make everyday life easier.",
  tag: "Top Pick",
};

export const MyComposition: React.FC<MyCompositionProps> = ({
  headline = "STOP SCROLLING",
  cta = "Visit TrendingBestSellers.com",
  subcta = "Find trending products daily.",
  products,
  voiceoverSrc,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const featuredProduct = products[0] ?? fallbackProduct;
  const currentTimeMs = (frame / fps) * 1000;
  const activeCaption = getActiveCaption(captions, currentTimeMs);

  const introEnd = Math.round((55 / 30) * fps);
  const productEnd = Math.round((170 / 30) * fps);

  const backgroundShift = Math.sin(frame / 42) * 4;
  const backgroundPulse = 0.14 + Math.sin(frame / 36) * 0.03;

  const hookOpacity = interpolate(frame, [0, 10, introEnd - 8], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hookScale = interpolate(frame, [0, introEnd], [1.14, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hookGlow = interpolate(frame, [0, introEnd], [0.36, 0.16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const introAccentY = interpolate(frame, [0, 18], [26, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const productProgress = spring({
    fps,
    frame: frame - introEnd,
    config: {
      damping: 18,
      stiffness: 130,
      mass: 0.92,
    },
  });

  const productOpacity = interpolate(productProgress, [0, 0.5, 1], [0, 0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const productTranslateY = interpolate(productProgress, [0, 1], [110, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const productScale = interpolate(productProgress, [0, 1], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const productGlow = 0.14 + ((Math.sin(frame / 18) + 1) / 2) * 0.1;
  const productFloatY = Math.sin(frame / 16) * 5;
  const imageScale = 1.03 + Math.sin(frame / 22) * 0.012;

  const ctaOpacity = interpolate(frame, [productEnd, productEnd + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaScale = interpolate(frame, [productEnd, productEnd + 16], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaY = interpolate(frame, [productEnd, productEnd + 16], [28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const captionIn = activeCaption
    ? spring({
        fps,
        frame: frame - Math.floor((activeCaption.startMs / 1000) * fps),
        config: {
          damping: 18,
          stiffness: 170,
          mass: 0.85,
        },
      })
    : 0;

  const captionOpacity = activeCaption
    ? interpolate(captionIn, [0, 0.3, 1], [0, 0.9, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const captionTranslateY = activeCaption
    ? interpolate(captionIn, [0, 1], [26, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 26;

  const captionScale = activeCaption
    ? interpolate(captionIn, [0, 1], [0.96, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0.96;

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #07101d 0%, #0d1728 52%, #060a13 100%)",
        color: "white",
        fontFamily: "SF Pro Display, Helvetica, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {voiceoverSrc ? <Audio src={staticFile(voiceoverSrc)} /> : null}

      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${50 + backgroundShift}% 10%, rgba(43,104,255,${backgroundPulse}), transparent 36%), radial-gradient(circle at ${18 - backgroundShift}% 28%, rgba(43,219,255,0.1), transparent 28%), radial-gradient(circle at ${84 + backgroundShift}% 78%, rgba(113,102,255,0.18), transparent 34%)`,
        }}
      />

      {frame < introEnd && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "140px 78px",
          }}
        >
          <div
            style={{
              padding: "18px 32px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "#9bb4ff",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 34,
              opacity: hookOpacity,
              transform: `translateY(${introAccentY}px) scale(${interpolate(
                frame,
                [0, 18],
                [0.92, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              )})`,
            }}
          >
            Trending Now
          </div>

          <div
            style={{
              fontSize: 138,
              fontWeight: 900,
              letterSpacing: 2,
              lineHeight: 0.92,
              textAlign: "center",
              opacity: hookOpacity,
              transform: `scale(${hookScale})`,
              textShadow: `0 0 42px rgba(151,165,255,${hookGlow})`,
            }}
          >
            {headline.split(" ").map((word, index, allWords) => (
              <span key={`${word}-${index}`}>
                {word}
                {index < allWords.length - 1 ? <br /> : null}
              </span>
            ))}
          </div>

          <div
            style={{
              marginTop: 34,
              fontSize: 42,
              lineHeight: 1.25,
              color: "rgba(255,255,255,0.76)",
              textAlign: "center",
              opacity: interpolate(frame, [8, 22], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            One standout Amazon find your audience can&apos;t ignore.
          </div>
        </AbsoluteFill>
      )}

      {frame >= introEnd && frame < productEnd && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "86px 56px 76px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 900,
              opacity: productOpacity,
              transform: `translateY(${productTranslateY + productFloatY}px) scale(${productScale})`,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "-22px -24px auto",
                height: 1240,
                borderRadius: 54,
                background: `radial-gradient(circle at center, rgba(110,130,255,${productGlow}) 0%, rgba(110,130,255,0) 70%)`,
                filter: "blur(34px)",
              }}
            />

            <div
              style={{
                position: "relative",
                borderRadius: 40,
                overflow: "hidden",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow:
                  "0 24px 56px rgba(0,0,0,0.34), 0 0 34px rgba(115,136,255,0.12)",
                backdropFilter: "blur(18px)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: 940,
                  overflow: "hidden",
                  background:
                    "radial-gradient(circle at top, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                }}
              >
                <Img
                  src={staticFile(featuredProduct.image)}
                  onError={() => {
                    console.error(
                      `Failed to load image: ${featuredProduct.image}`
                    );
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: 48,
                    transform: `scale(${imageScale})`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(6,8,14,0.04) 0%, rgba(6,8,14,0.18) 68%, rgba(6,8,14,0.3) 100%)",
                  }}
                />
              </div>

              <div
                style={{
                  padding: "34px 36px 42px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                <div
                  style={{
                    alignSelf: "flex-start",
                    padding: "10px 16px",
                    borderRadius: 999,
                    backgroundColor: "rgba(144,164,255,0.12)",
                    border: "1px solid rgba(144,164,255,0.22)",
                    color: "#a5b6ff",
                    fontSize: 20,
                    fontWeight: 700,
                    letterSpacing: 1.4,
                    textTransform: "uppercase",
                  }}
                >
                  {featuredProduct.tag}
                </div>

                <div
                  style={{
                    fontSize: 54,
                    fontWeight: 800,
                    lineHeight: 1.02,
                  }}
                >
                  {featuredProduct.title}
                </div>

                <div
                  style={{
                    fontSize: 30,
                    lineHeight: 1.28,
                    color: "rgba(255,255,255,0.78)",
                  }}
                >
                  {featuredProduct.benefit}
                </div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {frame >= productEnd && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "120px 72px",
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px) scale(${ctaScale})`,
          }}
        >
          <div
            style={{
              padding: "18px 30px",
              borderRadius: 999,
              backgroundColor: "rgba(142,160,255,0.12)",
              border: "1px solid rgba(142,160,255,0.24)",
              color: "#a2b4ff",
              fontSize: 26,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 4,
              marginBottom: 28,
            }}
          >
            Shop the full list
          </div>

          <div
            style={{
              fontSize: 78,
              fontWeight: 900,
              lineHeight: 0.98,
              textAlign: "center",
              marginBottom: 22,
            }}
          >
            {cta}
          </div>

          <div
            style={{
              fontSize: 34,
              lineHeight: 1.3,
              color: "rgba(255,255,255,0.72)",
              textAlign: "center",
            }}
          >
            {subcta}
          </div>
        </AbsoluteFill>
      )}

      {activeCaption ? (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 72px 220px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              maxWidth: 860,
              padding: "18px 24px",
              borderRadius: 28,
              backgroundColor: "rgba(6,8,14,0.72)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 18px 42px rgba(0,0,0,0.32)",
              opacity: captionOpacity,
              transform: `translateY(${captionTranslateY}px) scale(${captionScale})`,
            }}
          >
            <div
              style={{
                fontSize: 42,
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: 0.2,
                textAlign: "center",
                color: "#ffffff",
              }}
            >
              {activeCaption.text}
            </div>
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
