import Link from "next/link";
import { useEffect, useState } from "react";
import { localStorageService } from "../../services/localStorageService";
import Image from "next/image";
import React from "react";
import SideBar from "../layout/MyAccountLayout/SideBar";

function Header() {
  let [openMobileNav, setOpenMobileNav] = useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorageService.removeUserInfo();
      // console.log("You are on the browser");
    } else {
      // console.log("You are on the server");
    }
  };

  const [userInfor, setUserInfor] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserInfor(localStorageService.getUserInfo());
      // console.log("You are on the browser");
    } else {
      // console.log("You are on the server");
    }
  }, [userInfor]);

  const RenderUserNav = () => {
    // console.log("render User Nav");

    if (!!userInfor) {
      return (
        <div>
          <Link href="/myaccount">
            <button className="px-5 py-2 font-semibold text-color-primary transition-all">
              Hello {userInfor}!!!
            </button>
          </Link>

          <Link href="/login">
            <button
              onClick={handleLogout}
              className="px-5 py-2 font-semibold border rounded border-color-primary text-color-primary hover:text-white hover:bg-color-primary transition-all"
            >
              Log out
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link href="/login">
            <button className="px-5 py-2 font-semibold text-color-primary transition-all">
              Sign In
            </button>
          </Link>
          <Link href="/register">
            <button className="px-5 py-2 font-semibold border rounded border-color-primary text-color-primary hover:text-white hover:bg-color-primary transition-all">
              Create account
            </button>
          </Link>
        </div>
      );
    }
  };

  function handleOpenMobileNav() {
    openMobileNav ? setOpenMobileNav(false) : setOpenMobileNav(true);

    // console.log("run handleOpenMobileNav", openMobileNav);
  }

  return (
    <>
      <header className="">
        <div className="w-full flex justify-between items-center px-5 h-20 border-b">
          <Link href="/">
            <a>
              <Image
                src="assets/images/logo.png"
                alt="logo travelner"
                width={164}
                height={46}
              />
            </a>
          </Link>
          <div>
            <div className="hidden md:block">{RenderUserNav()}</div>
            <div
              className="flex justify-center md:hidden cursor-pointer h-20 w-20 absolute top-0 right-0 hover:bg-color-primary rounded"
              onClick={handleOpenMobileNav}
            >
              <Image
                src="assets/images/MyAccount/mobile-bar-icon.svg"
                alt="mobile-bar-icon"
                width={50}
                height={50}
              />
              {/* <div className="top-0 left-0 absolute z-10 w-screen h-screen bg-black bg-opacity-50">
                <div className="w-96 h-full bg-white pt-10">
                  {RenderUserNav()}
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {!!openMobileNav && (
          <div className="h-auto px-5 border-b block md:hidden">
            <div className="border-b py-5">{RenderUserNav()}</div>
            <div className="">
              <SideBar />
            </div>
            <div>
              <div
                onClick={handleOpenMobileNav}
                className="flex justify-center w-20 mx-auto bg-gray-100 rounded cursor-pointer hover:bg-color-primary"
              >
                <Image
                  src="assets/images/Icon/angle-up-solid.svg"
                  alt="mobile-bar-icon"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
