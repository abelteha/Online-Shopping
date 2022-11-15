import { FC } from "react";

const Loader: FC<{ clasName: string }> = ({ clasName }) => {
  return (
    <div
      className={`md:w-[calc(100vw-300px)] w-full sm:h-[calc(100vh-110px)] h-[calc(100vh-90px)] bg-gray-50 flex justify-center pt-20 `}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
