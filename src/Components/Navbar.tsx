import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      {/* Main navbar container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600">ShopHub</Link>
            </div>
            
            {/* Desktop navigation links with active classes */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive 
                    ? "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-gray-900"
                    : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/collection" 
                className={({ isActive }) => 
                  isActive 
                    ? "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-gray-900"
                    : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }
              >
                Collection
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  isActive 
                    ? "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-gray-900"
                    : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }
              >
                About
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  isActive 
                    ? "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-gray-900"
                    : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }
              >
                Contact
              </NavLink>
            </div>
          </div>
          
          {/* Search bar, user profile, cart (desktop) */}
          <div className="hidden md:flex items-center">
            {/* Search */}
            <div className="relative mr-4">
              <button onClick={toggleSearch} className="p-2 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none">
                <Search size={20} />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-2 z-10">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
              )}
            </div>
            
            {/* Login / User profile */}
            <NavLink 
              to="/login" 
              className={({ isActive }) => 
                isActive 
                  ? "p-2 rounded-full text-indigo-600 ml-2"
                  : "p-2 rounded-full text-gray-500 hover:text-gray-600 ml-2"
              }
            >
              <User size={20} />
            </NavLink>
            
            {/* Cart with item count */}
            <NavLink 
              to="/cart" 
              className={({ isActive }) => 
                isActive 
                  ? "p-2 rounded-full text-indigo-600 ml-2 relative"
                  : "p-2 rounded-full text-gray-500 hover:text-gray-600 ml-2 relative"
              }
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </NavLink>
          </div>
          
          {/* Mobile menu button and search */}
          <div className="flex items-center md:hidden">
            {/* Mobile search */}
            <button onClick={toggleSearch} className="p-2 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none">
              <Search size={20} />
            </button>
            {isSearchOpen && (
              <div className="absolute right-0 top-16 mt-2 w-full px-4 bg-white shadow-lg p-2 z-10">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-3 py-2 border rounded-md text-sm "
                />
              </div>
            )}
            
            {/* Mobile cart */}
            <NavLink 
              to="/cart" 
              className={({ isActive }) => 
                isActive 
                  ? "p-2 rounded-full text-indigo-600 relative"
                  : "p-2 rounded-full text-gray-500 hover:text-gray-600 relative"
              }
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </NavLink>
            
            {/* Mobile menu toggle */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? "block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50"
                  : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }
            >
              <h3>Home</h3>
              <hr className='hidden'/>
            </NavLink>
            <NavLink 
              to="/collection" 
              className={({ isActive }) => 
                isActive 
                  ? "block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50"
                  : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }
            >
              <h3>Collection</h3>
              <hr className='hidden'/>
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive 
                  ? "block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50"
                  : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }
            >
              <h3>About</h3>
              <hr className='hidden'/>
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive 
                  ? "block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50"
                  : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }
            >
              <h3>Contact</h3>
              <hr className='hidden'/>
            </NavLink>
            <NavLink 
              to="/login" 
              className={({ isActive }) => 
                isActive 
                  ? "block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50"
                  : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }
            >
              <h3>Login</h3>
              <hr className='hidden'/>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;