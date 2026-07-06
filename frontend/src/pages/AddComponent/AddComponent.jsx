import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";

import toast from "react-hot-toast";

import { addComponent } from "../../services/componentService";
import { uploadImage } from "../../services/imageService";

function AddComponent() {

  const [componentName, setComponentName] = useState("");

  const [category, setCategory] = useState("Sensor");

  const [actualStock, setActualStock] = useState("");

  const [currentStock, setCurrentStock] = useState("");

  const [image, setImage] = useState(null);

  const handleAddComponent = async () => {

    try {

      if (
        !componentName ||
        !actualStock ||
        !currentStock
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;

      }

      await addComponent({

        componentName,

        category,

        actualStock: Number(actualStock),

        currentStock: Number(currentStock)

      });

      // Upload image to Cloudinary

      if (image) {

        await uploadImage(

          componentName,

          image

        );

      }

      toast.success(
        "Component added successfully"
      );

      setComponentName("");

      setCategory("Sensor");

      setActualStock("");

      setCurrentStock("");

      setImage(null);

    }

    catch (error) {

      if (

        error.response?.data?.message

      ) {

        toast.error(

          error.response.data.message

        );

      }

      else {

        toast.error(

          "Failed to add component"

        );

      }

      console.log(error);

    }

  };

  return (

    <MainLayout>

      <div
        className="
        max-w-3xl
        mx-auto
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-slate-200
        p-8
        "
      >

        <h1 className="text-3xl font-bold text-slate-800 mb-8">

          Add New Component

        </h1>

        {/* Component Name */}

        <div className="mb-6">

          <label className="block text-slate-700 font-medium mb-2">

            Component Name

          </label>

          <input

            type="text"

            value={componentName}

            onChange={(e) =>
              setComponentName(e.target.value)
            }

            className="
            w-full
            px-5
            py-4
            rounded-2xl
            border
            border-slate-200
            outline-none
            focus:border-blue-600
            "

          />

        </div>


        {/* Category */}

        <div className="mb-6">

          <label className="block text-slate-700 font-medium mb-2">

            Category

          </label>

          <select

            value={category}

            onChange={(e) =>
              setCategory(e.target.value)
            }

            className="
            w-full
            px-5
            py-4
            rounded-2xl
            border
            border-slate-200
            outline-none
            focus:border-blue-600
            "

          >

            <option>Sensor</option>
            <option>Controller</option>
            <option>Motor</option>
            <option>Display</option>
            <option>LED</option>
            <option>Passive Component</option>
            <option>Tool</option>
            <option>Cable</option>
            <option>Communication Module</option>
            <option>Shield</option>
            <option>Mechanical Component</option>
            <option>Miscellaneous</option>

          </select>

        </div>


        {/* Actual Stock */}

        <div className="mb-6">

          <label className="block text-slate-700 font-medium mb-2">

            Actual Stock

          </label>

          <input

            type="number"

            value={actualStock}

            onChange={(e) =>
              setActualStock(e.target.value)
            }

            className="
            w-full
            px-5
            py-4
            rounded-2xl
            border
            border-slate-200
            outline-none
            focus:border-blue-600
            "

          />

        </div>


        {/* Current Stock */}

        <div className="mb-6">

          <label className="block text-slate-700 font-medium mb-2">

            Current Stock

          </label>

          <input

            type="number"

            value={currentStock}

            onChange={(e) =>
              setCurrentStock(e.target.value)
            }

            className="
            w-full
            px-5
            py-4
            rounded-2xl
            border
            border-slate-200
            outline-none
            focus:border-blue-600
            "

          />

        </div>


        {/* Component Image */}

        <div className="mb-8">

          <label className="block text-slate-700 font-medium mb-2">

            Component Image

          </label>

          <input

            type="file"

            accept="image/*"

            onChange={(e) =>
              setImage(
                e.target.files[0]
              )
            }

            className="
            w-full
            px-5
            py-4
            rounded-2xl
            border
            border-slate-200
            "

          />

        </div>


        <button

          onClick={handleAddComponent}

          className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-4
          rounded-2xl
          font-semibold
          duration-300
          "

        >

          Add Component

        </button>

      </div>

    </MainLayout>

  );

}

export default AddComponent;

