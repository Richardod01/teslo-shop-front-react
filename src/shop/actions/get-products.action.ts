import { tesloAPi } from "../../api/tesloApi";
import type { ProductsResponse } from "../../interfaces/products.response";

interface Options {
  limit?: number | string;
  offset?: number | string;
  sizes?: string;
  gender?: string;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  query?: string
}

export const getProductsAction = async (
  options: Options,
): Promise<ProductsResponse> => {
  const { limit, offset, gender, sizes, minPrice, maxPrice, query } = options;

  const { data } = await tesloAPi.get<ProductsResponse>("/products", {
    params: {
      limit,
      offset,
      sizes,
      gender,
      minPrice,
      maxPrice,
      q: query
    },
  });
  const productsWithImageUrl = data.products.map((prod) => ({
    ...prod,
    images: prod.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    ),
  }));
  return {
    ...data,
    products: productsWithImageUrl,
  };
};
