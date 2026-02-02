import { AxiosPromise, AxiosResponse } from 'axios';
import { ICategoryProducts } from '../../models/category/ICategoryProducts';
import { OrderResponse } from '../../models/response/OrderResponse';
import $api from '../../http';

export type CartItem = ICategoryProducts & { amount: number };

export default class OrderService {
  static async createOrder(
    items: CartItem[],
    userId: number,
    total: number,
    payMent: string,
  ): Promise<AxiosResponse<OrderResponse>> {
    return $api.post<OrderResponse>('/checkout', {
      items,
      userId,
      total,
      payMent,
    });
  }
}
