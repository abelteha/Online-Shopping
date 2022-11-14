import { Fragment } from "react";
import fbImg from "../../assets/FB.jpg";
const Feedback = () => {
  return (
    <Fragment>
      <h1 className="text-[2rem] font-bold text-[#a75b29] text-center bg-gray-100 pt-10 animate-slideup">
        FeedBacks
      </h1>

      <div className="bg-gray-100 flex justify-center items-start gap-5 xl:gap-20">
        <img
          src={fbImg}
          alt=""
          className="w-[27rem] h-[30rem] lg:w-[30rem] rounded-xl hidden md:block ml-4 mt-14"
        />
        <div className=" flex flex-col items-center py-10 ">
          <div className="w-[90%] h-[300px]  md:max-w-[500px]  bg-white overflow-scroll my-4 shadow-inner border"></div>
          <form className="text-center">
            <textarea
              name="txtArea"
              id="txtArea"
              cols={40}
              rows={4}
              placeholder="Write your feedback here"
              className="p-4 rounded-xl my-4 w-[90%] outline-[#C56E33] border"
            ></textarea>
            <button
              type="submit"
              className=" hover:bg-[#a75b29] bg-[#C56E33] w-[10rem] rounded-lg  text-white p-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Feedback;
