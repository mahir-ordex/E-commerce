import { ChangeEvent, useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Bell,
  Filter,
  ChevronRight,
  ChevronLeft,
  CreditCard,
} from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [SearchInput, setSearchInput] = useState("");
  const [SearchData, setSearchData] = useState<(Products | category)[] >([]);
  const [categories, setCategories] = useState<category[]>([])

  interface category {
    id: number;
    name: string;
  }
  interface Products{
    id?: number;
    name?: string;
    price?: number ;
    image?: string;
    category?: string;
    description?: string;
    rating?: number;
    discount?: number;
  }
  
  const fetchCategories = async()=>{
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
      setCategories(res.data)
      console.log(res)
    } catch (error:any) {
      console.error(error.message)      
    }
  }

  useEffect(()=>{
    fetchCategories()
  },[])

  const featuredProducts:Products[] = [
    {
      id: 1,
      name: "Wireless Earbuds",
      category: "Electronics",
      price: 79.99,
      discount: 15,
      image: "/api/placeholder/200/150",
    },
    {
      id: 2,
      name: "Summer T-Shirt",
      category: "Clothing",
      price: 24.99,
      discount: 10,
      image: "/api/placeholder/200/150",
    },
    {
      id: 3,
      name: "Smart Watch",
      category: "Electronics",
      price: 129.99,
      discount: 20,
      image: "/api/placeholder/200/150",
    },
    {
      id: 4,
      name: "Coffee Maker",
      category: "Home & Kitchen",
      price: 59.99,
      discount: 0,
      image: "/api/placeholder/200/150",
    },
  ];

  const recommendedProducts:Products[] = [
    {
      id: 5,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 49.99,
      rating: 4.5,
      image: "/api/placeholder/200/150",
    },
    {
      id: 6,
      name: "Yoga Mat",
      category: "Sports & Outdoors",
      price: 29.99,
      rating: 4.8,
      image: "/api/placeholder/200/150",
    },
    {
      id: 7,
      name: "Moisturizer",
      category: "Beauty & Personal Care",
      price: 18.99,
      rating: 4.3,
      image: "/api/placeholder/200/150",
    },
    {
      id: 8,
      name: "Best-selling Novel",
      category: "Books",
      price: 14.99,
      rating: 4.7,
      image: "/api/placeholder/200/150",
    },
  ];

  // Slider products (trending items)
  const sliderProducts:Products[] = [
    {
      id: 9,
      name: "Premium Headphones",
      category: "Electronics",
      price: 199.99,
      discount: 25,
      description: "Experience premium sound quality with noise cancellation",
      image: "/api/placeholder/800/400",
    },
    {
      id: 10,
      name: "Fitness Tracker",
      category: "Wearables",
      price: 89.99,
      discount: 10,
      description: "Track your fitness goals with this advanced wearable",
      image: "/api/placeholder/800/400",
    },
    {
      id: 11,
      name: "Designer Backpack",
      category: "Fashion",
      price: 79.99,
      discount: 15,
      description: "Stylish and functional backpack for everyday use",
      image: "/api/placeholder/800/400",
    },
    {
      id: 12,
      name: "Smart Home Speaker",
      category: "Electronics",
      price: 129.99,
      discount: 20,
      description: "Voice-controlled smart speaker with premium audio",
      image: "/api/placeholder/800/400",
    },
  ];

  // Slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === sliderProducts.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sliderProducts.length - 1 : prev - 1
    );
  };

  const handleSearch = () => {
    setSearchData(
      [...sliderProducts, ...recommendedProducts, ...featuredProducts, ...categories].filter(
        (data:any) => data.name.toLowerCase().includes(SearchInput.toLowerCase())
      )
    );
    console.log("Handle Search :", SearchData);
  };
  useEffect(()=>{
    handleSearch();
  },[SearchInput])
  
  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header */}
      <header className="bg-white shadow-sm sticky  top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-indigo-600">ShopNow</div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3">
              <Search size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                value={SearchInput}
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
              {/* New Card Button */}
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
              className="bg-transparent border-none outline-none w-full"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Search Results Section */}
        {SearchInput.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Search Results for "{SearchInput}"
              </h2>
              <span className="text-gray-500 text-sm">
                {SearchData.length} items found
              </span>
            </div>

            {SearchData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SearchData.map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                  >
                    <div className="h-40 bg-gray-200 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.discount && item.discount > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {item.discount}% OFF
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-1">
                        {item.category || (item.products ? "Category" : "")}
                      </div>
                      <h3 className="font-medium text-gray-800 mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        {/* Show price for products, show product count for categories */}
                        {item.price ? (
                          <div className="flex items-end">
                            <span className="text-lg font-bold text-gray-800">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.discount && item.discount > 0 && (
                              <span className="text-xs text-gray-500 line-through ml-2">
                                $
                                {(
                                  item.price /
                                  (1 - item.discount / 100)
                                ).toFixed(2)}
                              </span>
                            )}
                          </div>
                        ) : item?.products ? (
                          <div className="text-sm text-gray-600">
                            {item?.products} products
                          </div>
                        ) : null}

                        {/* Only show buttons for products, not for categories */}
                        {item.price && (
                          <div className="flex space-x-2">
                            <button className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200">
                              <ShoppingCart size={16} />
                            </button>
                            <button className="p-2 bg-green-100 rounded-full text-green-600 hover:bg-green-200">
                              <CreditCard size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-600">
                  No results found for "{SearchInput}"
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Try different keywords or browse categories below
                </p>
              </div>
            )}
          </div>
        )}

        {/* Product Slider */}
        <div className="mb-10 relative">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Trending Products
          </h2>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64 md:h-80">
              {sliderProducts.map((product, index) => (
                <div
                  key={product?.id}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                    index === currentSlide
                      ? "opacity-100 z-0"
                      : "opacity-0 z-0"
                  }`}
                >
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/2 h-40 md:h-full bg-gray-200">
                      <img
                        src={product?.image}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                      <div className="text-sm text-indigo-600 mb-1">
                        {product?.category}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {product?.name}
                      </h3>
                      <p className="text-gray-600 mb-4 hidden md:block">
                        {product?.description}
                      </p>
                      <div className="flex items-center mb-4">
                        <span>
                          $
                          {product?.price !== undefined
                            ? (
                                product?.price *
                                (1 - (product?.discount || 0) / 100)
                              ).toFixed(2)
                            : "0.00"}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          $
                          {product?.price !== undefined
                            ? product.price.toFixed(2)
                            : "0.00"}
                        </span>
                        <span className="ml-2 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                          {product?.discount}% OFF
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                          Add to Cart
                        </button>
                        {/* Buy Now with Card Button */}
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition flex items-center">
                          <CreditCard size={16} className="mr-2" />
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Controls */}
            <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
              <button
                onClick={prevSlide}
                className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-indigo-600 focus:outline-none"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
              <button
                onClick={nextSlide}
                className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-indigo-600 focus:outline-none"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {sliderProducts?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 mb-8 text-white">
          <div className="md:flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back, Alex!</h1>
              <p className="mb-4">
                Discover today's special deals and new arrivals
              </p>
              <div className="flex space-x-3">
                <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
                  Shop Now
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              {/* This would be a banner image */}
              <div className="h-32 w-64 bg-indigo-400 bg-opacity-50 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SPRING SALE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Shop by Category
            </h2>
            <a
              href="#"
              className="text-indigo-600 hover:underline flex items-center"
            >
              <span>View All</span>
              <ChevronRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories?.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-4"
              >
                <div className="flex flex-col items-center">
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Deals */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Featured Deals</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-white rounded-full shadow text-gray-600 hover:text-indigo-600">
                <Filter size={16} />
              </button>
              <a
                href="#"
                className="text-indigo-600 hover:underline flex items-center"
              >
                <span>View All</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts?.map((product) => (
              <div
                key={product?.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-40 bg-gray-200 relative">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                  {product?.discount != undefined ?product?.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product?.discount}% OFF
                    </div>)
                    : null 
                  }
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">
                    {product?.category}
                  </div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    {product?.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-end">
                      <span className="text-lg font-bold text-gray-800">

                        ${product?.price != undefined ?
                        product?.price.toFixed(2) : 0.00}
                      </span>
                      {product?.discount != undefined ?
                      product?.discount > 0 && (
                        <span className="text-xs text-gray-500 line-through ml-2">
                          $
                          {product?.price != undefined ?
                          (
                            product?.price /
                            (1 - product?.discount / 100)
                          ).toFixed(2): "0.00"}
                        </span>
                      )
                      : null}
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200">
                        <ShoppingCart size={16} />
                      </button>
                      <button className="p-2 bg-green-100 rounded-full text-green-600 hover:bg-green-200">
                        <CreditCard size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended for You */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Recommended for You
            </h2>
            <a
              href="#"
              className="text-indigo-600 hover:underline flex items-center"
            >
              <span>View All</span>
              <ChevronRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts?.map((product) => (
              <div
                key={product?.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-40 bg-gray-200 relative">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full text-gray-500 hover:text-red-500">
                    <Heart size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">
                    {product?.category}
                  </div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    {product?.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-800">
                        ${product?.price != undefined ? product?.price.toFixed(2) :null}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm ml-1">{product?.rating}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200">
                          <ShoppingCart size={16} />
                        </button>
                        <button className="p-2 bg-green-100 rounded-full text-green-600 hover:bg-green-200">
                          <CreditCard size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;