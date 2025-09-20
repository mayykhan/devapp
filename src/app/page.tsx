"use client";
import Image from "next/image";
import {useState} from 'react';
import Sidebar from "./components/Sidebar.jsx";




export default function Home() {

  const [inventory, setInventory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchMaterial, setSearchMaterial] = useState("");
  const [searchSize, setSearchSize] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [searchColor, setSearchColor] = useState("");
  const [activeFilter, setActiveFilter] = useState("color");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);
  const [shirtData, setShirtData] = useState({
    type: "",
    brand: "",
    color: "",
    size: "",
  });
  const changeSort = () => setShowSort((prev) => !prev);
  // const filteredInventory = inventory.filter((item) =>
  //   item.material.toLowerCase().includes(searchMaterial.toLowerCase()))
  //  .sort((a, d) => (sortAscending ? a.count - d.count : d.count - a.count)
  // );

  const inc = (id) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };
  const dec = (id) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id && item.count > 0 ? { ...item, count: item.count - 1 } : item
      )
    );
  };

  const filteredInventory = inventory.filter((item) =>
      item[activeFilter].toLowerCase().includes(searchMaterial.toLowerCase()))
     .sort((a, d) => (sortAscending ? a.count - d.count : d.count - a.count)
    );

  const handleChange = (e) => {
    setShirtData({ ...shirtData, [e.target.name]: e.target.value });
  };

  const swapSort = () => {
    setSortAscending((prev) => !prev); //toggles from ascend to descend and vice versa
  };
  const addShirt = (e) => {
    e.preventDefault();
    const { type, brand, color, size } = shirtData;
    if (!type.trim() || !brand.trim() || !color.trim() || !size.trim())
      return;

    setInventory((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: type.trim(),
        brand: brand.trim(),
        color: color.trim(),
        size: size.trim(),
        count: 0,
      }
    ]);

    

  


    //Reset form
    setShirtData({ type: "",  brand: "", color: "", size: "" });
    setShowForm(false);
  };




  return (
   
    
    
    <div>

      <Sidebar></Sidebar>
  <div className="min-h-screen bg-gray-100 flex justify-center items-start">

  
    <div className="bg-white shadow-lg rounded-xl mt-40 p-8 w-full max-w-3xl">
      
    <div className="flex items-center justify-between w-full mb-6">

    <div className="flex items-center gap-2 w-[300px]">
    {/* text input bar: materials search bar */}

    <Image src="/Icons/Search.png" alt="Seach Icon" width={23} height={23}/>
        <input
          type="text"
          placeholder="Search Materials"
          value={searchMaterial}
          onChange={(e) => setSearchMaterial(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-sm text-black focus:outline-none focus:ring-1 focus:ring-black-200"

          
        />
        {/* we need this relative underneath to make sure its positioned and visible, dropdown wont show without out */}
        <div className = "relative">   
        <button onClick={() => setShowFilterDropdown(prev => !prev)} className=" rounded-lg hover:bg-gray-100 border-gray-300"
        >
          <Image src="/Icons/SortSelect.png" alt="SortSelect Icon" width={25} height={25}/>
          </button>
          {showFilterDropdown && (
           <div className="absolute top-full left-0 mt-1 bg-white text-black border rounded-sm w-32 z-10">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => { setActiveFilter("color"); setShowFilterDropdown(false); }}>
              Color
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => { setActiveFilter("size"); setShowFilterDropdown(false); }}>
              Size
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => { setActiveFilter("brand"); setShowFilterDropdown(false); }}>
              Brand
              </div>
        
           </div>
          )}

          </div>
    

        <button onClick = {swapSort} className="flex items-center  -lg rounded-lg hover:bg-gray-100 border-gray-300">
          <Image src="/Icons/Sort.png" alt="Sort Icon" width={25} height={25} />
        </button>
      
      </div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="px-4 py-3 bg-blue-800 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
        >
          + Add New
        </button>
      </div>

    

      {/*Form for inventory list */}
   
        {showForm && (
           <div className="fixed inset-0 flex justify-center items-center z-50">
    
          <form
            onSubmit={addShirt}
            className="flex flex-col gap-3 bg-white p-6 rounded-2xl text-black shadow-2xl w-[350px]"
          >
            <input
              type="text"
              name="brand"
              value={shirtData.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="p-2 border rounded-lg"
            />
  
            <input
              type="text"
              name="type"
              value={shirtData.type}
              onChange={handleChange}
              placeholder="Shirt Type"
              className="p-2 border rounded-lg "
            />
            <input
              type="text"
              name="color"
              value={shirtData.color}
              onChange={handleChange}
              placeholder="Color"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="size"
              value={shirtData.size}
              onChange={handleChange}
              placeholder="Size"
              className="p-2 border rounded-lg"
            />
            <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-400 text-white rounded-lg"
        >
          Add Shirt
        </button>
      </div>
          </form>

          </div>
        )} 


        {/* //display inventory */} 
        <div > 
          {filteredInventory.map((item) => (
            <li key={item.id} className ="text-black list-none" >
              <div className="flex items-center justify-between rounded-lg p-1 mb-1">
                <div className="flex items-center gap-2">

                    <Image src={`/Icons/Shirt${item.color}.png`} alt={`${item.color} Shirt`} width={45} height={45}/>

                    {item.brand}  {item.type} - {item.color} / {item.size}
                </div>
                <div className="flex items-center">

                  <button
                      type="button"
                      onClick={() => dec(item.id)}
                      className="w-12 h-12 border border-gray-300 rounded-l-md flex items-center justify-center text-2xl hover:bg-gray-100"
                    >
                      -
                  </button>

                  <div className={`flex flex-col border w-24 h-12 ${item.count < 24 ? "border-yellow-400 bg-yellow-50" : "border-gray-300 bg-white"}`}>
                  <div className="flex-1 flex items-center justify-center text-xl font-semibold">
                    {item.count}
                  </div>
                  <div className={`h-5 text-xs flex items-center justify-center ${item.count < 24 ? "bg-yellow-600 border-yellow-300 text-white" : "bg-gray-100 border-gray-300 text-gray-600"}`}>
                  24 PCS
                </div>                
                  </div>

                  <button
                      type="button"
                      onClick={() => inc(item.id)}
                      className="w-12 h-12 border border-gray-300 rounded-r-md flex items-center justify-center text-2xl hover:bg-gray-100"
                      >
                      +
                  </button>
                </div>

              </div>
            
            </li>
          ))}

        </div>


        {/* <div hidden={searchMaterial ? false:true}> 
        {filteredInventory.map(item => (
          <li key={item.id} className ="text-black list-none">
              {item.material}  {item.type} - {item.color} / {item.size}
            </li>          
          
          ))}

        </div> */}

      </div>


    

    </div>
    </div>


  );
}
