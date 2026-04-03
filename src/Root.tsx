import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import products from "../data/products.json";
import {buildCompositionProps} from "./video-config";
import renderConfig from "../data/render-config.json";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={renderConfig.durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={buildCompositionProps(products, renderConfig.voiceoverSrc)}
      />
    </>
  );
};
