import React, { useEffect, useState } from "react";
import Button from "../Button/Button";

const Rating = ({ bulletsQuantity = 5, submitRate, rateText }) => {
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
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="flex flex-col justify-center items-center gap-3">
        <p>Rate the {rateText} :</p>
        <div className="flex gap-2">{printBullets()}</div>
      </div>

      <Button text="Send" onClick={onSubmitClick} />
    </div>
  );
};

export default Rating;
