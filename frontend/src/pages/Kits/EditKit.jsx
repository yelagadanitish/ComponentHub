import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import toast from "react-hot-toast";
import { FiTrash2, FiPlus } from "react-icons/fi";

import { getComponents } from "../../services/componentService";
import {
  getKit,
  updateKit,
} from "../../services/kitService";
import { uploadKitImage } from "../../services/kitImageService";

function EditKit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [kitName, setKitName] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [components, setComponents] = useState([]);

  const [kitComponents, setKitComponents] = useState([
    {
      componentName: "",
      quantity: 1,
    },
  ]);

  useEffect(() => {
    fetchComponents();
    fetchKit();
  }, []);

  const fetchComponents = async () => {
    try {
      const response = await getComponents();
      setComponents(response.data);
    } catch {
      toast.error("Failed to load components");
    }
  };

  const fetchKit = async () => {
    try {
      const response = await getKit(id);

      const kit = response.data;

      setKitName(kit.kitName);
      setDescription(kit.description);
      setImageUrl(kit.imageUrl || "");

      setKitComponents(
        kit.components.length
          ? kit.components
          : [
              {
                componentName: "",
                quantity: 1,
              },
            ]
      );
    } catch {
      toast.error("Failed to load kit");
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

  const handleUpdate = async () => {
    try {
      if (!kitName.trim()) {
        toast.error("Enter Kit Name");
        return;
      }

      const validComponents = kitComponents.filter(
        (item) => item.componentName !== ""
      );

      if (validComponents.length === 0) {
        toast.error("Add at least one component");
        return;
      }

      const names = validComponents.map(
        (item) => item.componentName
      );

      if (new Set(names).size !== names.length) {
        toast.error("Duplicate Components Found");
        return;
      }

      let finalImage = imageUrl;

      if (image) {
        finalImage = await uploadKitImage(image);
      }

      await updateKit(id, {
        kitName,
        description,
        imageUrl: finalImage,
        components: validComponents,
      });

      toast.success("Kit Updated Successfully");

      navigate("/kits");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to Update Kit"
      );
    }
  };

  return (
    <MainLayout>

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Kit
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

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Kit"
            className="h-32 rounded-xl mb-4"
          />
        )}

        <div className="mb-8">

          <label className="font-medium">

            Change Image

          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="w-full mt-2"
          />

        </div>

        <h2 className="text-xl font-bold mb-4">

          Components

        </h2>

        {kitComponents.map((row, index) => (

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

              {components.map((component) => (

                <option
                  key={component.componentName}
                  value={component.componentName}
                >
                  {component.componentName}
                </option>

              ))}

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

        ))}

        <button
          onClick={addRow}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl mt-4"
        >

          <FiPlus />

          Add Component

        </button>

        <button
          onClick={handleUpdate}
          className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold"
        >

          Update Kit

        </button>

      </div>

    </MainLayout>
  );
}

export default EditKit;