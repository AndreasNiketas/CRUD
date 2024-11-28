import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

export default function FormProduct({ productToEdit, setProductToEdit, refreshProducts }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Rellenar el formulario cuando se edite un producto
  useEffect(() => {
    if (productToEdit) {
      reset(productToEdit);
    }
  }, [productToEdit, reset]);

  const onSubmit = async (data) => {
    try {
      const productRef = collection(db, "products");

      if (productToEdit) {
        // Actualizar producto existente
        await updateDoc(doc(db, "products", productToEdit.id), data);
        toast.success("Producto actualizado");
      } else {
        // Comprobar duplicados antes de agregar
        const existing = await getDocs(query(productRef, where("name", "==", data.name)));
        if (!existing.empty) {
          toast.error("El producto ya está registrado");
          return;
        }
        // Agregar nuevo producto
        await addDoc(productRef, data);
        toast.success("Producto registrado");
      }

      reset();
      setProductToEdit(null);
      refreshProducts(); // Refresca la lista tras agregar o editar
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      toast.error("Error al guardar el producto");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name", { required: "El nombre es obligatorio" })}
        placeholder="Nombre del producto"
      />
      {errors.name && <p>{errors.name.message}</p>}

      <input
        {...register("price", { required: "El precio es obligatorio", valueAsNumber: true })}
        type="number"
        placeholder="Precio del producto"
      />
      {errors.price && <p>{errors.price.message}</p>}

      <button type="submit">{productToEdit ? "Actualizar" : "Registrar"} Producto</button>
    </form>
  );
}
