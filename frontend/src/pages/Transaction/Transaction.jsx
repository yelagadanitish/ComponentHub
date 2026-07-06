import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getComponents } from "../../services/componentService";
import api from "../../services/api";

function Transaction() {

  const [components, setComponents] = useState([]);

  const [purpose, setPurpose] = useState("");

  const [transactions, setTransactions] = useState([
    {
      componentName: "",
      action: "Issued",
      quantity: ""
    }
  ]);

  const fetchComponents = async () => {

    try {

      const response = await getComponents();

      setComponents(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchComponents();

  }, []);

  const handleChange = (index, field, value) => {

    const updated = [...transactions];

    updated[index][field] = value;

    setTransactions(updated);

  };

  const addRow = () => {

    setTransactions([
      ...transactions,
      {
        componentName: "",
        action: "Issued",
        quantity: ""
      }
    ]);

  };

  const removeRow = (index) => {

    if (transactions.length === 1) return;

    const updated = transactions.filter((_, i) => i !== index);

    setTransactions(updated);

  };

  const clearForm = () => {

    setPurpose("");

    setTransactions([
      {
        componentName: "",
        action: "Issued",
        quantity: ""
      }
    ]);

  };

  const handleSubmit = async () => {

    if (!purpose.trim()) {

      toast.error("Purpose is required");

      return;

    }

    for (const row of transactions) {

      if (

        !row.componentName ||

        !row.quantity

      ) {

        toast.error("Fill all transaction rows");

        return;

      }

    }

    try {

      await api.post(
  "/api/transaction/bulk",
  {
    updatedBy: localStorage.getItem("adminName"),
    purpose,
    transactions
  }
);

      toast.success("Transaction Completed");

      clearForm();

      fetchComponents();

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Transaction Failed"

      );

    }

  };

  return (

    <MainLayout>

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

        <h1 className="text-3xl font-bold text-slate-800 mb-8">

          Manage Inventory

        </h1>

        {

          transactions.map((row,index)=>(

            <div

              key={index}

              className="border rounded-2xl p-5 mb-5"

            >

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <select

                  value={row.componentName}

                  onChange={(e)=>

                    handleChange(

                      index,

                      "componentName",

                      e.target.value

                    )

                  }

                  className="border rounded-xl p-3"

                >

                  <option value="">

                    Select Component

                  </option>

                  {

                    components.map((component)=>(

                      <option

                        key={component.componentName}

                        value={component.componentName}

                      >

                        {component.componentName}

                      </option>

                    ))

                  }

                </select>

                <select

                  value={row.action}

                  onChange={(e)=>

                    handleChange(

                      index,

                      "action",

                      e.target.value

                    )

                  }

                  className="border rounded-xl p-3"

                >

                  <option>Added</option>

                  <option>Issued</option>

                </select>

                <input

                  type="number"

                  placeholder="Quantity"

                  value={row.quantity}

                  onChange={(e)=>

                    handleChange(

                      index,

                      "quantity",

                      e.target.value

                    )

                  }

                  className="border rounded-xl p-3"

                />

                <button

                  onClick={() => removeRow(index)}

                  className="bg-red-500 text-white rounded-xl"

                >

                  Remove

                </button>

              </div>

            </div>

          ))

        }

        <button

          onClick={addRow}

          className="bg-green-600 text-white px-5 py-3 rounded-xl mb-6"

        >

          + Add Another Transaction

        </button>

                {/* Purpose */}

        <div className="mb-8">

          <label className="block text-slate-700 font-medium mb-2">

            Purpose

          </label>

          <textarea

            value={purpose}

            onChange={(e) =>

              setPurpose(e.target.value)

            }

            rows={4}

            placeholder="Enter purpose"

            className="
            w-full
            px-5
            py-4
            rounded-2xl
            border
            border-slate-200
            outline-none
            focus:border-blue-600
            resize-none
            "

          />

        </div>

        <div className="flex gap-4">

          <button

            onClick={clearForm}

            className="
            flex-1
            bg-red-500
            hover:bg-red-600
            text-white
            py-4
            rounded-2xl
            font-semibold
            duration-300
            "

          >

            Clear

          </button>

          <button

            onClick={handleSubmit}

            className="
            flex-1
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-4
            rounded-2xl
            font-semibold
            duration-300
            "

          >

            Submit Transactions

          </button>

        </div>

      </div>

    </MainLayout>

  );

}

export default Transaction;