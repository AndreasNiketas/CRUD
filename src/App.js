import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import FormProduct from "./components/FormProduct";
import ProductList from "./components/ProductList";
import Swal from "sweetalert2";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);

  // Función para recargar productos desde Firestore
  const refreshProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Incluye el id del documento
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al cargar los productos.",
      });
    }
  };

  // Carga inicial de productos
  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <div>
      <h1>CRUD de Productos</h1>
      <FormProduct
        productToEdit={productToEdit}
        setProductToEdit={setProductToEdit}
        refreshProducts={refreshProducts} // Pasar la función de refrescar
      />
      <ProductList
        products={products}
        setProductToEdit={setProductToEdit}
        refreshProducts={refreshProducts} // Pasar la función de refrescar
      />
    </div>
  );
}

export default App;
