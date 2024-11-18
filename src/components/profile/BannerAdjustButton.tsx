import { Button } from "@/components/ui/button";
import { Crop } from "lucide-react";

interface BannerAdjustButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const BannerAdjustButton = ({ onClick, disabled }: BannerAdjustButtonProps) => {
  return (
    <Button
      variant="secondary"
      size="sm"
      className="absolute bottom-4 right-4 gap-2 bg-white hover:bg-gray-100"
      onClick={onClick}
      disabled={disabled}
    >
      <Crop className="h-4 w-4" />
      Ajuster la photo de couverture
    </Button>
  );
};