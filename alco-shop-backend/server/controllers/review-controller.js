const prisma = require('../prisma/prismaClient');
const ReviewsService = require('../service/reviews-service');
class ReviewController {
  async getReviewProduct(req, res, next) {
    try {
      const id = Number(req.params.id);
      const getReviewProduct = await ReviewsService.getReviewsService(id);
      return res.json(getReviewProduct);
    } catch (e) {
      next(e);
    }
  }
  async postReviewProducts(req, res, next) {
    try {
      const productId = req.params.id;

      const { userId, rating, comment } = req.body;
      const reviewProducts = await ReviewsService.postReviewProducts(userId, productId, rating, comment);
      console.log(reviewProducts);
      return res.json(reviewProducts);
    } catch (e) {
      next(e);
    }
  }
  async getAllReview(req, res, next) {
    try {
      const review = await ReviewsService.getAllReview();
      return res.json(review);
    } catch (e) {
      next(e);
    }
  }
  async deleteReview(req, res, next) {
    try {
      const {id} = req.params;
      const review = await ReviewsService.deleteReview(id);
      return res.json(review);
    } catch(e) {
      next(e);
    }
  }
}

module.exports = new ReviewController();
