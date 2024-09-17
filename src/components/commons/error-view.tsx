// /components/ui/ErrorView.tsx

import React from "react";
import Lottie from "react-lottie-player";
import { Button } from "@/components/ui/button";
import { useLottieAnimation } from "@/lib/utils/lottie-animation";
import lottieJson from "@/assets/json/empty-state.json";

type ErrorViewProps = {
  errorMessage: string;
  onRetry: () => void;
};

export const ErrorView: React.FC<ErrorViewProps> = ({
  errorMessage,
}) => {
  const lottieRef = React.useRef(null);
  const { isPlaying, handleMouseEnter, handleMouseLeave } =
    useLottieAnimation(12000);
  const handleReload = () => {
    window.location.reload(); // Reload the current page
  };

  return (
    <div className="flex items-center justify-center flex-1 rounded-lg shadow-sm">
      <div
        className="flex flex-col items-center gap-1 p-5 text-center lg:mb-20"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Lottie
          loop={isPlaying}
          animationData={lottieJson}
          play={isPlaying}
          ref={lottieRef}
          className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
        />

        <p className="mb-4 text-sm font-semibold text-black">{errorMessage}</p>
        <Button
          onClick={handleReload}
          className="flex items-center mt-2 mb-6 space-x-2 lg:mt-3"
        >
          <span>Reload Page</span>
        </Button>
      </div>
    </div>
  );
};
