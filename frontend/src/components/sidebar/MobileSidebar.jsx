import { Link } from "react-router-dom";
import { FiHome, FiBox, FiLogIn, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

function MobileSidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="
        fixed
        top-0
        left-0
        h-screen
        w-72
        bg-white
        z-50
        shadow-2xl
        p-6
        "
      >
        <div className="flex justify-between items-center mb-10">

          <h1 className="text-2xl font-bold text-blue-600">
            ComponentHub
          </h1>

          <FiX
            size={25}
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

        </div>

        <div className="space-y-4">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50"
          >
            <FiHome />
            Dashboard
          </Link>

          <Link
            to="/components"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50"
          >
            <FiBox />
            Components
          </Link>

          <Link
            to="/admin/login"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50"
          >
            <FiLogIn />
            Admin
          </Link>

        </div>
      </motion.div>
    </>
  );
}

export default MobileSidebar;