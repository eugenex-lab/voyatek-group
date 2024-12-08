import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";

interface BannerWithButtonProps {
  imageUrl: string;
  onButtonClick?: () => void;
}

const BannerWithButton: React.FC<BannerWithButtonProps> = ({
  imageUrl,
  onButtonClick,
}) => {
  return (
    <div
      className="relative flex flex-col items-center justify-between w-full h-48 gap-4 bg-cover rounded md:flex-row"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <Button
        variant="muted"
        width={"sm"}
        className="absolute flex items-center justify-center gap-2 left-4 text-muted-foreground top-4"
        onClick={onButtonClick}
      >
        <Icon
          className="font-semibold"
          icon="ph:arrow-left-bold"
          width="18"
          height="18"
        />
      </Button>
    </div>
  );
};

export default BannerWithButton;
