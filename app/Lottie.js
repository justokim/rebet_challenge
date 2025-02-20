import Lottie from "lottie-react";
import glowingCircle from "@/public/AnimatedAssets/main_scene.json";
import glowingLeftArrows from "@/public/AnimatedAssets/glowing_left_arrows.json";
import glowingRightArrows from "@/public/AnimatedAssets/glowing_right_arrows.json";

export const GlowingCircle = () => (
  <Lottie
    animationData={glowingCircle}
    loop={true}
    style={{ transform: "translateY(1%) scale(1.7)" }}
  />
);

export const GlowingLeftArrows = () => (
  <Lottie
    animationData={glowingLeftArrows}
    loop={true}
    className="scale-150 pr-4 "
  />
);

export const GlowingRightArrows = () => (
  <Lottie
    animationData={glowingRightArrows}
    loop={true}
    className="scale-150 pl-4 "
  />
);
