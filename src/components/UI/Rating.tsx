import { FC, useState } from "react";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

const Rating: FC<{ rating: string; clasName: string }> = (props) => {
  const fRating = Math.trunc(+props.rating);
  let fullRating = fRating;
  const decimalRating = (+props.rating % 1) * 100;
  if (decimalRating >= 75) {
    fullRating++;
  }

  const coloredStars = [];

  for (let i = 0; i < fullRating; i++) {
    coloredStars.push(
      <BsStarFill className={`text-yellow-400 ${props.clasName}`} />
    );
  }

  if (decimalRating < 75 && decimalRating >= 25) {
    coloredStars.push(
      <BsStarHalf className={`text-yellow-400 ${props.clasName}`} />
    );
  }

  if (coloredStars.length < 5) {
    for (let index = 0; index < 5 - coloredStars.length; index++) {
      coloredStars.push(
        <BsStar className={`text-yellow-400 ${props.clasName}`} />
      );
    }
  }

  return <div className="flex">{coloredStars.map((item) => item)}</div>;
};

export default Rating;
