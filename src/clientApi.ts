import {
  AuthApi,
  Configuration,
  OrdersApi,
  ProductsApi,
  UserApi,
} from '../generated';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ClientApi {
  private accessToken = async () => {
    return await AsyncStorage.getItem('accessToken');
  };

  private configuration = async () => {
    const openapiConfig = new Configuration();
    openapiConfig.basePath = 'http://localhost:3001';
    openapiConfig.baseOptions = {
      headers: {Authorization: 'Bearer ' + (await this.accessToken())},
    };
    return openapiConfig;
  };

  public ProductsApi = async () => {
    return new ProductsApi(await this.configuration());
  };

  public AuthApi = async () => {
    return new AuthApi(await this.configuration());
  };

  public UserApi = async () => {
    return new UserApi(await this.configuration());
  };

  public OrderApi = async () => {
    return new OrdersApi(await this.configuration());
  };
}

export default ClientApi;

export const clientApi = new ClientApi();
