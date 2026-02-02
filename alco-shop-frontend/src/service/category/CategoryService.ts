import { AxiosResponse } from "axios";
import { ICategories } from "../../models/category/ICategories";
import $api from "../../http";


export default class CategoryService {
    static fetchCategory() : Promise<AxiosResponse<ICategories[]>>{
        return $api.get<ICategories[]>('/categories')
    } 
    
}