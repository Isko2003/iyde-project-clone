import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Products from "./Components/Products";
import ProductDetail from "./Components/ProductDetail";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
