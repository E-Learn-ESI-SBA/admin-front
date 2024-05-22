import Card from "@/components/courses/card";
import React from "react";

const cards = [
  {
    image: "/modules/card-pic.png",
    subject: "Architectures Évoluées des Ordinateurs",
    coef: 4,
    duration: "18 Semaines",
  },
  {
    image: "/modules/card-pic.png",
    subject: "Architectures Évoluées des Ordinateurs",
    coef: 4,
    duration: "19 Semaines",
  },
  {
    image: "/modules/card-pic.png",
    subject: "Architectures Évoluées des Ordinateurs",
    coef: 4,
    duration: "19 Semaines",
  },
];
export const Courses = () => {
  return (
    <div className="w-full flex justify-between m-8">
      <Card card={cards[0]} />
      <Card card={cards[1]} />
      <Card card={cards[2]} />
    </div>
  );
};
