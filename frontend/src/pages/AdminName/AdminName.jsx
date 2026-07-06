import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function AdminName() {

  const [adminName, setAdminName] = useState("");

  const navigate = useNavigate();

  const handleContinue = () => {

    if (!adminName.trim()) {

      toast.error("Please enter your name");

      return;

    }

    // Remove any previous visitor session

    localStorage.removeItem("visitorName");

    // Save admin name

    localStorage.setItem(

      "adminName",

      adminName.trim()

    );

    toast.success(`Welcome ${adminName}!`);

    navigate("/dashboard");

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-5">

      <motion.div

        initial={{ opacity: 0, y: 40 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.7 }}

        className="
        w-full
        max-w-md
        bg-white/70
        backdrop-blur-xl
        rounded-3xl
        border
        border-white
        shadow-2xl
        p-8
        "

      >

        <h1 className="text-3xl font-bold text-center text-blue-600">

          Welcome Admin

        </h1>

        <p className="text-slate-500 text-center mt-3">

          Enter your name to continue

        </p>

        <div className="mt-8">

          <input

            type="text"

            placeholder="Enter your name"

            value={adminName}

            onChange={(e) =>

              setAdminName(e.target.value)

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

        <button

          onClick={handleContinue}

          className="
          w-full
          mt-8
          bg-blue-600
          hover:bg-blue-700
          duration-300
          text-white
          py-4
          rounded-2xl
          font-semibold
          shadow-lg
          "

        >

          Continue

        </button>

      </motion.div>

    </div>

  );

}

export default AdminName;