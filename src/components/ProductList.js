import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Swal from "sweetalert2";
import './ProductList.css';

export default function ProductList({ products, setProductToEdit, refreshProducts }) {
  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "products", id));
        await refreshProducts();
        Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
      } catch (error) {
        Swal.fire("Error", "Hubo un problema al eliminar el producto.", "error");
      }
    }
  };

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} - ${product.price}
          <button onClick={() => setProductToEdit(product)}>Editar</button>
          <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}
