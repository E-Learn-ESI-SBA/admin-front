import React from "react";
import { ReviewCard } from "./review-card";

const ReviewData = [
  {
    image: "/assets/teacher.jpeg",
    name: "John Doe",
    DateTime: "2022-03-25T12:00:00",
    content:
      "This course is just amazing! has great course content, the best practices, and a lot of real-world knowledge. I love the way of giving examples.tsx, the best tips by the instructor which are pretty interesting, fun and knowledgable and I was never getting bored throughout the course. This course meets more than my expectation and, I made the best investment of time to learn and practice what I am passionate about. Thank you so much to our excellent instructor Vako!! Highly recommend this course! Take the next step.",
    stars: 5,
  },
  {
    image: "/assets/teacher.jpeg",
    name: "Jane Smith",
    DateTime: "2022-03-24T10:30:00",
    content:
      "I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.",
    stars: 4,
  },
];

export const StudentsFeedback = () => {
  return (
    <div className="px-20 py-4 bg-secondary-background">
      <h1 className="text-black font-semibold text-4xl my-8">
        Students Feedback
      </h1>
      <div>
        <div className="my-8 border-b-2 py-4">
          <ReviewCard {...ReviewData[0]} />
        </div>
        <ReviewCard {...ReviewData[1]} />
      </div>
    </div>
  );
};
