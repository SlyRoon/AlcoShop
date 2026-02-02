const prisma = require('../prisma/prismaClient');

class CategoriesService {
  async getCategories() {
    return await prisma.categories.findMany();
  }
  async getCategoryProducts(categoryName) {
    const products = await prisma.products.findMany({
      where: {
        Categories: {
          Name: categoryName,
        },
      },
    });
    return products;
  }
  async postCategory(name, description) {
    const postCategory = await prisma.categories.create({
      data: {
        Name: name,
        Description: description,
      },
    });
    return postCategory;
  }
  async deleteCategory(categoryId) {
    if(!categoryId){
        throw new Error("Такої категорії не існує")
    }
    return await prisma.$transaction(async (tx) => {
      const id = Number(categoryId);

      await tx.products.deleteMany({
        where: { CategoryId: id },
      });

      return await tx.categories.delete({
        where: { CategoryId: id },
      });
    });
  }
}

module.exports = new CategoriesService();
