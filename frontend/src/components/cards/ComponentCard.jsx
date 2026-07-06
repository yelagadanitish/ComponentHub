import { motion } from "framer-motion";
import { FiBox } from "react-icons/fi";

function ComponentCard({

  componentName,

  category,

  currentStock,

  imageUrl,

  quantity,

  increaseQuantity,

  decreaseQuantity,

  updateQuantity

}) {

  return (

    <motion.div

      whileHover={{
        y: -5,
        scale: 1.02
      }}

      className="
      bg-white
      rounded-3xl
      border
      border-slate-200
      shadow-lg
      p-6
      "

    >

      {/* Component Image */}

      <div className="flex justify-center mb-5">

        {

          imageUrl ? (

            <div
              className="
              w-32
              h-32
              bg-slate-50
              rounded-2xl
              flex
              items-center
              justify-center
              "
            >

              <img

                src={imageUrl}

                alt={componentName}

                className="
                max-w-full
                max-h-full
                object-contain
                p-2
                "

              />

            </div>

          ) : (

            <div

              className="
              w-20
              h-20
              rounded-2xl
              bg-blue-100
              flex
              items-center
              justify-center
              "

            >

              <FiBox

                size={35}

                className="text-blue-600"

              />

            </div>

          )

        }

      </div>

      {/* Component Name */}

      <h2

        className="
        text-xl
        font-bold
        text-slate-800
        text-center
        "

      >

        {componentName}

      </h2>

      {/* Category */}

      <div

        className="
        mt-4
        flex
        justify-center
        gap-3
        flex-wrap
        "

      >

        <span

          className="
          px-4
          py-2
          bg-blue-100
          text-blue-600
          rounded-full
          text-sm
          "

        >

          {category}

        </span>

        <span

          className={`
          px-4
          py-2
          rounded-full
          text-sm
          text-white
          ${
            currentStock <= 50

              ? "bg-red-500"

              : "bg-green-500"

          }
          `}

        >

          {

            currentStock <= 50

              ? "Low Stock"

              : "Available"

          }

        </span>

      </div>

      {/* Current Stock */}

      <div className="mt-6 text-center">

        <p className="text-slate-500">

          Current Stock :

          <span

            className={`
            font-semibold
            ml-2
            ${
              currentStock <= 50

                ? "text-red-500"

                : "text-green-600"

            }
            `}

          >

            {currentStock}

          </span>

        </p>

      </div>

      {/* Quantity Selector */}

      <div className="mt-6">

        <div className="flex justify-center items-center gap-4">

          <button

            onClick={() => decreaseQuantity(componentName)}

            className="
            w-10
            h-10
            rounded-full
            bg-red-500
            hover:bg-red-600
            text-white
            text-xl
            duration-200
            "

          >

            -

          </button>

          <input

            type="number"

            min="0"

            max={currentStock}

            value={quantity}

            onChange={(e) =>

              updateQuantity(

                componentName,

                Number(e.target.value)

              )

            }

            className="
            w-20
            h-10
            text-center
            border
            rounded-xl
            outline-none
            font-semibold
            "

          />

          <button

            onClick={() => increaseQuantity(componentName)}

            className="
            w-10
            h-10
            rounded-full
            bg-green-500
            hover:bg-green-600
            text-white
            text-xl
            duration-200
            "

          >

            +

          </button>

        </div>

        <p className="text-center text-sm text-slate-500 mt-3">

          Remaining Stock :

          <span className="ml-2 font-semibold text-blue-600">

            {currentStock - quantity}

          </span>

        </p>

      </div>

    </motion.div>

  );

}

export default ComponentCard;