import { FC } from "react";

const Error: FC<{ width: number }> = ({ width }) => {
  return (
    <div className={`w-[${width}%] h-[100vh] bg-gray-50 `}>
      <h1 className="text-2xl font-bold text-center pt-[10rem]">
        Something is Wrong!, Try Again.
      </h1>
    </div>
  );
};

export default Error;
