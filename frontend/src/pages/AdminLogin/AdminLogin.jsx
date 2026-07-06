import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

function AdminLogin() {

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    if (

      username.trim() === "admin" &&

      password === "admin123"

    ) {

      // Clear any previous visitor session

      localStorage.removeItem("visitorName");

      // Admin authenticated

      localStorage.setItem("isAdmin", "true");

      toast.success("Login Successful");

      // Go to Admin Name page

      navigate("/admin/name");

    }

    else {

      toast.error("Invalid username or password");

    }

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

        <h1 className="text-4xl font-bold text-center text-blue-600">

          ComponentHub

        </h1>

        <p className="text-center text-slate-500 mt-3 mb-8">

          Admin Login

        </p>

        {/* Username */}

        <div className="mb-5">

          <label className="text-slate-600 font-medium">

            Username

          </label>

          <input

            type="text"

            placeholder="Enter username"

            value={username}

            onChange={(e) => setUsername(e.target.value)}

            className="
            w-full
            mt-2
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

        {/* Password */}

        <div>

          <label className="text-slate-600 font-medium">

            Password

          </label>

          <div className="relative mt-2">

            <input

              type={showPassword ? "text" : "password"}

              placeholder="Enter password"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

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

            <button

              type="button"

              className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              text-slate-500
              "

              onClick={() =>

                setShowPassword(!showPassword)

              }

            >

              {

                showPassword

                  ? <FiEyeOff size={20} />

                  : <FiEye size={20} />

              }

            </button>

          </div>

        </div>

        {/* Login Button */}

        <button

          onClick={handleLogin}

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

          Login

        </button>

      </motion.div>

    </div>

  );

}

export default AdminLogin;