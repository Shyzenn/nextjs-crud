import connectMongoDB from "@/lib/db/mongodb";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";

// get all product
export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  return NextResponse.json({ products });
}

// add product
export async function POST(request) {
  const { name, image, price, category } = await request.json();
  await connectMongoDB();
  await Product.create({ name, image, price, category });
  return NextResponse.json({ message: "Product Created" }, { status: 201 });
}

// delete product
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product Deleted" }, { status: 200 });
}
