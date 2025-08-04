
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface LogInAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LogInAlert = ({ open, onOpenChange }: LogInAlertProps) => {
  const router = useRouter();

  const handleLogin = () => {
    onOpenChange(false);
    router.push("/login");
  };

  const handleSignUp = () => {
    onOpenChange(false);
    router.push("/signUp");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You need to log in first</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Please log in or create an account to place an order.
          </p>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:justify-start">
          <Button 
            type="button" 
            onClick={handleLogin}
            className="flex-1"
          >
            Log In
          </Button>
          <Button 
            type="button" 
            variant="secondary"
            onClick={handleSignUp}
            className="flex-1"
          >
            Sign Up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}