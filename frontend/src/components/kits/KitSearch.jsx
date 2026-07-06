import { FiSearch } from "react-icons/fi";

function KitSearch({

    search,

    setSearch

}) {

    return (

        <div className="mb-8">

            <div className="relative">

                <FiSearch
                    size={20}
                    className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    "
                />

                <input

                    type="text"

                    placeholder="Search Kits..."

                    value={search}

                    onChange={(e) =>

                        setSearch(

                            e.target.value

                        )

                    }

                    className="
                    w-full
                    pl-14
                    pr-5
                    py-4
                    rounded-2xl
                    border
                    border-slate-200
                    outline-none
                    focus:border-blue-600
                    "

                />

            </div>

        </div>

    );

}

export default KitSearch;