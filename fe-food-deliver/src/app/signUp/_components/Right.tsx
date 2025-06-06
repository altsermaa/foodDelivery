import Image from "next/image";

export const RightSide = () => {
  return (
    <div className="relative w-full h-full rounded-2xl">
      <Image
        src="/asd.png"
        fill
        objectFit="cover"
        alt="signUp image"
        className="rounded-2xl"
      />
    </div>
  );
};
