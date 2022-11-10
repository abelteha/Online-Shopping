import { Link } from "react-router-dom";
import { Catagories } from "../model/catagories";

const SideBar = () => {
  return (
    <div className="w-[300px] bg-gray-100 overflow-scroll flex flex-col items-center">
      <h1 className="text-2xl font-bold my-6">Catagories</h1>
      <ul>
        {Catagories.map((cat) => (
          <Link
            to={`/categories/${cat.title}`}
            className="flex items-center text-lg mb-4 gap-4"
          >
            {cat.icon}
            <li className="">{cat.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;