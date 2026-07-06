import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

function ProfileDropdown() {

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // Get logged in user

  const adminName = localStorage.getItem("adminName");

  const visitorName = localStorage.getItem("visitorName");

  const displayName = adminName || visitorName || "User";

  const isAdmin = localStorage.getItem("isAdmin");

  const handleLogout = () => {

    localStorage.removeItem("isAdmin");

    localStorage.removeItem("adminName");

    localStorage.removeItem("visitorName");

    navigate("/");

  };

  return (

    <div className="relative">

      <button

        onClick={() => setOpen(!open)}

        className="flex items-center gap-2"

      >

        <div

          className="
          w-11
          h-11
          rounded-full
          bg-blue-600
          text-white
          flex
          items-center
          justify-center
          font-bold
          shadow-md
          "

        >

          {displayName.charAt(0).toUpperCase()}

        </div>

        <FiChevronDown />

      </button>

      {

        open && (

          <div

            className="
            absolute
            right-0
            top-14
            bg-white
            rounded-2xl
            shadow-xl
            border
            border-slate-200
            w-56
            overflow-hidden
            z-50
            "

          >

            <div

              className="
              px-5
              py-3
              border-b
              border-slate-200
              "

            >

              <p className="font-semibold text-slate-800">

                {displayName}

              </p>

              <p className="text-xs text-slate-500 mt-1">

                {isAdmin ? "Administrator" : "User"}

              </p>

            </div>

            <button

              className="
              w-full
              px-5
              py-3
              text-left
              hover:bg-slate-100
              duration-200
              "

            >

              Profile

            </button>

            <button

              onClick={handleLogout}

              className="
              w-full
              px-5
              py-3
              text-left
              text-red-500
              hover:bg-red-50
              duration-200
              "

            >

              Logout

            </button>

          </div>

        )

      }

    </div>

  );

}

export default ProfileDropdown;