"use client";
import React, { useState } from "react";
import TeacherCard from "./teacher-card";
import { AboutMe } from "./about-me";
import { StudentsFeedback } from "./students-feedback";
import { Courses } from "./courses";

const data = {
  image: "/assets/teacher.jpeg",
  name: "John Doe",
  job: "Math Teacher",
  review: 10,
  rate: 4.5,
  courses: 5,
  social: {
    website: "https://www.example.com",
    facebook: "https://www.facebook.com/example",
    twitter: "https://twitter.com/example",
    instagram: "https://www.instagram.com/example",
    youtube: "https://www.youtube.com/example",
    whatsapp: "https://wa.me/1234567890",
  },
};

const aboutMe = `One day Vako had enough with the 9-to-5 grind, or more like 9-to-9 in his case, and quit his job, or more like got himself fired from his own startup.

He decided to work on his dream: be his own boss, travel the world, only do the work he enjoyed, and make a lot more money in the process. No more begging for vacation days and living from paycheck to paycheck. After trying everything from e-commerce stores to professional poker his lucky break came when he started freelance design. Vako fell in love with the field that gives him the lifestyle of his dreams.

Vako realizes that people who take courses on Udemy want to transform their lives. Today with his courses and mentoring Vako is helping thousands of people transform their lives, just like he did once.`;

export default function Teachers() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="text-black bg-secondary-background">
      <TeacherCard {...data} />

      <div className="flex px-40">
        <div className="w-[30%]">
          <AboutMe content={aboutMe} />
        </div>
        <div className="w-[70%]">
          <div className="my-4 py-4 mx-auto bg-secondary-background rounded-3xl h-fit">
            <div className="border-b-2 px-8 flex justify-start items-center gap-x-8 cursor-pointer text-2xl font-medium">
              <a
                className={selected ? "" : "selected"}
                onClick={() => setSelected(0)}
              >
                Courses
              </a>
              <a
                className={selected ? "selected" : ""}
                onClick={() => setSelected(1)}
              >
                Review
              </a>
            </div>

            {selected ? <StudentsFeedback /> : <Courses />}
          </div>
        </div>
      </div>
    </div>
  );
}
