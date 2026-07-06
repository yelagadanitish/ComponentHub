import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";
import { getUserActivity } from "../../services/userActivityService";

function UserActivity() {

  const [activities, setActivities] = useState([]);

  const fetchActivity = async () => {

    try {

      const response = await getUserActivity();

      setActivities(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchActivity();

  }, []);

  return (

    <MainLayout>

      <div
        className="
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-slate-200
        p-8
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          text-slate-800
          mb-8
          "
        >

          User Activity

        </h1>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-4 text-left">

                  User Name

                </th>

                <th className="py-4 text-left">

                  Date

                </th>

                <th className="py-4 text-left">

                  Time

                </th>

              </tr>

            </thead>

            <tbody>

              {

                activities.map((activity, index) => (

                  <tr

                    key={index}

                    className="border-b"

                  >

                    <td className="py-4">

                      {activity.userName}

                    </td>

                    <td className="py-4">

                      {activity.date}

                    </td>

                    <td className="py-4">

                      {activity.time}

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>

  );

}

export default UserActivity;