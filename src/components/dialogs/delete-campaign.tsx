import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { apiService } from "@/service/api-service";
import { useNavigate } from "react-router-dom";

interface DeleteCampaignDialogProps {
  campaignId: string;
  campaignName: string;
  onDelete: (id: string) => void;
  onGoBack: () => void;
}

export function DeleteCampaignDialog({
  campaignId,
  campaignName,
  onDelete,
}: DeleteCampaignDialogProps) {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog open state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await apiService.deleteCampaign(campaignId);
      onDelete(campaignId);
      setShowSuccessDialog(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "An error occurred while deleting the campaign.",
      });
    } finally {
      setIsLoading(false);
      // Close the dialog only if successful
      if (!showSuccessDialog) {
        setIsDialogOpen(false);
      }
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    navigate(0); // Navigate when closing the success dialog
  };

  return (
    <>
      <Button variant="ghost" onClick={() => setIsDialogOpen(true)}>
        <Icon icon="material-symbols:delete-outline" width="24" height="24" />
        <span className="text-left lg:hidden">Delete</span>
      </Button>

      <AlertDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsDialogOpen(false);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Stop Campaign</AlertDialogTitle>
            <Separator />
            <AlertDialogDescription className="pt-4">
              Are you sure you want to delete the {campaignName} campaign?
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex items-center justify-center w-full gap-4">
              <AlertDialogCancel asChild>
                <Button
                  width={"md"}
                  variant="outline"
                  size="lg"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  className={`text-white shadow-sm ${
                    isLoading
                      ? "bg-gray-500"
                      : "bg-destructive hover:bg-destructive/90"
                  }`}
                  variant="destructive"
                  width={"md"}
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Delete Campaign"}
                </Button>
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={showSuccessDialog}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseSuccessDialog();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-muted-foreground">
              Campaign Deleted
            </DialogTitle>
            <Separator />
            <DialogDescription className="pt-4 text-center">
              The {campaignName} campaign has been deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex items-center justify-center w-full gap-4">
              <Button size="lg" onClick={handleCloseSuccessDialog}>
                Go Back to Campaign List
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
