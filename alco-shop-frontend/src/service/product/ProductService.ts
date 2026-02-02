import { Axios, AxiosResponse } from 'axios';
import { ICategoryProducts } from '../../models/category/ICategoryProducts';
import $api from '../../http';

export default class ProductService {
  static getProductsByCategory(categoryName: string): Promise<AxiosResponse<ICategoryProducts[]>> {
    return $api.get<ICategoryProducts[]>(`/categories/${categoryName}`);
  }
  static getOneProduct(id: string | number): Promise<AxiosResponse<ICategoryProducts>> {
    return $api.get<ICategoryProducts>(`/product/${id}`);
  }
}
