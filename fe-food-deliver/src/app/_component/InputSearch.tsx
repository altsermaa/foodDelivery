import { ChevronRight, MapPinPlusInside } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export const InputSearch = () => {
  const [location, setLocation] = useState("");
  const [savedLocation, setSavedLocation] = useState("");

  useEffect(() => {

    const storageKey = "location";
    const existingData = localStorage.getItem(storageKey);
    if (existingData) {
      try {
        const parsedData = JSON.parse(existingData);
        setSavedLocation(parsedData);
      } catch (error) {
        console.error("Error parsing saved location:", error);
      }
    } 
  }, []);

  const handleLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const saveLocationData = () => {
    const storageKey = "location";
    const existingData = localStorage.getItem(storageKey);

    if (existingData) {
      localStorage.setItem(storageKey, JSON.stringify(location));
    }
    setSavedLocation(location);
    setLocation("");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-full w-[251px] h-[36px] flex py-2 px-3 text-xs items-center gap-1 bg-white">
          <MapPinPlusInside className="text-red-500 w-[20px]" />
          <p className="text-red-500">Delivery address:</p>
          {savedLocation ? (
            <p className="text-muted-foreground truncate max-w-[120px]">{savedLocation}</p>
          ) : (
            <p className="text-muted-foreground">Add location</p>
          )}
          <ChevronRight className="w-[20px]" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please write your delivery address!</DialogTitle>
          <DialogDescription>
            <Input 
              placeholder="Please share your complete address." 
              className="h-[80px]" 
              value={location} 
              onChange={handleLocation}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={saveLocationData}>Deliver here</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 