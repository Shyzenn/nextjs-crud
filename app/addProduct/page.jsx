"use client";

import { addProduct } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Name and image are required");
      return;
    }

    try {
      await addProduct({ name, image, price, category });
      router.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold py-10 text-2xl">Add New Product</h1>
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input input-bordered input-accent w-full max-w-xs"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="input input-bordered input-accent w-full max-w-xs"
          placeholder="/image/1.jpg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="text"
          className="input input-bordered input-accent w-full max-w-xs"
          placeholder="1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          className="input input-bordered input-accent w-full max-w-xs"
          placeholder="Product Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-full max-w-xs">
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddProduct;
