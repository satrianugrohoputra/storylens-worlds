
import React from "react";
import Lottie from "lottie-react";

// Free portal Lottie animation (or use other as needed)
const PORTAL_LOTTIE =
  "https://assets2.lottiefiles.com/packages/lf20_h2tpbvn5.json";

const PortalLottie: React.FC = () => (
  <Lottie
    path={PORTAL_LOTTIE}
    loop
    autoplay
    style={{ width: "180px", height: "180px" }}
    rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
  />
);

export default PortalLottie;
