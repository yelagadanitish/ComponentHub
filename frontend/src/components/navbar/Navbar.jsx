import { useState } from "react";
import { useLocation } from "react-router-dom";

import {
  FiBell,
  FiMenu,
  FiMoon
} from "react-icons/fi";

import MobileSidebar from "../sidebar/MobileSidebar";
import ProfileDropdown from "./ProfileDropdown";

import { pageTitles } from "../../constants/NavbarData";

function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const title =
    pageTitles[location.pathname] || "ComponentHub";

  return (
    <>

      <MobileSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div
        className="
        bg-white
        border-b
        border-slate-200
        h-20
        flex
        items-center
        justify-between
        px-6
        sticky
        top-0
        z-30
        "
      >

        {/* Left */}

        <div className="flex items-center gap-4">

          <FiMenu
            size={24}
            className="
            md:hidden
            cursor-pointer
            text-slate-700
            "
            onClick={() => setIsOpen(true)}
          />

          <h1 className="
          text-2xl
          font-bold
          text-slate-800
          ">
            {title}
          </h1>

        </div>

        {/* Right */}

        <div className="
        flex
        items-center
        gap-5
        ">

          <FiBell
            size={22}
            className="
            text-slate-600
            cursor-pointer
            hover:text-blue-600
            duration-300
            "
          />

          <FiMoon
            size={22}
            className="
            text-slate-600
            cursor-pointer
            hover:text-blue-600
            duration-300
            "
          />

          <ProfileDropdown />

        </div>

      </div>

    </>
  );
}

export default Navbar;