import { FC } from "react";

const BirthdaySection: FC = () => {
  return (
    <div className="my-4">
      <h3 className="mb-4 text-base font-semibold">Birthdays</h3>
      <div className="flex items-center">
        <span className="mr-2 text-2xl">🎂</span>
        <p className="text-sm">
          <span className="font-semibold">Ibn Lokman</span> and{" "}
          <span className="font-semibold">3 others</span> have birthdays today.
        </p>
      </div>
    </div>
  );
};

export default BirthdaySection;
