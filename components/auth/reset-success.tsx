import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import checkMark from "../../public/assets/auth/Check.png";
import { AuthOption } from "./auth";

export default function ResetSuccess({
  setSelectedAuth,
}: {
  setSelectedAuth: (value: AuthOption) => void;
}) {
  return (
    <div className=" flex flex-col items-center justify-center gap-8 max-w-[380px] w-full">
      <Image src={checkMark} height={100} width={100} alt="Checkmark" />

      <Button
        className=" w-full bg-blue-600 text-white"
        onClick={() => setSelectedAuth("LOGIN")}
      >
        Back to Login
      </Button>
    </div>
  );
}
