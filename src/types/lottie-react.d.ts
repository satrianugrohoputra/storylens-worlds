
// Fix for missing types if @types/lottie-react is unavailable.
// You can delete this if official types become available.
declare module "lottie-react" {
  import * as React from "react";
  export interface LottieProps {
    animationData: object;
    loop?: boolean;
    autoplay?: boolean;
    style?: React.CSSProperties;
    rendererSettings?: object;
    [key: string]: any;
  }
  export default function Lottie(props: LottieProps): JSX.Element;
}
