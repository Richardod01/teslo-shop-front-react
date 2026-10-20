import { Navigate, useNavigate, useParams } from "react-router";

import { useProduct } from "../../hooks/useProduct";
import { CustomFullScreenLoading } from "../../../components/custom/CustomFullScreenLoading";
import { ProductForm } from "./ui/ProductForm";
import type { Product } from "../../../interfaces/products.interface";
import { toast } from "sonner";

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data: product, mutation: {mutateAsync, isPending} } = useProduct(id || "");

  const productTitle = id === "new" ? "Nuevo producto" : "Editar producto";
  const productSubtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  const handleSubmit = async (productLike: Partial<Product> & {files?: File[]}) => {
    console.log(productLike)
    await mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success("Producto actualizado correctamente");
        navigate(`/admin/products/${data.id}`);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error al actualizar el producto");
      },
    });
  };
  // validaciones
  if (isError) {
    return <Navigate to="/admin/products" />;
  }

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (!product) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <ProductForm
      title={productTitle}
      subtitle={productSubtitle}
      product={product}
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  );
};
