import {
  CirclePlay,
  Facebook,
  Instagram,
  Phone,
  Snowflake,
  Star,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TeacherCardProps = {
  image: string;
  name: string;
  job: string;
  review: Number;
  rate: Number;
  courses: Number;
  social: {
    website: string;
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
  };
};
export default function TeacherCard({
  image,
  name,
  job,
  review,
  rate,
  courses,
  social,
}: TeacherCardProps) {
  return (
    <div className="flex w-full justify-between text-xl py-14 bg-white px-40">
      <div className="flex gap-10">
        <Image
          src={image}
          width={200}
          height={200}
          alt="overview"
          className="rounded-full w-40 h-40"
        />
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-4xl">{name}</h1>
          <p className="text-text-GRAY">{job}</p>
          <div className="flex">
            <div className="flex gap-4">
              <div className="flex gap-2">
                <Star fill="#FD8E1F" color="#FD8E1F" />
                <p className="font-bold">{rate.toString()}</p>
                <p className="text-text-GRAY">({review.toString()} review)</p>
              </div>
              <div className="flex gap-2">
                <CirclePlay fill="#0066FF" color="white" />
                <p className="font-bold">
                  {courses.toString()}{" "}
                  <span className="text-text-GRAY font-normal">courses</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4">
        <Link href={social.website} className="flex gap-3 text-primary">
          <Snowflake />
          <p>{social.website}</p>
        </Link>
        <div className="flex gap-4">
          {social.facebook && (
            <Link
              href={social.facebook}
              className="bg-secondary-background p-3"
            >
              <Facebook color="#4E5566" />
            </Link>
          )}
          {social.twitter && (
            <Link href={social.twitter} className="bg-secondary-background p-3">
              <Twitter color="#4E5566" />
            </Link>
          )}
          {social.instagram && (
            <Link
              href={social.instagram}
              className="bg-secondary-background p-3"
            >
              <Instagram color="#4E5566" />
            </Link>
          )}
          {social.youtube && (
            <Link href={social.youtube} className="bg-secondary-background p-3">
              <Youtube color="#4E5566" />
            </Link>
          )}
          {social.whatsapp && (
            <Link
              href={social.whatsapp}
              className="bg-secondary-background p-3"
            >
              <Phone color="#4E5566" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
