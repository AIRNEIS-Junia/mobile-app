import {clientApi} from '../clientApi.ts';

export const getProducts = async () => {
  const product = await clientApi.ProductsApi();
  const products = await product.productControllerGetAll();
  return products.data;
};

export const getProductCategories = async () => {
  const product = await clientApi.ProductsApi();
  const products = await product.productControllerGetAllCategory();
  return products.data;
};

export const getProductById = async (id: string) => {
  const product = await clientApi.ProductsApi();
  const products = await product.productControllerGetById(id);
  return products.data;
};

export const getProductsByCategoryId = async (id: string) => {
  const product = await clientApi.ProductsApi();
  const products = await product.productControllerFindByCategoryId(id);
  return products.data;
};
