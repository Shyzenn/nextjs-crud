import EditProductsForm from "@/components/EditProductsForm";
import { getProductById } from "@/lib/action";

const page = async ({ params }) => {
  const { id } = params;
  const { product } = await getProductById(id);

  return <EditProductsForm id={id} {...product} />;
};

export default page;
