import { Button } from "@/components/ui/button";

export const Email = () => {
  return (
    <div className="w-[188px] h-[104px] bg-white rounded-xl p-4 gap-2 text-center">
      <p className="font-black">Test@gmail.com</p>
      <Button variant="secondary">Sign out</Button>
    </div>
  );
};
