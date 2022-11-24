import { FC } from "react";

const Error: FC<{ clasName: string }> = ({ clasName }) => {
  return (
    <div
      className={` w-full ${clasName} sm:h-[calc(100vh-110px)] h-[calc(100vh-90px)] bg-gray-50 `}
    >
      <h1 className="text-2xl font-bold text-center pt-[10rem]">
        Something is Wrong!, Try Again.
      </h1>
    </div>
  );
};

export default Error;
