"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import fetchProducts from "@/lib/action";
import DeleteBtn from "./DeleteBtn";

const ProductList = () => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    // so that the query is not re-fetched when the client is hydrated.
    refetchOnMount: false, // data will not be refetched when the component mounts, which can be useful if you’re confident the data is already up-to-date or if you want to avoid unnecessary network requests.
    refetchOnReconnect: false, // data will not be refetched when the network connection is restored (if the browser regains network connection after being offline)
  });

  const { data, error, isLoading } = query;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  // Check if there are products
  const products = data?.products || [];

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Product List</h1>
        <Link className="btn btn-primary" href={"/addProduct"}>
          Add Product
        </Link>
      </div>
      {products.length === 0 ? (
        <div>No products available</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <th>
                  <Link
                    href={`/editProduct/${product._id}`}
                    className="btn btn-primary"
                  >
                    Edit
                  </Link>
                  <DeleteBtn id={product._id} />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
