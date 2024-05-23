import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  name: string;
  DateTime: string;
  content: string;
  stars: number;
};

export const ReviewCard = ({
  image,
  name,
  DateTime,
  content,
  stars,
}: Props) => {
  const time = TimeAgo(DateTime);
  const starIcons = [];

  for (let i = 0; i < stars; i++) {
    starIcons.push(<Star key={i} fill="#FD8E1F" color="#FD8E1F" />);
  }
  return (
    <div className="flex gap-4">
      <Image
        src={image}
        width={200}
        height={200}
        alt="overview"
        className="rounded-full w-14 h-14"
      />
      <div className="flex flex-col gap-4">
        <div className="flex text-text-GRAY gap-4 text-base items-center">
          <h3 className="text-black text-2xl">{name}</h3>
          <p>•</p>
          <p>{time}</p>
        </div>
        <div className="flex">{starIcons}</div>
        <p className="text-xl font-light">{content}</p>
      </div>
    </div>
  );
};

const TimeAgo = (dateTime: string) => {
  const now = new Date();
  const datetime = new Date(dateTime);
  const diff = Math.abs(now.getTime() - datetime.getTime());

  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diff < minute) {
    return `${Math.floor(diff / 1000)} seconds ago`;
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)} mins ago`;
  } else if (diff < day) {
    return `${Math.floor(diff / hour)} hours ago`;
  } else if (diff < week) {
    return `${Math.floor(diff / day)} days ago`;
  } else if (diff < month) {
    return `${Math.floor(diff / week)} weeks ago`;
  } else if (diff < year) {
    return `${Math.floor(diff / month)} months ago`;
  } else {
    return `${Math.floor(diff / year)} years ago`;
  }
};
