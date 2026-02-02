import { Axios, AxiosResponse } from "axios";
import { ICategoryProducts } from "../../models/category/ICategoryProducts";
import $api from "../../http";



export default class GetAllProductService {
    static getAllProductService() : Promise<AxiosResponse<ICategoryProducts[]>>{
        return $api.get<ICategoryProducts[]>('/allproducts')
    }
}