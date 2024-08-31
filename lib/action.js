// add Product
export async function addProduct({ name, image, price, category }) {
  const res = await fetch("http://localhost:3000/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, image, price, category }),
  });

  if (!res.ok) {
    throw new Error("Failed to create a Product");
  }

  return res.json();
}

// delete Product
export async function deleteProduct(id) {
  const res = await fetch(`http://localhost:3000/api/products?id=${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return id; // Return the ID to identify which product was deleted
}

// get/fetch all product
export default async function fetchProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

// get product by id to show single product based on the id
export async function getProductById(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct({
  id,
  newName,
  newImage,
  newPrice,
  newCategory,
}) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newName,
      newImage,
      newPrice,
      newCategory,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  return res.json();
}
