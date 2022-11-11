import { FC } from "react";

const Loader: FC<{ clasName: string }> = ({ clasName }) => {
  return (
    <div
      className={`${clasName} h-[100vh] flex justify-center pt-[10rem] bg-black/5 `}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
