'use client'
import Link from "next/link";
import Sidebar from './Sidebar';
import Image from "next/image";
import { useState } from 'react';
export default function SideNav() {

    const [isSidebarOpen, setSidebar] = useState(true); //sidebar is initially collapsed

    const toggleSidebar = () => {
        setSidebar(!isSidebarOpen);
      };

    return (
      <aside onMouseEnter={() => setSidebar(false)} //sets sidebar to open
      onMouseLeave={() => setSidebar(true)} className={`fixed left-0 top-0 h-screen w-10 bg-white border-r p-6 ${isSidebarOpen ? "w-10" : "w-60"}`}>

       
        < nav className={` flex flex-col gap-4 text-black ${isSidebarOpen ? "opacity-0" : "opacity-100"}`} >
          <div className="flex items-center gap-2 ">
          <Image src="/Icons/Tally Icon.png" alt="Seach Icon" width={35} height={35}/>
          <Image src="/Icons/Tally.png" alt="Seach Icon" width={45} height={45}/>

          
          </div>
            <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg p-1 hover:bg-gray-100 ">

              <Image src="/Icons/Materials2.png" alt="Seach Icon" width={15} height={15}/>
              <Link href="/materials" className="hover:text-gray-600 ">Materials</Link>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/Icons/ProductsIcon.png" alt="Seach Icon" width={15} height={15}/>
              <Link href="/products" className="hover:text-gray-600">Products</Link>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/Icons/FulfillmentIcon.png" alt="Seach Icon" width={15} height={15}/>
              <Link href="/fulfillment" className="hover:text-gray-600">Fulfillment</Link>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/Icons/IntegrationsIcon.png" alt="Seach Icon" width={15} height={15}/>
              <Link href="/integrations" className="hover:text-gray-600">Integrations</Link>
            </div>
        </nav>


        
        </aside>




    );
  }