export interface IGetReview{
    ReviewId: number
    UserId: number;
    ProductId: number;
    Rating: number;
    Comment: string;
    ReviewDate: string;

    Users: {
        FullName: string
    }

}