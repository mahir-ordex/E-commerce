import { ChangeEvent, useEffect, useState } from "react";
import {
  ShoppingCart,
  Heart,
  Filter,
  ChevronRight,
  ChevronLeft,
  CreditCard,
} from "lucide-react";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
  category: string;
  quantity: number;
  shopId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  discount?: number;
  rating?: number;
}

const Dashboard = () => {
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState<(Product | Category)[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isShowSellerModel, setIsShowSellerModel] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
      setCategories(res.data);
      console.log("Categories:", res);
    } catch (error: any) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchProductData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDExY2I4YjU3ZmJiNzI4MjEzNTMwNSIsInJvbGUiOiJjb25zdW1lciIsImlhdCI6MTc0MTc1NzYyNCwiZXhwIjoxNzQyMzYyNDI0fQ.5HGiuuMMsuVOjpi_ecO7-mtM9yVtpzKT0VQV6mojXGQ`,
          },
        }
      );
      // Add default values for display purposes
      const processedProducts = res.data.map((product: Product) => ({
        ...product,
        discount: product.discount || 0, 
        rating: product.rating || 4.5,   
        id: product._id
      }));
      
      setProducts(processedProducts);
      console.log("Products:", processedProducts);
    } catch (err: any) {
      console.log("Error While Fetching Products:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProductData();
  }, []);

  // Slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleSearch = () => {
    if (searchInput.length === 0) {
      setSearchData([]);
      return;
    }
    
    const productResults = products.filter((product) =>
      product.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    
    const categoryResults = categories.filter((category) =>
      category.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    
    setSearchData([...productResults, ...categoryResults]);
    console.log("Search Results:", [...productResults, ...categoryResults]);
  };

  useEffect(() => {
    handleSearch();
  }, [searchInput]);

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  // Featured and recommended products (using the same data for now)
  const featuredProducts = products.slice(0, 4);
  const recommendedProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}


      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Search Results Section */}
        {searchInput.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Search Results for "{searchInput}"
              </h2>
              <span className="text-gray-500 text-sm">
                {searchData.length} items found
              </span>
            </div>

            {searchData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {searchData.map((item: any) => {
                  const isProduct = 'price' in item;
                  return (
                    <div
                      key={item._id}
                      className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                    >
                      <div className="h-40 bg-gray-200 relative">
                        {isProduct && item.image && item.image.length > 0 ? (
                          <img
                            src={item.image[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-500">
                            {isProduct ? "No Image" : item.name}
                          </div>
                        )}
                        {isProduct && item.discount && item.discount > 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {item.discount}% OFF
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-gray-500 mb-1">
                          {isProduct ? getCategoryName(item.category) : "Category"}
                        </div>
                        <h3 className="font-medium text-gray-800 mb-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          {isProduct ? (
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
                          ) : (
                            <div className="text-sm text-gray-600">
                              Category
                            </div>
                          )}

                          {isProduct && (
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
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-600">
                  No results found for "{searchInput}"
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
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div
                    key={product._id}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                      index === currentSlide
                        ? "opacity-100 z-0"
                        : "opacity-0 z-0"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="w-full md:w-1/2 h-40 md:h-full bg-gray-200 flex items-center justify-center">
                        {product.image && product.image.length > 0 ? (
                          <img
                            src={product.image[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-500">No Image Available</div>
                        )}
                      </div>
                      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                        <div className="text-sm text-indigo-600 mb-1">
                          {getCategoryName(product.category)}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-4 hidden md:block">
                          {product.description}
                        </p>
                        <div className="flex items-center mb-4">
                          <span className="text-lg font-bold">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.discount && product.discount > 0 && (
                            <>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                $
                                {(
                                  product.price /
                                  (1 - product.discount / 100)
                                ).toFixed(2)}
                              </span>
                              <span className="ml-2 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                                {product.discount}% OFF
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                            Add to Cart
                          </button>
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition flex items-center">
                            <CreditCard size={16} className="mr-2" />
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p>No products available</p>
                </div>
              )}
            </div>

            {/* Slider Controls */}
            {products.length > 1 && (
              <>
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
                  {products.map((_, index) => (
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
              </>
            )}
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
            {categories.map((category) => (
              <div
                key={category._id}
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
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-40 bg-gray-200 relative">
                  {product.image && product.image.length > 0 ? (
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                  {/* {product?.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </div>
                  )} */}
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">
                    {getCategoryName(product.category)}
                  </div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-end">
                      <span className="text-lg font-bold text-gray-800">
                        ${product.price.toFixed(2)}
                      </span>
                      {/* {product?.discount > 0 && (
                        <span className="text-xs text-gray-500 line-through ml-2">
                          $
                          {(
                            product.price /
                            (1 - product?.discount / 100)
                          ).toFixed(2)}
                        </span> */}
                      {/* )} */}
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
            {recommendedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-40 bg-gray-200 relative">
                  {product.image && product.image.length > 0 ? (
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full text-gray-500 hover:text-red-500">
                    <Heart size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">
                    {getCategoryName(product.category)}
                  </div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-800">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm ml-1">{product.rating || 4.5}</span>
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