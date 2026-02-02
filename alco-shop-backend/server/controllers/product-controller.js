const Products = require('../service/products-service')
class ProductController {
  async getAllProducts(req, res, next) {
    try {
      const getAllProduct = await Products.getAllProducts();
      return res.json(getAllProduct);
    } catch (e) {
      next(e);
    }
  }
  async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;
      const getOneProduct = await Products.getOneProduct(id);
      return res.json(getOneProduct);
    } catch (e) {
      next(e);
    }
  }
  async upDateProduct(req, res, next) {
    try {
      const { productId, productData } = req.body;
      const newUpdatedProduct = await Products.updataProduct(productId, productData);
      return res.json(newUpdatedProduct);
    } catch (e) {
      next(e);
    }
  }
  async deleteProduct(req, res, next) {
    try {
      const { productId } = req.body;
      const deleteProduct = await Products.deleteProduct(productId);
      return res.json(deleteProduct);
    } catch (e) {
      next(e);
    }
  }
  async postProduct(req, res, next) {
    try {
      const productData = req.body;
      const newProduct = await Products.postProduct(productData);

      return res.json(newProduct);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ProductController();
