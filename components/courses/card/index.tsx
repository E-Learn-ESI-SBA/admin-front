import Image from "next/image";
import card from "@/types/card";
interface CardProps {
  card: card;
}
const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div>
      <Image
        src={card.image}
        alt="course picture"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-1/2 object-cover rounded-t-xl "
      />
      <div className="p-2 flex flex-col gap-y-8 bg-white shadow-lg  rounded-b-xl">
        <p className="text-lg font-semibold"> {card.subject} </p>
        <div className="flex justify-between items-center text-base  font-medium ">
          <p>Coéfficient {card.coef} </p>
          <p> {card.duration} </p>
        </div>
      </div>
    </div>
  )
}

export default Card

