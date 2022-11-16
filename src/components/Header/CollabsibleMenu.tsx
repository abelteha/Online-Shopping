import { FC } from "react";
import { Link } from "react-router-dom";
import { Catagories } from "../../model/catagories";

const CollabsibleMenu: FC<{
  toggleOpen: boolean;
  hamburgerMenuHandler: () => void;
}> = (props) => {
  return (
    <div className="sticky top-[6.9rem] z-10">
      <div
        className={`absolute top-[0rem] h-[calc(100vh-7rem)] w-2/3 bg-white/70 z-10 p-6  pl-[15%] md:hidden duration-300 backdrop-blur-xl overflow-scroll ${
          props.toggleOpen ? "left-0" : "-left-full"
        }`}
      >
        <h1 className="text-xl font-bold my-3">Catagories</h1>
        <ul>
          {Catagories.map((cat) => (
            <Link
              to={`/categories/${cat.title}`}
              className="flex items-center text-sm sm:text-md mb-4 gap-2"
              onClick={props.hamburgerMenuHandler}
            >
              {cat.icon}
              <li key={cat.title}>{cat.title}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollabsibleMenu;
