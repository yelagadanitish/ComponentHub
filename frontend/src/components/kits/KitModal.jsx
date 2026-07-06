import { FiX, FiPackage } from "react-icons/fi";

function KitModal({

  isOpen,

  onClose,

  kit

}) {

  if (!isOpen || !kit) return null;

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      justify-center
      items-center
      z-50
      p-5
      "
    >

      <div
        className="
        bg-white
        rounded-3xl
        shadow-2xl
        w-full
        max-w-2xl
        max-h-[90vh]
        overflow-y-auto
        "
      >

        {/* Header */}

        <div
          className="
          flex
          justify-between
          items-center
          p-6
          border-b
          "
        >

          <h2
            className="
            text-2xl
            font-bold
            text-slate-800
            "
          >

            {kit.kitName}

          </h2>

          <button

            onClick={onClose}

            className="
            text-slate-500
            hover:text-red-500
            duration-300
            "

          >

            <FiX size={24} />

          </button>

        </div>

        {/* Image */}

        <div
          className="
          h-64
          bg-slate-100
          flex
          items-center
          justify-center
          "
        >

          {

            kit.imageUrl ?

              <img

                src={kit.imageUrl}

                alt={kit.kitName}

                className="
                w-full
                h-full
                object-cover
                "

              />

              :

              <FiPackage

                size={90}

                className="text-slate-400"

              />

          }

        </div>

        {/* Description */}

        <div className="p-6">

          <h3
            className="
            font-bold
            text-lg
            mb-2
            "
          >

            Description

          </h3>

          <p className="text-slate-600">

            {

              kit.description ||

              "No Description"

            }

          </p>

        </div>

        {/* Components */}

        <div className="px-6">

          <h3
            className="
            text-lg
            font-bold
            mb-4
            "
          >

            Components

          </h3>

          <div
            className="
            border
            rounded-2xl
            overflow-hidden
            "
          >

            {

              kit.components.map(

                (component, index) => (

                  <div

                    key={index}

                    className="
                    flex
                    justify-between
                    px-5
                    py-4
                    border-b
                    last:border-none
                    "

                  >

                    <span>

                      {

                        component.componentName

                      }

                    </span>

                    <span
                      className="
                      font-semibold
                      "
                    >

                      x

                      {

                        component.quantity

                      }

                    </span>

                  </div>

                )

              )

            }

          </div>

        </div>

        {/* Footer */}

        <div
          className="
          p-6
          flex
          justify-end
          "
        >

          <button

            onClick={onClose}

            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            duration-300
            "

          >

            Close

          </button>

        </div>

      </div>

    </div>

  );

}

export default KitModal;


