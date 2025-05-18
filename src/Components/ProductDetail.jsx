import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../Mock/products.json";
import styles from "../CSS/product.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Göstəricilər");

  const product = products.find(
    (product) => parseInt(product.id) === parseInt(id)
  );

  if (!product) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  const sizes = [
    { ml: 15, price: 40 },
    { ml: 30, price: 70 },
    { ml: 50, price: 110 },
    { ml: 100, price: 175 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        {product.name}
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-[300px] mx-auto lg:w-[90%] lg:h-[90%] object-contain rounded-lg shadow-md"
          />
        </div>

        <div className={`w-full lg:w-1/2 ${styles.rightBanner}`}>
          <p className="text-gray-600 mt-2 text-xl font-black font-medium">
            Ətrin Həcmini Seçin
          </p>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700">Ölçü seçimi:</h3>
            <div className="flex flex-wrap w-[700px] gap-4 mt-2">
              {sizes.map((size) => (
                <button
                  key={size.ml}
                  className="flex flex-col items-center p-2 border rounded-lg hover:bg-gray-100 transition w-[250px] h-[120px] cursor-pointer mb-3"
                >
                  <img
                    src={product.image}
                    alt={`${size.ml}ml`}
                    className="w-12 h-12 object-cover mb-2"
                  />
                  <span className="text-sm">{size.ml}ml</span>
                  <span className="text-lg font-semibold">{size.price}₺</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border rounded cursor-pointer">
                -
              </button>
              <span className="px-4 py-1 border">1</span>
              <button className="px-3 py-1 border rounded cursor-pointer">
                +
              </button>
            </div>
            <div>
              <button className="w-[300px] bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition cursor-pointer">
                Səbətə əlavə et
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6 w-[40%] mx-auto">
        <button className="mt-6 text-black py-2 px-4 rounded-lg transition cursor-pointer text-3xl underline" onClick={() => setActiveTab("Göstəricilər")}>
          Göstəricilər
        </button>
        <button className="mt-6 text-black py-2 px-4 rounded-lg transition cursor-pointer text-3xl" >
          Məlumat
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
