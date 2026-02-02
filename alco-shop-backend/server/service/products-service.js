const prisma = require('../prisma/prismaClient');
const ApiError = require('../exceptions/api-error');

class Products {
  async getAllProducts() {
    return await prisma.products.findMany();
  }

  async getOneProduct(id) {
    const productId = Number(id);

    const product = await prisma.products.findUnique({
      where: {
        ProductId: productId,
      },
    });

    if (!product) {
      throw ApiError.BadRequest('Товар не знайдено');
    }

    return product;
  }
  async postProduct(productData) {
    const product = await prisma.products.create({
      data: {
        Name: productData.name,
        CategoryId: productData.categoryId,
        Price: productData.price,
        AlcoholPercent: productData.alcoholPercent,
        VolumeML: productData.volumeML,
        Stock: productData.stock,
        Description: productData.description,
        ImagePath: productData.imagePath,
      },
    });
    return product;
  }
  async updataProduct(productId, productData) {
    if (!productId) {
      throw new Error('Такого продукту не існує, спробуйте інший');
    }
    const updataProduct = await prisma.products.update({
      where: {
        ProductId: Number(productId),
      },
      data: {
        Name: productData.name,
        CategoryId: productData.categoryId,
        Price: productData.price,
        AlcoholPercent: productData.alcoholPercent,
        VolumeML: productData.volumeML,
        Stock: productData.stock,
        Description: productData.description,
        ImagePath: productData.imagePath,
      },
    });
    return updataProduct;
  }
  async deleteProduct(productId ) {
    return await prisma.$transaction(async (tx) => {
      if (!productId) {
        throw new Error('Такого продукту не існує, спробуйте інший');
      }
      await tx.reviews.deleteMany({
        where: {ProductId: Number(productId)}
      })
      const deleteProduct = await tx.products.delete({
        where: { ProductId: Number(productId) },
      });
      return deleteProduct;
    });
  }
}

module.exports = new Products();
