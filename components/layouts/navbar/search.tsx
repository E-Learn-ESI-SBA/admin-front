"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React, { ChangeEvent, KeyboardEvent } from "react";

// interface SearchProps {
//     value: string;
//     onChange: (event: ChangeEvent<HTMLInputElement>) => void;
//     onSubmit: () => void;
//     placeholder?: string;
//     className?: string;
//     disabled?: boolean;
// }

const SearchIn: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const onSubmit = () => {
    console.log(value);
  };
  return (
    <div className="flex bg-secondary-background p-2 rounded-full max-w-[340px] items-center">
      <Button className="bg-transparent border-none">
        <Search color="#718EBF" />
      </Button>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            onSubmit();
          }
        }}
        placeholder="Search for something"
        className={cn(
          "text-customBlue placeholder:text-customBlue py-2 w-auto focus:outline-none bg-transparent",
        )}
      />
    </div>
  );
};

export default SearchIn;
