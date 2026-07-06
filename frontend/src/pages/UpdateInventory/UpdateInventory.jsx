import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { addTransaction } from "../../services/transactionService";
import { getComponents } from "../../services/componentService";

function UpdateInventory() {

  const [components, setComponents] = useState([]);

  const [componentName, setComponentName] = useState("");

  const [action, setAction] = useState("Taken");

  const [quantity, setQuantity] = useState("");

  useEffect(() => {

    fetchComponents();

  }, []);

  const fetchComponents = async () => {

    try {

      const response = await getComponents();

      setComponents(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!componentName || !quantity) {

      toast.error("Please fill all fields");

      return;

    }

    try {

      await addTransaction({

        componentName,

        action,

        quantity,

        updatedBy:
localStorage.getItem("adminName")
      });

      toast.success("Stock Updated Successfully");

      setQuantity("");

    }

    catch (error) {

      toast.error("Something went wrong");

    }

  };

  return (

    <div className="p-8">

      <div className="
      bg-white
      rounded-3xl
      shadow-lg
      p-8
      max-w-xl
      mx-auto
      ">

        <h1 className="
        text-3xl
        font-bold
        text-blue-600
        mb-8
        ">
          Update Inventory
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Component */}

          <select

            value={componentName}

            onChange={(e) =>
              setComponentName(e.target.value)
            }

            className="
            w-full
            border
            rounded-2xl
            p-4
            "

          >

            <option value="">
              Select Component
            </option>

            {

              components.map((item, index) => (

                <option
                  key={index}
                  value={item.componentName}
                >

                  {item.componentName}

                </option>

              ))

            }

          </select>


          {/* Action */}

          <select

            value={action}

            onChange={(e) =>
              setAction(e.target.value)
            }

            className="
            w-full
            border
            rounded-2xl
            p-4
            "

          >

            <option>
              Taken
            </option>

            <option>
              Added
            </option>

          </select>


          {/* Quantity */}

          <input

            type="number"

            placeholder="Quantity"

            value={quantity}

            onChange={(e) =>
              setQuantity(e.target.value)
            }

            className="
            w-full
            border
            rounded-2xl
            p-4
            "

          />


          <button

            className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-4
            rounded-2xl
            duration-300
            "

          >

            Update Stock

          </button>

        </form>

      </div>

    </div>

  );

}

export default UpdateInventory;