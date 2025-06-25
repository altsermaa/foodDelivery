
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"

  export const LogInAlert = () => {
    return <Dialog>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>You need to log in first</DialogTitle>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" >
              Log In
            </Button>
            <Button type="button" variant="secondary">
              Sign Up
            </Button>
          </DialogClose>
        </DialogFooter>
        
      </DialogHeader>
    </DialogContent>
  </Dialog>
  }