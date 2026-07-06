import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import toast from "react-hot-toast";
import { FiTrash2, FiPlus } from "react-icons/fi";

import { getComponents } from "../../services/componentService";
import { createKit } from "../../services/kitService";
import { uploadKitImage } from "../../services/kitImageService";

function CreateKit() {

  const [kitName, setKitName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [components, setComponents] = useState([]);

  const [kitComponents, setKitComponents] = useState([
    {
      componentName: "",
      quantity: 1,
    },
  ]);

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
      const response = await getComponents();
      setComponents(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load components");
    }
  };

  const addRow = () => {
    setKitComponents([
      ...kitComponents,
      {
        componentName: "",
        quantity: 1,
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = [...kitComponents];
    updated.splice(index, 1);
    setKitComponents(updated);
  };

  const updateComponent = (index, field, value) => {
    const updated = [...kitComponents];
    updated[index][field] = value;
    setKitComponents(updated);
  };

  const handleSaveKit = async () => {
    try {
      if (!kitName.trim()) {
        toast.error("Enter Kit Name");
        return;
      }

      const validComponents = kitComponents.filter(
        (item) => item.componentName !== ""
      );

      if (validComponents.length === 0) {
        toast.error("Please add at least one component");
        return;
      }

      const names = validComponents.map(
        (item) => item.componentName
      );

      if (new Set(names).size !== names.length) {
        toast.error("Duplicate Components Found");
        return;
      }

      let imageUrl = "";

      if (image) {
        imageUrl = await uploadKitImage(image);
      }

      await createKit({
        kitName: kitName.trim(),
        description,
        imageUrl,
        createdBy: localStorage.getItem("adminName"),
        components: validComponents,
      });

      toast.success("Kit Created Successfully");

      setKitName("");
      setDescription("");
      setImage(null);

      setKitComponents([
        {
          componentName: "",
          quantity: 1,
        },
      ]);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to Create Kit"
      );
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

        <h1 className="text-3xl font-bold mb-8">
          Create New Kit
        </h1>

        <div className="mb-6">
          <label className="font-medium">
            Kit Name
          </label>

          <input
            value={kitName}
            onChange={(e) =>
              setKitName(e.target.value)
            }
            className="w-full mt-2 px-5 py-4 rounded-2xl border"
          />
        </div>

        <div className="mb-6">

          <label className="font-medium">

            Description

          </label>

          <textarea
            rows={3}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full mt-2 px-5 py-4 rounded-2xl border"
          />

        </div>

        <div className="mb-8">

  <label className="block font-medium mb-3">
    Kit Image
  </label>

  <div className="flex items-center gap-4">

    <label
      htmlFor="kitImage"
      className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-5
        py-3
        rounded-xl
        cursor-pointer
        font-medium
        shadow-md
        transition-all
        duration-300
      "
    >
      📁 Choose Image
    </label>

    <span className="text-gray-600">

      {image ? image.name : "No image selected"}

    </span>

  </div>

  <input
    id="kitImage"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) =>
      setImage(e.target.files[0])
    }
  />

</div>

        <h2 className="text-xl font-bold mb-4">
          Components
        </h2>
                {

          kitComponents.map((row, index) => (

            <div

              key={index}

              className="grid grid-cols-12 gap-3 mb-3"

            >

              <select

                value={row.componentName}

                onChange={(e) =>

                  updateComponent(

                    index,

                    "componentName",

                    e.target.value

                  )

                }

                className="col-span-7 px-4 py-3 rounded-xl border"

              >

                <option value="">

                  Select Component

                </option>

                {

                  components.map((component) => (

                    <option

                      key={component.componentName}

                      value={component.componentName}

                    >

                      {component.componentName}

                    </option>

                  ))

                }

              </select>

              <input

                type="number"

                min="1"

                value={row.quantity}

                onChange={(e) =>

                  updateComponent(

                    index,

                    "quantity",

                    Number(e.target.value)

                  )

                }

                className="col-span-3 px-4 py-3 rounded-xl border"

              />

              <button

                type="button"

                onClick={() => removeRow(index)}

                className="col-span-2 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center"

              >

                <FiTrash2 />

              </button>

            </div>

          ))

        }

        <button

          type="button"

          onClick={addRow}

          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl mt-4"

        >

          <FiPlus />

          Add Component

        </button>

        <button
  type="button"
  onClick={handleSaveKit}
  className="
    w-full
    mt-8
    bg-blue-600
    hover:bg-blue-700
    hover:shadow-xl
    hover:scale-[1.02]
    active:scale-[0.98]
    text-white
    x-6
    py-4
    rounded-2xl
    font-semibold
    transition-all
    duration-300
    ease-in-out
  "
>
  Save Kit
</button>

      </div>

    </MainLayout>

  );

}

export default CreateKit;