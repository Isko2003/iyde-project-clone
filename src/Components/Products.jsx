import React, { useEffect, useState } from "react";
import styles from "../CSS/products.module.css";
import products from "../Mock/products.json";
import { Link } from "react-router-dom";
import ProductDetail from "./ProductDetail";

const Products = () => {
  const [productsList, setProductsList] = useState(products);
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    sort: "",
    price: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => {
      const updatedBrands = checked
        ? [...prev.brands, value]
        : prev.brands.filter((b) => b !== value);
      return {
        ...prev,
        brands: updatedBrands,
      };
    });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => {
      const updatedCategories = checked
        ? [...prev.categories, value]
        : prev.categories.filter((c) => c !== value);
      return {
        ...prev,
        categories: updatedCategories,
      };
    });
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      sort: e.target.value,
    }));
  };

  useEffect(() => {
    let filtered = [...products];

    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand));
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    if (filters.sort === "A-dan Z-yə") {
      filtered.sort((a, b) => a.name.length - b.name.length);
    } else if (filters.sort === "Z-dən A-ya") {
      filtered.sort((a, b) => b.name.length - a.name.length);
    } else if (filters.sort === "ucuzdan-bahaya") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "bahadan ucuza") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (filters.price) {
      filtered = filtered.filter((p) => {
        const price = p.price;
        if (filters.price === "0-50") return price >= 0 && price <= 50;
        if (filters.price === "50-100") return price > 50 && price <= 100;
        if (filters.price === "100-200") return price > 100 && price <= 200;
        if (filters.price === "200+") return price > 200;
        return true;
      });
    }

    setProductsList(filtered);
  }, [filters]);

  const handlePriceChange = (e) => {
    const { value } = e.target;
    setFilters((prev) => ({
      ...prev,
      price: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      brands: [],
      categories: [],
      sort: "",
      price: "",
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  const searchBrand = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredBrands = [...new Set(products.map((p) => p.brand))].filter(
    (brand) => brand.toLowerCase().includes(searchValue.toLowerCase())
  );

  const goToProductDetail = (productId) => {};

  return (
    <section className="relative">
      <div>
        <div className="flex justify-between items-center w-[80%] mx-auto pt-4">
          <div>
            <h1>Ətirlər(1111 nəticə)</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="md:hidden bg-gray-200 p-2 rounded-full flex gap-2 items-center w-[130px] cursor-pointer"
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={24}
                height={24}
                fill="#000000"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
              Filter
            </button>
            <div className="filter-select border-1 rounded-full p-2">
              <select id="filter-prods" onChange={handleSortChange}>
                <option value="A-dan Z-yə">A-dan Z-yə</option>
                <option value="Z-dən A-ya">Z-dən A-ya</option>
                <option value="populyarlığa görə">Populyarlığa Görə</option>
                <option value="ucuzdan-bahaya">Ucuzdan Bahaya</option>
                <option value="bahadan ucuza">Bahadan Ucuza</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[80%] mx-auto pt-4 flex gap-2 justify-between">
        <div className="hidden md:block left-banner">
          <div className="left-banner-item">
            <h1>Brendler</h1>
            <div
              className={`relative flex items-center bg-gray-100 rounded-full px-4 py-2 w-[230px] ${styles.searchBar} mt-3`}
            >
              <input
                type="text"
                placeholder="Brend Axtar"
                className="bg-transparent outline-none pr-8 rounded-2xl"
                onChange={searchBrand}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={16}
                height={16}
                fill="#000000"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </div>
            <div
              className={`filter-content lg:overflow-y-auto lg:max-h-[300px] ${styles.customScrollbar}`}
            >
              {filteredBrands.map((brand, index) => {
                const count = products.filter((p) => p.brand === brand).length;
                return (
                  <label
                    key={index}
                    className="flex items-center cursor-pointer mb-6 pl-3 relative gap-2 w-[200px] mt-3"
                  >
                    <input
                      type="checkbox"
                      name="brands"
                      value={brand}
                      className="w-[16px] h-[16px] cursor-pointer"
                      onChange={handleBrandChange}
                    />
                    <span>
                      {brand} ({count})
                    </span>
                  </label>
                );
              })}
            </div>
            <h1>Kateqoriyalar</h1>
            <div className="filter-content">
              {[...new Set(products.map((p) => p.category))].map(
                (category, index) => {
                  const count = products.filter(
                    (p) => p.category === category
                  ).length;
                  return (
                    <label
                      key={index}
                      className="flex items-center cursor-pointer mb-6 pl-3 relative gap-2 w-[200px] mt-3"
                    >
                      <input
                        type="checkbox"
                        name="categories"
                        value={category}
                        className="w-[16px] h-[16px] cursor-pointer"
                        onChange={handleCategoryChange}
                      />
                      <span>
                        {category} ({count})
                      </span>
                    </label>
                  );
                }
              )}
            </div>
            <h1>Qiymət</h1>
            <div className="filter-content">
              <label className="flex items-center cursor-pointer mb-6 pl-3 relative gap-2 w-[200px] mt-3">
                <input
                  type="radio"
                  name="price"
                  id="1"
                  value="0-50"
                  className="w-[16px] h-[16px] cursor-pointer"
                  onChange={handlePriceChange}
                />
                <span>0-50 ₼</span>
              </label>
              <label className="flex items-center cursor-pointer mb-6 pl-3 relative gap-2 w-[200px] mt-3">
                <input
                  type="radio"
                  name="price"
                  id="2"
                  value="50-100"
                  className="w-[16px] h-[16px] cursor-pointer"
                  onChange={handlePriceChange}
                />
                <span>50-100 ₼</span>
              </label>
              <label className="flex items-center cursor-pointer mb-6 pl-3 relative gap-2 w-[200px] mt-3">
                <input
                  type="radio"
                  name="price"
                  id="3"
                  value="100-200"
                  className="w-[16px] h-[16px] cursor-pointer"
                  onChange={handlePriceChange}
                />
                <span>100-200 ₼</span>
              </label>
              <label className="flex items-center cursor-pointer mb-6 pl-3 relative gap-2 w-[200px] mt-3">
                <input
                  type="radio"
                  name="price"
                  id="4"
                  value="200+"
                  className="w-[16px] h-[16px] cursor-pointer"
                  onChange={handlePriceChange}
                />
                <span>200 ₼ - və daha çox</span>
              </label>
              <label className="flex items-center cursor-pointer mb-6 pl-3 relative gap-2 w-[200px] mt-3">
                <input
                  type="radio"
                  name="price"
                  id="5"
                  value=""
                  className="w-[16px] h-[16px] cursor-pointer"
                  onChange={handleResetFilters}
                />
                <span>Hamısını Göstər</span>
              </label>
            </div>
          </div>
        </div>
        <div
          className={`fixed top-0 left-0 h-full w-[250px] bg-white shadow-lg transform transition-transform duration-300 z-50 overflow-y-auto ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filtrlər</h2>
              <button onClick={toggleSidebar} className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={24}
                  height={24}
                  fill="#000000"
                >
                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                </svg>
              </button>
            </div>
            <div className="left-banner-item">
              <h1>Brendler</h1>
              <div
                className={`relative flex items-center bg-gray-100 rounded-full px-4 py-2 w-full ${styles.searchBar} mt-3`}
              >
                <input
                  type="text"
                  placeholder="Brend Axtar"
                  className="bg-transparent outline-none pr-8 rounded-2xl w-full"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={16}
                  height={16}
                  fill="#000000"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </div>
              <div className="filter-content lg:overflow-y-auto lg:max-h-[300px]">
                {[...new Set(products.map((p) => p.brand))].map(
                  (brand, index) => {
                    const count = products.filter(
                      (p) => p.brand === brand
                    ).length;
                    return (
                      <label
                        key={index}
                        className="flex items-center cursor-pointer mb-6 pl-3 relative gap-2 w-full mt-3"
                      >
                        <input
                          type="checkbox"
                          name="brands"
                          value={brand}
                          className="w-[16px] h-[16px] cursor-pointer"
                          onChange={handleBrandChange}
                        />
                        <span>
                          {brand} ({count})
                        </span>
                      </label>
                    );
                  }
                )}
              </div>
              <h1>Kateqoriyalar</h1>
              <div className="filter-content">
                {[...new Set(products.map((p) => p.category))].map(
                  (category, index) => {
                    const count = products.filter(
                      (p) => p.category === category
                    ).length;
                    return (
                      <label
                        key={index}
                        className="flex items-center cursor-pointer mb-6 pl-3 relative gap-2 w-full mt-3"
                      >
                        <input
                          type="checkbox"
                          name="categories"
                          value={category}
                          className="w-[16px] h-[16px] cursor-pointer"
                          onChange={handleCategoryChange}
                        />
                        <span>
                          {category} ({count})
                        </span>
                      </label>
                    );
                  }
                )}
              </div>
              <h1>Qiymət</h1>
              <div className="filter-content">
                <label className="flex items-center cursor-pointer mb-6 pl-3 relative gap-2 w-full mt-3">
                  <input
                    type="radio"
                    name="price"
                    id="mobile-1"
                    value="0-50"
                    className="w-[16px] h-[16px] cursor-pointer"
                    onChange={handlePriceChange}
                  />
                  <span>0-50 ₼</span>
                </label>
                <label className="flex items-center cursor-pointer mb-6 pl-3 relative gap-2 w-full mt-3">
                  <input
                    type="radio"
                    name="price"
                    id="mobile-2"
                    value="50-100"
                    className="w-[16px] h-[16px] cursor-pointer"
                    onChange={handlePriceChange}
                  />
                  <span>50-100 ₼</span>
                </label>
                <label className="flex items-center cursor-pointer mb-6 pl-3 relative gap-2 w-full mt-3">
                  <input
                    type="radio"
                    name="price"
                    id="mobile-3"
                    value="100-200"
                    className="w-[16px] h-[16px] cursor-pointer"
                    onChange={handlePriceChange}
                  />
                  <span>100-200 ₼</span>
                </label>
                <label className="flex items-center cursor-pointer mb-6 pl-3 relative gap-2 w-full mt-3">
                  <input
                    type="radio"
                    name="price"
                    id="mobile-4"
                    value="200+"
                    className="w-[16px] h-[16px] cursor-pointer"
                    onChange={handlePriceChange}
                  />
                  <span>200 ₼ - və daha çox</span>
                </label>
                <label className="flex items-center cursor-pointer mb-6 pl-3 relative gap-2 w-full mt-3">
                  <input
                    type="radio"
                    name="price"
                    id="mobile-5"
                    value=""
                    className="w-[16px] h-[16px] cursor-pointer"
                    onChange={handleResetFilters}
                  />
                  <span>Hamısını Göstər</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
            onClick={toggleSidebar}
          ></div>
        )}
        <div className="right-banner px-4 py-8 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsList.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div
                  key={product.id}
                  className={`${styles.product} flex flex-col cursor-pointer items-center justify-between bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-contain bg-center mb-4"
                  />
                  <h2 className="text-md font-semibold text-gray-800 text-center">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <p className="text-lg font-bold text-gray-900">
                    {product.price} AZN
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
