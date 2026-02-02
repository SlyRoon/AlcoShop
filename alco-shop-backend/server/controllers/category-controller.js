const categoriesService = require('../service/categories-service');
class CategoryController {
  async categories(req, res, next) {
    try {
      const categories = await categoriesService.getCategories();
      return res.json(categories);
    } catch (e) {
      next(e);
    }
  }
  async categoryProducts(req, res, next) {
    try {
      const { categoryName } = req.params;
      const categoryProducts = await categoriesService.getCategoryProducts(categoryName);
      return res.json(categoryProducts);
    } catch (e) {
      next(e);
    }
  }
  async postCategory(req, res, next) {
    try {
      const { name, description } = req.body;
      const newCategory = await categoriesService.postCategory(name, description);
      return res.json(newCategory);
    } catch (e) {
      next(e);
    }
  }
  async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.body;
      const deleteCategory = await categoriesService.deleteCategory(categoryId);
      return res.json(deleteCategory);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CategoryController();
