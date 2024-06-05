import {clientApi} from '../clientApi.ts';
import {AuthLoginDto, AuthRegisterDto} from '../../generated';

export const postAuthLogin = async (data: AuthLoginDto) => {
  const auth = await clientApi.AuthApi();
  const res = await auth.authControllerLogin(data);
  return res.data;
};

export const postAuthRegister = async (data: AuthRegisterDto) => {
  const auth = await clientApi.AuthApi();
  const res = await auth.authControllerRegister(data);
  return res.data;
};
