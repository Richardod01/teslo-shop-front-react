import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-by-id.action";
import { createUpdateProductAction } from "../actions/create-update-action.action";
import type { Product } from "../../interfaces/products.interface";

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      // 1. Invalida la lista general de productos
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // 2. Invalida el producto individual usando la misma estructura [ "product", id ]
      queryClient.invalidateQueries({ queryKey: ["product", product.id] });
    },
  });

  return {
    ...query,
    mutation,
  };
};
