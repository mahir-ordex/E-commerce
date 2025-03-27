import { ChangeEvent, useState } from "react";
import {
    Search,
    ShoppingCart,
    Heart,
    User,
    Bell,
    CreditCard,
  } from "lucide-react";


function Navbar() {
    const [searchInput, setSearchInput] = useState("");
  return (
    <div>      <header className="bg-white shadow-sm sticky top-0 z-10">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-indigo-600">ShopNow</div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchInput(e.target.value)
            }
            className="bg-transparent border-none outline-none w-full"
          />
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-indigo-600 relative">
            <Heart size={22} />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-600 rounded-full text-xs flex items-center justify-center text-white">
              2
            </span>
          </button>
          <button className="p-2 text-gray-600 hover:text-indigo-600 relative">
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-600 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </button>
          <button className="p-2 text-gray-600 hover:text-indigo-600">
            <Bell size={22} />
          </button>
          <button className="p-2 text-gray-600 hover:text-indigo-600">
            <CreditCard size={22} />
          </button>
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <User size={18} />
          </div>
        </div>
      </div>

      {/* Mobile Search - only visible on mobile */}
      <div className="mt-4 md:hidden flex items-center bg-gray-100 rounded-lg px-3 py-2">
        <Search size={18} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
          className="bg-transparent border-none outline-none w-full"
        />
      </div>
    </div>
  </header></div>
  )
}

export default Navbar