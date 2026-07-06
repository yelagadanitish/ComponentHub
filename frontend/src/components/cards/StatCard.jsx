import { motion } from "framer-motion";

function StatCard({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02
      }}
      transition={{
        duration: 0.2
      }}
      className="
      bg-white
      rounded-3xl
      shadow-lg
      border
      border-slate-200
      p-6
      flex
      items-center
      justify-between
      cursor-pointer
      "
    >
      <div>

        <p className="text-slate-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold text-slate-800 mt-2">
          {value}
        </h2>

      </div>

      <div
        className={`
        w-16
        h-16
        rounded-2xl
        flex
        items-center
        justify-center
        text-white
        text-2xl
        ${color}
        `}
      >
        {icon}
      </div>

    </motion.div>
  );
}

export default StatCard;