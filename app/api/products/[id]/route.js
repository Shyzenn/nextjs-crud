import connectMongoDB from "@/lib/db/mongodb";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";

// edit product
export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newName: name,
    newImage: image,
    newPrice: price,
    newCategory: category,
  } = await request.json();
  await connectMongoDB();
  await Product.findByIdAndUpdate(id, { name, image, price, category });
  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}

// get product by id
export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const product = await Product.findOne({ _id: id });
  return NextResponse.json({ product }, { status: 200 });
}
