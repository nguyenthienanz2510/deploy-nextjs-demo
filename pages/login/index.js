import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { localStorageService } from "../../services/localStorageService";
import { userService } from "../../services/userService";

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data ---->", data);
    userService
      .postLogin(data)
      .then((res) => {
        console.log(res);
        if (res.data.isSuccessful == "false") {
          Swal.fire("OOpss!!! Your account or password is incorrect!!!");
        } else {
          Swal.fire(
            `Hello <span class = "text-color-primary">User ${res.data.userId}</span> !!! We will redirect you to the homepage!!!`
          );
          localStorageService.setUserInfo(res.data.userId);
          console.log("userId: ", res.data.userId);
          setTimeout(() => {
            router.push("/");
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen px-3 sm:p-0">
      <div className="w-[558px] h-[800px]  text-center">
        <h2 className="font-medium text-5xl mt-20 ">Sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mt-10">
              <label
                className="font-medium text-lg block text-left"
                htmlFor="emailInput"
              >
                User Name
              </label>
              <input
                type="user"
                name="user"
                className="font-normal text-base leading-5 p-4 rounded-2xl w-full mt-3 border border-color-border focus:border-color-primary"
                id="emailInput"
                placeholder="Enter your Email address"
                {...register("user", {
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                })}
              />

              {Object.keys(errors).length !== 0 && (
                <>
                  {errors.user?.type === "required" && (
                    <p className=" text-red-600 text-left mt-2">
                      Email is required
                    </p>
                  )}
                  {errors.user?.type === "pattern" && (
                    <p className=" text-red-600 text-left mt-2">
                      INVALID Email !!!
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="mt-5">
              <label
                className="font-medium text-lg block text-left"
                htmlFor="passwordInput"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="font-normal text-base leading-5 p-4 rounded-2xl w-full mt-3 border border-color-border"
                id="passwordInput"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />

              {Object.keys(errors).length !== 0 && (
                <>
                  {errors.password?.type === "required" && (
                    <p className=" text-red-600 text-left mt-2">
                      password is required
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer"
                id="rememberInput"
              />
              <label
                className="font-normal text-base ml-3 cursor-pointer"
                htmlFor="rememberInput"
              >
                Remember Me TEST
              </label>
            </div>
            <Link href="/forgot-password">
              <a className="text-color-primary ">Forgot password?</a>
            </Link>
          </div>
          <button
            type="submit"
            className="mt-11 px-24 py-4 bg-background-button text-color-white font-medium text-lg rounded-xl"
          >
            Sign In
          </button>
        </form>
        <div className=" mt-10 ">
          <div>
            <span className="font-normal text-base">Or sign in with</span>
          </div>
          <div className="flex mt-5 justify-center">
            {/* <a href="https://www.google.com/">
              <Image
                src="assets/images/google.png"
                alt="Picture of the author"
                width={40}
                height={40}
              />
            </a>
            <a href="https://www.facebook.com/" className="mx-12">
              <Image
                src="assets/images/facebook.png"
                alt="Picture of the author"
                width={40}
                height={40}
              />
            </a>
            <a href="https://twitter.com/">
              <Image
                src="assets/images/twitter.png"
                alt="Picture of the author"
                width={40}
                height={40}
              />
            </a> */}
          </div>
        </div>
        <p className="mt-10">
          Don’t have an account?{" "}
          <Link href="/register">
            <a className="text-color-primary">Register Now</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
