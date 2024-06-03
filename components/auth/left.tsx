import saly from "../../public/assets/auth/Saly-10.png";
import stars from "../../public/assets/auth/stars.svg";
import Image from "next/image";

export default function LeftSection() {
  return (
    <div className="w-full md:w-1/2 h-full flex-col justify-start items-center hidden md:flex bg-blue-700 relative">
      <Image height={700} width={700} src={saly} alt="Saly" className="z-10" />
      <Image
        height={400}
        width={400}
        src={stars}
        alt="stars"
        className="absolute bottom-0 left-0 z-0"
      />
      <Image
        height={400}
        width={400}
        src={stars}
        alt="stars"
        className="absolute top-0 right-0 z-0"
      />
    </div>
  );
}
