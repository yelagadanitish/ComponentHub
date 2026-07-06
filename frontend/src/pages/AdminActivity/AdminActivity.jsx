import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getTransactions } from "../../services/transactionService";

function AdminActivity() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {

    fetchActivities();

  }, []);

  const fetchActivities = async () => {

    try {

      const response =
        await getTransactions();

      setActivities(
        response.data.reverse()
      );

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold text-slate-800 mb-8">

        Admin Activity

      </h1>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-200">

              <th className="text-left py-4">
                Admin
              </th>

              <th className="text-left py-4">
                Component
              </th>

              <th className="text-left py-4">
                Action
              </th>

              <th className="text-left py-4">
                Quantity
              </th>

              <th className="text-left py-4">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {

              activities.map(

                (item, index) => (

                  <tr
                    key={index}
                    className="border-b border-slate-100"
                  >

                    <td className="py-5">

                      {item.updatedBy}

                    </td>

                    <td className="py-5">

                      {item.componentName}

                    </td>

                    <td className="py-5">

                      {item.action}

                    </td>

                    <td className="py-5">

                      {item.quantity}

                    </td>

                    <td className="py-5 text-slate-500">

                      {item.dateTime}

                    </td>

                  </tr>

                )

              )

            }

          </tbody>

        </table>

      </div>

    </MainLayout>

  );

}

export default AdminActivity;