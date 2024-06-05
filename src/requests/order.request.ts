import {clientApi} from '../clientApi.ts';
import {OrderCreateDto} from '../../generated';

export const postOrder = async (data: OrderCreateDto) => {
  const auth = await clientApi.OrderApi();
  const res = await auth.ordersControllerCreateOrder(data);
  return res.data;
};

export const getOrders = async () => {
  const auth = await clientApi.OrderApi();
  const res = await auth.ordersControllerGetUserOrders();
  return res.data;
};
