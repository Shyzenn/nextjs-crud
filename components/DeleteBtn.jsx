import { deleteProduct } from "@/lib/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeleteBtn = ({ id }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // Invalidate and refetch the products query to ensure the list is up to date
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      // Handle error here (optional)
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      mutation.mutate(id);
    }
  };

  return (
    <button className="btn btn-error ml-2" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteBtn;
