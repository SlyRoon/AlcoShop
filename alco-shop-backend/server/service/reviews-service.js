const prisma = require("../prisma/prismaClient");


class ReviewsService {
    async getReviewsService(productId ){
        const reviewsProduct = await prisma.reviews.findMany({
            where:{
               ProductId: Number(productId)
            },
            include: {
                Users: {
                    select: {
                        FullName: true
                    }
                }   
            },
            orderBy: {
                ReviewId: 'desc'
            }
        })
        return reviewsProduct
    }
    async postReviewProducts(userId , productId , rating , comment  ){
        const reviewProducts = await prisma.reviews.create({
            data: {
                UserId: Number(userId),
                ProductId: Number(productId),
                Rating: rating,
                Comment: comment,
                ReviewDate: new Date()
            }
            
        }) 
        return reviewProducts
    }
    async getAllReview() {
        const review = await prisma.reviews.findMany()
        return review
    }
    async deleteReview(id){
        const review = await prisma.reviews.delete({
            where: {
                ReviewId: Number(id)
            }
        })
        return review
    }
}

module.exports = new ReviewsService();