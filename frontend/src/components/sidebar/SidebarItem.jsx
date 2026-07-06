import { Link } from "react-router-dom";

function SidebarItem({ icon, title, path }) {
  return (
    <Link
      to={path}
      className="
      flex
      items-center
      gap-3
      px-4
      py-3
      rounded-xl
      text-slate-700
      hover:bg-blue-50
      hover:text-blue-600
      duration-300
      "
    >
      {icon}

      <span className="font-medium">
        {title}
      </span>
    </Link>
  );
}

export default SidebarItem;