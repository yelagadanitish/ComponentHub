import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiPackage,
  FiSend
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

function KitCard({

  kit,

  onView,

  onEdit,

  onDelete

}) {

  const navigate = useNavigate();

  const isAdmin =
    localStorage.getItem("isAdmin") === "true";

  const getStatusColor = () => {

    switch (kit.status) {

      case "AVAILABLE":
        return "bg-green-100 text-green-700";

      case "LOW":
        return "bg-yellow-100 text-yellow-700";

      case "OUT_OF_STOCK":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";

    }

  };

  return (

    <div
      className="
      bg-white
      rounded-3xl
      shadow-md
      hover:shadow-xl
      duration-300
      overflow-hidden
      border
      border-slate-200
      "
    >

      {/* Image */}

      <div className="h-52 bg-slate-100 flex items-center justify-center">

        {

          kit.imageUrl ?

            <img

              src={kit.imageUrl}

              alt={kit.kitName}

              className="w-full h-full object-cover"

            />

            :

            <FiPackage

              size={70}

              className="text-slate-400"

            />

        }

      </div>

      {/* Body */}

      <div className="p-5">

        <h2 className="text-xl font-bold text-slate-800">

          {kit.kitName}

        </h2>

        <p className="text-slate-500 mt-2 line-clamp-2">

          {kit.description || "No description"}

        </p>

        {/* Details */}

        <div className="mt-5 space-y-2 text-sm">

          <div className="flex justify-between">

            <span>Components</span>

            <span className="font-semibold">

              {kit.componentCount}

            </span>

          </div>

          <div className="flex justify-between">

            <span>Available Kits</span>

            <span className="font-semibold">

              {kit.availableKits}

            </span>

          </div>

          <div className="flex justify-between">

            <span>Limited By</span>

            <span className="font-semibold text-red-500">

              {kit.limitingComponent}

            </span>

          </div>

        </div>

        {/* Status */}

        <div className="mt-5">

          <span
            className={`px-4 py-2 rounded-full text-xs font-semibold ${getStatusColor()}`}
          >

            {

              kit.status === "AVAILABLE"

                ? "🟢 Available"

                : kit.status === "LOW"

                ? "🟡 Low Stock"

                : "🔴 Out Of Stock"

            }

          </span>

        </div>

        {/* Buttons */}

        <div className="mt-6 flex flex-wrap gap-3">

          {/* View */}

          <button

            onClick={() => onView(kit)}

            className="
            flex
            items-center
            gap-2
            text-blue-600
            hover:text-blue-800
            "

          >

            <FiEye />

            View

          </button>

          {/* Issue */}

          <button

            onClick={() =>

              navigate("/issue-kits")

            }

            className="
            flex
            items-center
            gap-2
            text-purple-600
            hover:text-purple-800
            "

          >

            <FiSend />

            Issue

          </button>

          {/* Admin Only */}

          {

            isAdmin && (

              <>

                <button

                  onClick={() => onEdit(kit)}

                  className="
                  flex
                  items-center
                  gap-2
                  text-green-600
                  hover:text-green-800
                  "

                >

                  <FiEdit />

                  Edit

                </button>

                <button

                  onClick={() => onDelete(kit)}

                  className="
                  flex
                  items-center
                  gap-2
                  text-red-600
                  hover:text-red-800
                  "

                >

                  <FiTrash2 />

                  Delete

                </button>

              </>

            )

          }

        </div>

      </div>

    </div>

  );

}

export default KitCard;