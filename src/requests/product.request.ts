import {clientApi} from '../clientApi.ts';

const product = clientApi.ProductsApi();

export const getProducts = async () => {
  const products = await product.productControllerGetAll();
  return products.data;
};

export const getProductCategories = async () => {
  const products = await product.productControllerGetAllCategory();
  return products.data;
};

export const getProductById = async (id: string) => {
  const products = await product.productControllerGetById(id);
  return products.data;
};
