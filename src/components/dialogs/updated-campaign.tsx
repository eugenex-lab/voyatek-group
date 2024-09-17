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
  onRedirect?: () => void; // Optional callback for additional actions
}

export function SuccessDialog({
  isOpen,
  onClose,
  onRedirect,
}: SuccessDialogProps) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoBack = () => {
    onClose(); // Close the dialog
    if (onRedirect) onRedirect(); // Optional redirect callback
    navigate(0); // Redirect to /campaign
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center">
        <DialogHeader>
          <DialogDescription className="flex flex-col items-center">
            <Lottie
              loop={true}
              animationData={lottieJson}
              play={true}
              className="h-28 w-28"
            />
            <p className="mt-4">Campaign Successfully Updated!</p>
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
