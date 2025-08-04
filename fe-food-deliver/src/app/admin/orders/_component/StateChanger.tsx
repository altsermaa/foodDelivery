import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

enum orderStatusType {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

type PropsType = {
  saveChange: () => void;
  statusHandler: (_orderStatus: orderStatusType) => void;
  orderStatus: orderStatusType;
};

export function StateChanger({
  saveChange,
  statusHandler,
  orderStatus,
}: PropsType) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-2 border-gray-300 hover:border-gray-400">
            Change delivery state
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change delivery state</DialogTitle>
            <DialogDescription>
              Select the new delivery state for the selected orders
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row gap-4 my-6">
            <Button 
              onClick={() => statusHandler(orderStatusType.PENDING)}
              className={`flex-1 ${
                orderStatus === orderStatusType.PENDING 
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                  : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
              }`}
            >
              PENDING
            </Button>
            <Button 
              onClick={() => statusHandler(orderStatusType.DELIVERED)}
              className={`flex-1 ${
                orderStatus === orderStatusType.DELIVERED 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-green-100 hover:bg-green-200 text-green-800'
              }`}
            >
              DELIVERED
            </Button>
            <Button 
              onClick={() => statusHandler(orderStatusType.CANCELLED)}
              className={`flex-1 ${
                orderStatus === orderStatusType.CANCELLED 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-red-100 hover:bg-red-200 text-red-800'
              }`}
            >
              CANCELLED
            </Button>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={saveChange} className="w-full">
                Save Changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
