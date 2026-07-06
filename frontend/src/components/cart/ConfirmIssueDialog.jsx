import { motion } from "framer-motion";

import toast from "react-hot-toast";
import { issueComponents } from "../../services/issueService";

function ConfirmIssueDialog({

    open,

    selectedItems,

    userName,

    onCancel,

    onConfirm

}) {

    if (!open) return null;

    const items = Object.entries(selectedItems).filter(

        ([, qty]) => qty > 0

    );

    const totalItems = items.reduce(

        (sum, [, qty]) => sum + qty,

        0

    );

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <motion.div

                initial={{ scale: 0.8 }}

                animate={{ scale: 1 }}

                className="bg-white rounded-3xl shadow-2xl p-8 w-[500px]"

            >

                <h2 className="text-3xl font-bold mb-6">

                    Confirm Issue

                </h2>

                <p className="mb-6">

                    User :

                    <span className="font-semibold ml-2">

                        {userName}

                    </span>

                </p>

                <div className="space-y-3 max-h-64 overflow-y-auto">

                    {

                        items.map(([name, qty]) => (

                            <div

                                key={name}

                                className="flex justify-between"

                            >

                                <span>{name}</span>

                                <span>x{qty}</span>

                            </div>

                        ))

                    }

                </div>

                <hr className="my-5"/>

                <div className="flex justify-between mb-6">

                    <span>Total Items</span>

                    <span>{totalItems}</span>

                </div>

                <div className="flex gap-4">

                    <button

                        onClick={onCancel}

                        className="flex-1 bg-gray-200 py-3 rounded-xl"

                    >

                        Cancel

                    </button>

                    <button

    onClick={async () => {

        try {

            const payload = {

                userName,

                items: items.map(([name, qty]) => ({

                    componentName: name,

                    quantity: qty

                }))

            };

            await issueComponents(payload);

            toast.success("Components Issued Successfully");

            onConfirm();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Issue Failed"

            );

        }

    }}

    className="flex-1 bg-blue-600 text-white py-3 rounded-xl"

>

    Confirm Issue

</button>

                </div>

            </motion.div>

        </div>

    );

}

export default ConfirmIssueDialog;