import React from "react";

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({ onClick }: ButtonProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-blue-500 text-white font-bold py-2 px-4
             rounded not-last:hover:bg-blue-700 hover:cursor-pointer transition-colors duration-300"
      >
        Start Journaling 🖋
      </button>
    </div>
  );
};
