import axios from "axios";
import { Dispatch } from "react";
import { useAppDispatch } from "../../model/hooks";
import { UserRegister } from "../../types/types";
import { setUserCart } from "../slices/user-slice";

export const userRegister = (requestObject: UserRegister) => {
  axios
    .post(
      `https://ecommerce-auth-7369e-default-rtdb.europe-west1.firebasedatabase.app/users.json`,
      requestObject
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data.error.message);
      } else {
        console.log(error.message);
      }
    });
};

export const fetchUser = () => {
  return async (dispatch: Dispatch<any>) => {
    const userFetch = () => {
      axios(
        "https://ecommerce-auth-7369e-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      )
        .then((res) => {
          for (let key in res.data) {
            const userEmail = localStorage.getItem("userEmail");

            if (res.data[key].email === userEmail) {
              console.log(res.data[key]);

              dispatch(setUserCart(res.data[key]));
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data.error.message);
          } else {
            console.log(error.message);
          }
        });
    };
    userFetch();
  };
};
