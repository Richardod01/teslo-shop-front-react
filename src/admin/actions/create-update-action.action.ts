import { tesloAPi } from "../../api/tesloApi";
import type { Product } from "../../interfaces/products.interface";

export const createUpdateProductAction = async (
  productLike: Partial<Product> & { files?: File[] },
): Promise<Product> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, user, images = [], files = [], ...payload } = productLike;
  const isCreating = id === "new";
  payload.stock = Number(payload.stock || 0);
  payload.price = Number(payload.price || 0);

  // preparar las imagenes 
  if(files.length > 0){
    const newImagesNames = await uploadFiles(files)
    images.push(...newImagesNames)
  }

  const imagesToSave = images.map(image => {
    if(image.includes('http')) return image.split('/').pop() || ''
    return image;
  })

  const { data } = await tesloAPi<Product>({
    url: isCreating ? "/products" : `/products/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: {
      ...payload,
      images: imagesToSave
    },
  });

  return {
    ...data,
    images: data.images.map((image) => {
      if (image.includes("http")) return image;
      return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    }),
  };
};

export interface FileUploadResponse {
  secureUrl: string;
  fileName: string;
}

const uploadFiles = async (files: File[]) => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    const { data } = await tesloAPi<FileUploadResponse>({
      url: "/files/product",
      method: "POST",
      data: formData,
    });

    return data.fileName;
  });

  const uploadedFileNames = await Promise.all(uploadPromises);

  return uploadedFileNames;
};
