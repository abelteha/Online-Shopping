import { update, ref as reff, onValue } from "firebase/database";
import { FC, FormEvent, Fragment, useEffect, useRef, useState } from "react";
import fbImg from "../../assets/FB.jpg";
import { db } from "../../firebase";
import { uid } from "uid";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { useNavigate } from "react-router-dom";

import { ProductsAction } from "../../redux/slices/products-slice";
import { feedBacks } from "../../types/types";

const Feedback: FC<{ prodName: string; prodId: number }> = ({ prodId }) => {
  const [enteredFeedback, setEnteredFeedback] = useState("");
  const user = useAppSelector((state) => state.userReducer);
  const auth = useAppSelector((state) => state.authReducer);
  const divRef = useRef<HTMLDivElement>(null);
  const product = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const feedbackSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (auth.isAuthenticated === true) {
      const uuid = uid();
      console.log("in feedback");

      update(reff(db, `feedbacks/${uuid}`), {
        feedback: enteredFeedback,
        id: prodId,
        name: user.userName,
        image: user.image,
        feedNo: product.feedbackNumber,
      });

      onValue(reff(db, `feedbacks/`), (snapshot) => {
        const data = snapshot.val();
        dispatch(ProductsAction.setProductsFeedback(data));
      });
    } else {
      navigate("/signin");
    }
    setEnteredFeedback("");
  };
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = 1000000;
    }
  });

  let sortedArray: feedBacks[] = [];
  if (product.singleProductFeedback.length > 0) {
    sortedArray = [...product.singleProductFeedback];
    sortedArray = sortedArray.sort((a, b) =>
      a.feedNo > b.feedNo ? 1 : b.feedNo > a.feedNo ? -1 : 0
    );
  }

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
          <div
            ref={divRef}
            className="w-[90%] h-[300px]  md:max-w-[500px]  bg-white overflow-scroll my-4 shadow-inner border"
          >
            <div className=" flex flex-col gap-5 w-full my-5 ">
              {sortedArray.map((f) => (
                <div
                  className={`flex ${
                    f.name === user.userName &&
                    "flex-row-reverse justify-between "
                  } gap-5 bg-[#fce8da] min-h-[5rem] items-center mx-5   p-5 rounded-lg`}
                >
                  <img
                    src={f.image}
                    alt=""
                    className="w-[3rem] h-[3rem] rounded-full"
                  />
                  <div className="flex flex-col max-w-[20rem]">
                    <p className="text-sm text-[#a75b29] font-bold">{f.name}</p>
                    <p>{f.feedback}</p>
                  </div>
                </div>
              ))}{" "}
            </div>
          </div>
          <form className="text-center">
            <textarea
              name="txtArea"
              id="txtArea"
              cols={40}
              rows={4}
              value={enteredFeedback}
              onChange={(e) => setEnteredFeedback(e.target.value)}
              placeholder="Write your feedback here"
              className="p-4 rounded-xl my-4 w-[90%] outline-[#C56E33] border"
            ></textarea>
            <button
              type="submit"
              className=" hover:bg-[#a75b29] bg-[#C56E33] w-[10rem] rounded-lg  text-white p-2"
              onClick={feedbackSubmitHandler}
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
