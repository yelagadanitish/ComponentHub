import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import toast from "react-hot-toast";
import axios from "axios";

import { getAllKits } from "../../services/kitService";

function IssueKits() {

  const [kits, setKits] = useState([]);

  const [selectedKits, setSelectedKits] = useState([]);

  const [search, setSearch] = useState("");

  const adminName =
    localStorage.getItem("adminName");

  const fetchKits = async () => {

    try {

      const response =
        await getAllKits();

      setKits(response.data);

    }

    catch (error) {

      console.log(error);

      toast.error("Failed to load kits");

    }

  };

  useEffect(() => {

    fetchKits();

  }, []);

  const filteredKits = kits.filter(

    (kit)=>

      kit.kitName

      .toLowerCase()

      .includes(

        search.toLowerCase()

      )

  );

  const addKit = (kit) => {

    const exists =
    selectedKits.find(

        item=>item._id===kit._id

    );

    if(exists){

        toast("Kit already added");

        return;

    }

    setSelectedKits([

        ...selectedKits,

        {

            ...kit,

            issueQuantity:1

        }

    ]);

};

const changeQuantity = (

id,

value

)=>{

const updated =
selectedKits.map(

item=>{

if(item._id===id){

return{

...item,

issueQuantity:

Math.max(

1,

Number(value)

)

};

}

return item;

}

);

setSelectedKits(updated);

};

const removeKit = (id)=>{

setSelectedKits(

selectedKits.filter(

item=>item._id!==id

)

);

};

const issueKits = async()=>{

try{

await axios.post(

"http://localhost:5000/api/kits/issue",

{

kits:

selectedKits.map(

item=>({

kitId:item._id,

quantity:item.issueQuantity

})

),

issuedBy:

adminName

}

);

toast.success(

"Kits Issued Successfully"

);

setSelectedKits([]);

fetchKits();

}

catch(error){

toast.error(

error.response?.data?.message ||

"Issue Failed"

);

}

};

return (

<MainLayout>

<div className="max-w-7xl mx-auto p-6">

<h1 className="text-3xl font-bold mb-8">

Issue Kits

</h1>

<input

type="text"

placeholder="Search Kit..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

className="w-full mb-8 px-5 py-4 rounded-2xl border border-slate-200"

/>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{

filteredKits.map((kit)=>(

<div

key={kit._id}

className="bg-white rounded-3xl shadow border p-5"

>

<img

src={kit.imageUrl}

alt={kit.kitName}

className="w-full h-44 object-cover rounded-2xl mb-4"

/>

<h2 className="text-xl font-bold">

{kit.kitName}

</h2>

<p className="text-slate-500 mt-2">

Components :

{kit.componentCount}

</p>

<p className="text-slate-500">

Available :

{kit.availableKits}

</p>

<button

onClick={()=>

addKit(kit)

}

className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"

>

Add To Issue

</button>

</div>

))

}

</div>

{
selectedKits.length>0 && (

<div className="mt-10 bg-white rounded-3xl shadow p-6">

<h2 className="text-2xl font-bold mb-6">

Selected Kits

</h2>

{

selectedKits.map((kit)=>(

<div

key={kit._id}

className="flex justify-between items-center mb-4 border-b pb-4"

>

<div>

<h3 className="font-semibold">

{kit.kitName}

</h3>

</div>

<input

type="number"

min="1"

value={kit.issueQuantity}

onChange={(e)=>

changeQuantity(

kit._id,

e.target.value

)

}

className="w-24 px-3 py-2 border rounded-xl"

/>

<button

onClick={()=>

removeKit(

kit._id

)

}

className="text-red-600"

>

Remove

</button>

</div>

))

}

<button

onClick={issueKits}

className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold"

>

Issue Selected Kits

</button>

</div>

)

}

</div>

</MainLayout>

);

}

export default IssueKits;


