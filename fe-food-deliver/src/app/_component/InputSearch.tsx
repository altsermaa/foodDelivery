import { ChevronRight, MapPinPlusInside } from "lucide-react";

export const InputSearch = () => {
  return (
    <div className="rounded-full w-[251px] h-[36px] flex py-2 px-3 text-xs items-center gap-1 bg-white">
      <MapPinPlusInside className="text-red-500 w-[20px]" />
      <p className="text-red-500">Delivery address:</p>
      <p className="text/text-muted-foreground">Add location</p>
      <ChevronRight className="w-[20px] " />
    </div>
  );
};
