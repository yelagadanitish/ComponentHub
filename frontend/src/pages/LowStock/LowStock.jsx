import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import ComponentCard from "../../components/cards/ComponentCard";

import { getComponents } from "../../services/componentService";

function LowStock() {

  const [lowStockComponents, setLowStockComponents] = useState([]);

  useEffect(() => {

    fetchLowStock();

  }, []);

  const fetchLowStock = async () => {

    try {

      const response = await getComponents();

      const filtered = response.data.filter(

        item => item.currentStock <= 50

      );

      setLowStockComponents(filtered);

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold text-slate-800 mb-8">

        Low Stock Components

      </h1>

      {

        lowStockComponents.length === 0 ?

          (

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center text-slate-500">

              No Low Stock Components 🎉

            </div>

          )

          :

          (

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
              "
            >

              {

                lowStockComponents.map((item, index) => (

                  <ComponentCard

                    key={index}

                    componentName={item.componentName}

                    category={item.category}

                    currentStock={item.currentStock}

                  />

                ))

              }

            </div>

          )

      }

    </MainLayout>

  );

}

export default LowStock;