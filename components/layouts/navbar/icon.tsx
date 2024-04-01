import { Button } from "@/components/ui/button";
import { BellDot, Circle, Settings } from "lucide-react";
import React from "react";

type Props = {
  icon: string;
};

export default function Icon({ icon }: Props) {
  return (
    <div className="bg-secondary-background rounded-full flex justify-center items-center w-14 h-14 hover:bg-black mx-4">
      <Button className="bg-transparent border-none w-fit hover:bg-transparent">
        {icon == "settings" ? (
          <Settings color="#718EBF" size={30} />
        ) : icon == "notifications" ? (
          <BellDot color="red" size={30} />
        ) : (
          <Circle color="black" />
        )}
      </Button>
    </div>
  );
}
