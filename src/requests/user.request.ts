import {clientApi} from '../clientApi.ts';
import {UserAddressCreateDto, UserCreditCardCreateDto} from '../../generated';

export const getUserMe = async () => {
  const auth = await clientApi.UserApi();
  const res = await auth.userControllerFindMe();
  return res.data;
};

export const postAddress = async (data: UserAddressCreateDto) => {
  const auth = await clientApi.UserApi();
  const res = await auth.userControllerCreateAddress(data);
  console.log(res);
  return res.data;
};

export const postCreditCard = async (data: UserCreditCardCreateDto) => {
  const auth = await clientApi.UserApi();
  const res = await auth.userControllerCreateCreditCard(data);
  return res.data;
};
