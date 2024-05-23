import React from "react";

type Props = {
  content: string;
};

export const AboutMe = ({ content }: Props) => {
  const paragraphs = content.split("\n");
  return (
    <div className="border p-20 bg-white h-fit my-4">
      <h1 className="font-semibold text-3xl text-black mb-6">ABOUT ME</h1>
      {paragraphs.map((paragraph, index) => (
        <>
          <p className="text-text-GRAY" key={index}>
            {paragraph}
          </p>
          <br />
        </>
      ))}
    </div>
  );
};
