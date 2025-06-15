
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

// Free portal Lottie animation (or use other as needed)
const PORTAL_LOTTIE =
  "https://assets2.lottiefiles.com/packages/lf20_h2tpbvn5.json";

const PortalLottie: React.FC = () => {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(PORTAL_LOTTIE)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => setAnimationData(null));
    return () => { cancelled = true; };
  }, []);

  return animationData ? (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: "180px", height: "180px" }}
      rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
    />
  ) : null;
};

export default PortalLottie;
