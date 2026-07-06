import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


import { addUserActivity } from "../../services/userActivityService";

function VisitorName() {

  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleContinue = async () => {

    if (!name.trim()) {

      toast.error("Please enter your name");

      return;

    }

    
    localStorage.removeItem("adminName");
localStorage.removeItem("isAdmin");

localStorage.setItem(
  "visitorName",
  name
);

    await addUserActivity(

  name

);

    toast.success(`Welcome ${name}!`);

    navigate("/dashboard");

  };

  return (

    <div
      className="
      min-h-screen
      relative
      overflow-hidden
      bg-gradient-to-br
      from-blue-100
      via-white
      to-blue-50
      flex
      items-center
      justify-center
      px-5
      "
    >

      {/* Floating Blobs */}

      <div
        className="
        absolute
        w-72
        h-72
        bg-blue-300/20
        rounded-full
        blur-3xl
        top-0
        left-0
        "
      />

      <div
        className="
        absolute
        w-96
        h-96
        bg-blue-500/10
        rounded-full
        blur-3xl
        bottom-0
        right-0
        "
      />

      <motion.div

        initial={{
          opacity: 0,
          y: 50
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.7
        }}

        className="
        w-full
        max-w-md
        bg-white/70
        backdrop-blur-xl
        border
        border-white
        shadow-2xl
        rounded-3xl
        p-8
        "
      >

        {/* Logo */}

        <div className="flex justify-center mb-6">

          <div
            className="
            w-20
            h-20
            rounded-full
            bg-blue-600
            flex
            items-center
            justify-center
            "
          >

            <span className="text-white text-3xl font-bold">
              C
            </span>

          </div>

        </div>

        <h1
          className="
          text-4xl
          font-bold
          text-center
          text-blue-600
          "
        >
          ComponentHub
        </h1>

        <p
          className="
          text-center
          text-slate-500
          mt-3
          "
        >
          Inventory Management System
        </p>

        <div className="mt-10">

          <input

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            type="text"

            placeholder="Enter your name"

            className="
            w-full
            px-5
            py-4
            rounded-2xl
            border
            border-slate-200
            outline-none
            focus:border-blue-600
            focus:ring-4
            focus:ring-blue-100
            duration-300
            "
          />

        </div>

        <motion.button

          whileHover={{
            scale: 1.03
          }}

          whileTap={{
            scale: 0.98
          }}

          onClick={handleContinue}

          className="
          w-full
          mt-8
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-4
          rounded-2xl
          font-semibold
          duration-300
          shadow-lg
          "
        >

          Continue

        </motion.button>

      </motion.div>

    </div>

  );

}

export default VisitorName;