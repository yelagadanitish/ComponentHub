function CategoryFilter({

  selectedCategory,

  setSelectedCategory

}) {

  const categories = [

    "All",

    "Sensor",

    "Controller",

    "Motor",

    "Display",

    "LED",

    "Passive Component",

    "Tool",

    "Cable",

    "Communication Module",

    "Shield",

    "Mechanical Component",

    "Miscellaneous"

  ];

  return (

    <div className="flex gap-4 mb-8 overflow-x-auto pb-2">

      {

        categories.map((category, index) => (

          <button

            key={index}

            onClick={() =>
              setSelectedCategory(category)
            }

            className={`
            px-5
            py-3
            rounded-2xl
            border
            duration-300
            whitespace-nowrap

            ${
              selectedCategory === category

                ? "bg-blue-600 text-white"

                : "bg-white border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white"

            }

            `}
          >

            {category}

          </button>

        ))

      }

    </div>

  );

}

export default CategoryFilter;