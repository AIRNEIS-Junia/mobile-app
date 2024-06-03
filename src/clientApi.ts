import {Configuration, ProductsApi} from '../generated';

class ClientApi {
  private accessToken = () => {
    return '';
  };

  private configuration = () => {
    const openapiConfig = new Configuration();
    openapiConfig.basePath = 'http://localhost:3001';
    openapiConfig.baseOptions = {
      headers: {Authorization: 'Bearer ' + this.accessToken()},
    };
    return openapiConfig;
  };

  public ProductsApi = () => {
    return new ProductsApi(this.configuration());
  };
}

export default ClientApi;

export const clientApi = new ClientApi();
