import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Lottie from "react-lottie-player";
import lottieJson from "@/assets/json/success.json";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessDialog({ isOpen, onClose }: SuccessDialogProps) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoBack = () => {
    onClose(); // Close the dialog
    navigate("/campaign"); // Redirect to /campaign
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center">
        <DialogHeader>
          <DialogDescription className="flex flex-col items-center">
            <Lottie
              loop={true}
              animationData={lottieJson}
              play={true} // Simplified to always play
              className="h-28 w-28"
            />
            <p className="mt-4">Campaign Successfully Created!</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size={"lg"} width={"lg"} onClick={handleGoBack}>
            Go Back to Campaign List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
