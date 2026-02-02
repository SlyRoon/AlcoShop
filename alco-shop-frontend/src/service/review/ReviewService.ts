import { AxiosResponse } from "axios";
import { IGetReview } from "../../models/review/IGetReview";
import $api from "../../http";
import { IPostReview } from "../../models/review/IPostReview";

export default class ReviewService {
    static getReviewProduct(id: number): Promise<AxiosResponse<IGetReview[]>> {
        return $api.get<IGetReview[]>(`/product/${id}/reviews`)
    }


    static postReviewProduct(productId: number, rating: number, comment: string, userId: string | number): Promise<AxiosResponse<IPostReview>> {
        return $api.post<IPostReview>(`/product/${productId}/postreviews`, {
            rating,
            comment,
            userId,
        })
    }
}