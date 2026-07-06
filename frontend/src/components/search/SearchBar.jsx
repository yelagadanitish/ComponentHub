import { FiSearch } from "react-icons/fi";

function SearchBar({ searchTerm, setSearchTerm }) {

  return (

    <div className="relative">

      <FiSearch
        size={20}
        className="
        absolute
        top-1/2
        left-5
        -translate-y-1/2
        text-slate-400
        "
      />

      <input

        type="text"

        placeholder="Search Components..."

        value={searchTerm}

        onChange={(e) =>
          setSearchTerm(e.target.value)
        }

        className="
        w-full
        bg-white
        border
        border-slate-200
        rounded-2xl
        pl-14
        pr-5
        py-4
        shadow-sm
        outline-none
        focus:border-blue-600
        "

      />

    </div>

  );

}

export default SearchBar;