import { FC } from "react";

const Loader: FC<{ width: number }> = ({ width }) => {
  return (
    <div
      className={`w-[${width}%] h-[100vh] flex justify-center pt-[10rem] bg-black/5 `}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
