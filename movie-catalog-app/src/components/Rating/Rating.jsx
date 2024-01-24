import React, { useEffect, useState } from "react";
import Button from "../Button/Button";

const Rating = ({ bulletsQuantity = 5, submitRate }) => {
  const bulletsArray = Array.from({ length: bulletsQuantity });
  const [selectedBullet, setSelectedBullet] = useState(-1);

  const printBullets = () => {
    const printedBullets = bulletsArray.map((bullet, index) => {
      return (
        <span
          key={index}
          onClick={() => setSelectedBullet(index)}
          className={`border border-cyberPink p-2 rounded ${
            selectedBullet >= index ? "bg-cyberPink" : ""
          }`}
        />
      );
    });
    return printedBullets;
  };

  const onSubmitClick = () => {
    submitRate(selectedBullet + 1);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <div className="flex gap-2">{printBullets()}</div>
      <Button text="Send Rate" onClick={onSubmitClick} />
    </div>
  );
};

export default Rating;
