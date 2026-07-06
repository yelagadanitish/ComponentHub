import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import toast from "react-hot-toast";

import {
  getAllKits,
  deleteKit
} from "../../services/kitService";

import KitCard from "../../components/kits/KitCard";
import KitModal from "../../components/kits/KitModal";
import KitSearch from "../../components/kits/KitSearch";

function ViewKits() {

  const navigate = useNavigate();

  const [kits, setKits] = useState([]);

  const [filteredKits, setFilteredKits] = useState([]);

  const [selectedKit, setSelectedKit] = useState(null);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAdmin =
    localStorage.getItem("isAdmin") === "true";

  // ===========================
  // Fetch Kits
  // ===========================

  const fetchKits = async () => {

    try {

      const response =
        await getAllKits();

      setKits(response.data);

      setFilteredKits(response.data);

    }

    catch (error) {

      console.log(error);

      toast.error(
        "Failed to load kits"
      );

    }

  };

  useEffect(() => {

    fetchKits();

  }, []);

  // ===========================
  // Search
  // ===========================

  useEffect(() => {

    const filtered = kits.filter(

      (kit) =>

        kit.kitName

          .toLowerCase()

          .includes(

            search.toLowerCase()

          )

    );

    setFilteredKits(filtered);

  }, [search, kits]);

  // ===========================
  // View
  // ===========================

  const handleView = (kit) => {

    setSelectedKit(kit);

    setIsModalOpen(true);

  };

  // ===========================
  // Edit
  // ===========================

  const handleEdit = (kit) => {

    navigate(

      `/edit-kit/${kit._id}`

    );

  };

  // ===========================
  // Delete
  // ===========================

  const handleDelete = async (kit) => {

    if (

      !window.confirm(

        `Delete ${kit.kitName}?`

      )

    )

      return;

    try {

      await deleteKit(

        kit._id

      );

      toast.success(

        "Kit Deleted"

      );

      fetchKits();

    }

    catch (error) {

      toast.error(

        "Delete Failed"

      );

    }

  };

    return (

    <MainLayout>

      <div className="max-w-7xl mx-auto p-6">

        {/* Search */}

        <KitSearch

          search={search}

          setSearch={setSearch}

        />

        {/* Heading */}

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-slate-800">

            Kits

          </h1>

          {

            isAdmin && (

              <button

                onClick={() =>

                  navigate("/create-kit")

                }

                className="
                bg-blue-600
                hover:bg-blue-700
                hover:shadow-xl
                hover:scale-[1.02]
                active:scale-[0.98]
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                duration-300
                "

              >

                + Create Kit

              </button>

            )

          }

        </div>

        {/* No Kits */}

        {

          filteredKits.length === 0 ? (

            <div
              className="
              bg-white
              rounded-3xl
              shadow
              p-12
              text-center
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                text-slate-700
                "
              >

                No Kits Found

              </h2>

            </div>

          )

          :

          (

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
              "
            >

              {

                filteredKits.map(

                  (kit) => (

                    <KitCard

                      key={kit._id}

                      kit={kit}

                      onView={handleView}

                      onEdit={

                        isAdmin

                          ? handleEdit

                          : () => {}

                      }

                      onDelete={

                        isAdmin

                          ? handleDelete

                          : () => {}

                      }

                    />

                  )

                )

              }

            </div>

          )

        }

        {/* Modal */}

        <KitModal

          isOpen={isModalOpen}

          onClose={() =>

            setIsModalOpen(false)

          }

          kit={selectedKit}

        />

      </div>

    </MainLayout>

  );

}

export default ViewKits;