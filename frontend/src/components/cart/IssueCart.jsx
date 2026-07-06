import { motion } from "framer-motion";

function IssueCart({

  selectedItems,

  onReview,

  onClear

}) {

  const items = Object.entries(selectedItems || {})
    .filter(([_, qty]) => qty > 0);

  if (items.length === 0) return null;

  const totalItems = items.reduce(

    (sum, [, qty]) => sum + qty,

    0

  );

  return (

    <motion.div

      initial={{ x: 300 }}

      animate={{ x: 0 }}

      className="
      fixed
      bottom-6
      right-6
      w-80
      bg-white
      rounded-3xl
      shadow-2xl
      border
      border-slate-200
      p-6
      z-50
      "

    >

      <h2 className="text-2xl font-bold text-blue-600 mb-4">

        🛒 Issue Cart

      </h2>

      <div className="space-y-3 max-h-56 overflow-y-auto">

        {

          items.map(([name, qty]) => (

            <div

              key={name}

              className="flex justify-between"

            >

              <span>{name}</span>

              <span className="font-semibold">

                ×{qty}

              </span>

            </div>

          ))

        }

      </div>

      <hr className="my-4"/>

      <div className="flex justify-between">

        <span>

          Components

        </span>

        <span>

          {items.length}

        </span>

      </div>

      <div className="flex justify-between mb-6">

        <span>

          Total Items

        </span>

        <span>

          {totalItems}

        </span>

      </div>

      <button

        onClick={onReview}

        className="
        w-full
        bg-blue-600
        text-white
        py-3
        rounded-xl
        mb-3
        "

      >

        Review Changes

      </button>

      <button

        onClick={onClear}

        className="
        w-full
        bg-red-500
        text-white
        py-3
        rounded-xl
        "

      >

        Clear Cart

      </button>

    </motion.div>

  );

}

export default IssueCart;