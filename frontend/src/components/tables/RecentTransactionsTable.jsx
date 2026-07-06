import { useEffect, useState } from "react";
import { getRecentActivity } from "../../services/activityService";

function RecentTransactionsTable() {

  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {

    try {

      const response = await getRecentActivity();

      setActivities(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchActivities();

  }, []);

  return (

    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 mt-8 overflow-x-auto">

      <h2 className="text-xl font-semibold text-slate-800 mb-6">

        Recent Activity

      </h2>

      {

        activities.length === 0 ? (

          <p className="text-slate-500">

            No Recent Activity

          </p>

        ) : (

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-4 text-left">

                  Type

                </th>

                <th className="py-4 text-left">

                  Person

                </th>

                <th className="py-4 text-left">

                  Component

                </th>

                <th className="py-4 text-left">

                  Action

                </th>

                <th className="py-4 text-left">

                  Qty

                </th>

                <th className="py-4 text-left">

                  Date & Time

                </th>

              </tr>

            </thead>

            <tbody>

              {

                activities.map((item, index) => (

                  <tr

                    key={index}

                    className="border-b hover:bg-slate-50"

                  >

                    <td className="py-4">

                      <span

                        className={`

                        px-3

                        py-1

                        rounded-full

                        text-white

                        text-xs

                        ${

                          item.type === "ADMIN"

                          ? "bg-green-600"

                          : "bg-blue-600"

                        }

                        `}

                      >

                        {item.type}

                      </span>

                    </td>

                    <td className="py-4">

                      {item.person}

                    </td>

                    <td className="py-4">

                      {item.componentName}

                    </td>

                    <td className="py-4">

                      {item.action}

                    </td>

                    <td className="py-4 font-semibold">

                      {

                        item.action === "Added"

                        ? `+${item.quantity}`

                        : `-${item.quantity}`

                      }

                    </td>

                    <td className="py-4">

                      {item.dateTime}

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        )

      }

    </div>

  );

}

export default RecentTransactionsTable;