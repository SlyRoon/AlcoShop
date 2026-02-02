import { Axios, AxiosResponse } from 'axios';
import { IUsersUpData } from '../../models/user/IUsersUpData';
import $api from '../../http';

export default class UpdateUserInfoService {
  static UpdateUserInfoService(
    id: number,
    name: string,
    surname: string,
    phone: number,
    address: string,
  ): Promise<AxiosResponse<IUsersUpData>> {
    return $api.put<IUsersUpData>('/checkout/update', {
      name,
      id,
      surname,
      phone,
      address,
    });
  }
}
