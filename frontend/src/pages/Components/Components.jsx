import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import SearchBar from "../../components/search/SearchBar";
import ComponentCard from "../../components/cards/ComponentCard";
import CategoryFilter from "../../components/buttons/CategoryFilter";
import IssueCart from "../../components/cart/IssueCart";

import { getComponents } from "../../services/componentService";

import ConfirmIssueDialog
from "../../components/cart/ConfirmIssueDialog";

function Components() {

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedItems, setSelectedItems] = useState({});

  const [components, setComponents] = useState([]);

  const [showDialog,setShowDialog]=useState(false);

  const fetchComponents = async () => {

    try {

      const response = await getComponents();

      setComponents(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchComponents();

  }, []);

  const increaseQuantity = (componentName) => {

    const component = components.find(

      (item) => item.componentName === componentName

    );

    if (!component) return;

    setSelectedItems((prev) => ({

      ...prev,

      [componentName]:

        Math.min(

          (prev[componentName] || 0) + 1,

          component.currentStock

        )

    }));

  };

  const decreaseQuantity = (componentName) => {

    setSelectedItems((prev) => ({

      ...prev,

      [componentName]:

        Math.max(

          (prev[componentName] || 0) - 1,

          0

        )

    }));

  };

  const updateQuantity = (componentName, value) => {

    const component = components.find(

      (item) => item.componentName === componentName

    );

    if (!component) return;

    let qty = value;

    if (isNaN(qty)) qty = 0;

    if (qty < 0) qty = 0;

    if (qty > component.currentStock)

      qty = component.currentStock;

    setSelectedItems((prev) => ({

      ...prev,

      [componentName]: qty

    }));

  };

  const clearCart = () => {

    setSelectedItems({});
 
  };

  const filteredComponents = components.filter((item) => {

    const matchesSearch =

      item.componentName

        .toLowerCase()

        .includes(searchTerm.toLowerCase());

    const matchesCategory =

      selectedCategory === "All" ||

      item.category === selectedCategory;

    return matchesSearch && matchesCategory;

  });

  return (

    <MainLayout>

      <div className="mb-6">

        <SearchBar

          searchTerm={searchTerm}

          setSearchTerm={setSearchTerm}

        />

      </div>

      <div className="mb-8">

        <CategoryFilter

          selectedCategory={selectedCategory}

          setSelectedCategory={setSelectedCategory}

        />

      </div>

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

          filteredComponents.map((item, index) => (

            <ComponentCard

              key={index}

              componentName={item.componentName}

              category={item.category}

              currentStock={item.currentStock}

              imageUrl={item.imageUrl}

              quantity={

                selectedItems[item.componentName] || 0

              }

              increaseQuantity={increaseQuantity}

              decreaseQuantity={decreaseQuantity}

              updateQuantity={updateQuantity}

            />

          ))

        }

      </div>

      <ConfirmIssueDialog

open={showDialog}

selectedItems={selectedItems}

userName={localStorage.getItem("visitorName")}

onCancel={() => setShowDialog(false)}

onConfirm={() => {

    fetchComponents();

    clearCart();

    setShowDialog(false);

}}

/>


      <IssueCart
  selectedItems={selectedItems}
  onReview={() => setShowDialog(true)}
  onClear={clearCart}
/>

    </MainLayout>

  );

}

export default Components;