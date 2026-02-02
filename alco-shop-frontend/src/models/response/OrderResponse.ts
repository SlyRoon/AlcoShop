import { IOrderItem } from '../oder/IOrderItem';
export interface OrderResponse {
  OrderId: number;
  UserId: number;
  OrderDate: string;
  Total: number;
  Status: string;
  OrderItems: IOrderItem[];
}
