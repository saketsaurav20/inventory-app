import React from "react";

interface CardProps {
  icon?: React.ReactNode;
  title: string;
  value: string | number;
}

const Card = ({ icon, title, value }: CardProps) => {
  return (
    <div
      className="bg-darkGreen text-white p-4 rounded-lg flex items-center space-x-4 shadow-md w-full mx-[1.35rem]"
      role="group"
      aria-labelledby="card-title"
      aria-describedby="card-value"
    >
      <div className="text-4xl">{icon}</div>
      <div>
        <div id="card-title" className="text-sm">{title}</div>
        <div id="card-value" className="text-3xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default Card;
