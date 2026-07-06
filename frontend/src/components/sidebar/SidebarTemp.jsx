import {
  FiHome,
  FiBox,
  FiAlertTriangle,
  FiActivity,
  FiPlusCircle,
  FiLogOut,
  FiRepeat,
  FiUsers,
  FiPackage,
  FiArchive
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";

function Sidebar() {

  const navigate = useNavigate();

  const isAdmin =
    localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {

    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminName");

    navigate("/");

  };

  return (

    <div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0">

      <div className="p-6">

        <h1 className="text-2xl font-bold text-blue-600">
          ComponentHub
        </h1>

      </div>

      <div className="flex flex-col gap-2 px-4">

        <SidebarItem
          icon={<FiHome />}
          title="Dashboard"
          path="/dashboard"
        />

        <SidebarItem
          icon={<FiBox />}
          title="Components"
          path="/components"
        />

        {/* ================= KIT MANAGEMENT ================= */}

        <div className="mt-4 mb-1 px-3">

          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">

            Kit Management

          </p>

        </div>

        <SidebarItem
          icon={<FiArchive />}
          title="Issue Kits"
          path="/issue-kits"
        />

        {

          isAdmin && (

            <>

              <SidebarItem
                icon={<FiPackage />}
                title="View Kits"
                path="/kits"
              />

              <SidebarItem
                icon={<FiPlusCircle />}
                title="Create Kit"
                path="/create-kit"
              />

            </>

          )

        }

        {/* ================= INVENTORY ================= */}

        <div className="mt-4 mb-1 px-3">

          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">

            Inventory

          </p>

        </div>

        <SidebarItem
          icon={<FiAlertTriangle />}
          title="Low Stock"
          path="/low-stock"
        />

        {

          isAdmin && (

            <SidebarItem
              icon={<FiPlusCircle />}
              title="Add Component"
              path="/add-component"
            />

          )

        }

        {

          isAdmin && (

            <SidebarItem
              icon={<FiRepeat />}
              title="Transaction"
              path="/transaction"
            />

          )

        }

        {/* ================= ADMIN ================= */}

        {

          isAdmin && (

            <>

              <div className="mt-4 mb-1 px-3">

                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">

                  Administration

                </p>

              </div>

              <SidebarItem
                icon={<FiUsers />}
                title="User Activity"
                path="/user-activity"
              />

              <SidebarItem
                icon={<FiActivity />}
                title="Admin Activity"
                path="/admin-activity"
              />

              <button

                onClick={handleLogout}

                className="
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                text-red-500
                hover:bg-red-50
                duration-300
                "

              >

                <FiLogOut />

                <span className="font-medium">

                  Logout

                </span>

              </button>

            </>

          )

        }

      </div>

    </div>

  );

}

export default Sidebar;