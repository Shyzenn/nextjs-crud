"use client";

import { updateProduct } from "@/lib/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Component to render the form for editing a product
const EditProductsForm = ({ id, name, price, category, image }) => {
  const [newName, setNewName] = useState(name);
  const [newImage, setNewImage] = useState(image);
  const [newPrice, setNewPrice] = useState(price);
  const [newCategory, setNewCategory] = useState(category);

  const router = useRouter();

  // Initialize queryClient and mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      // Invalidate and refetch the products query to ensure the list is up to date
      queryClient.invalidateQueries(["products"]);
      router.push("/products");
    },
    onError: (error) => {
      // Handle error here (optional)
      console.error(error);
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id, newName, newImage, newPrice, newCategory });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold py-10 text-2xl">Update Product {id}</h1>
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
          type="text"
          className="input input-bordered input-accent w-full max-w-xs"
        />
        <input
          onChange={(e) => setNewImage(e.target.value)}
          value={newImage}
          type="text"
          className="input input-bordered input-accent w-full max-w-xs"
        />
        <input
          onChange={(e) => setNewPrice(e.target.value)}
          value={newPrice}
          type="text"
          className="input input-bordered input-accent w-full max-w-xs"
        />
        <input
          onChange={(e) => setNewCategory(e.target.value)}
          value={newCategory}
          type="text"
          className="input input-bordered input-accent w-full max-w-xs"
        />
        <button className="btn btn-primary w-full max-w-xs" type="submit">
          Update Product
        </button>
      </form>
    </>
  );
};

export default EditProductsForm;
