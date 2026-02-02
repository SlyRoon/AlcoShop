const prisma = require('../prisma/prismaClient');

class OrderService {
  async createOrder(items, userId, total, payMent) {
    return await prisma.$transaction(async (tx) => {
      for (const item of items) {
        const product = await tx.products.findUnique({
          where: { ProductId: Number(item.ProductId) },
        });
        if (!product || product.Stock < item.amount) {
          throw new Error(`Товару "${item.Name || 'Немає'}" недостатньо на складі`);
        }
      }
      const order = await tx.orders.create({
        data: {
          UserId: Number(userId),
          OrderDate: new Date(),
          Total: total,
          Status: 'Pending',
          OrderItems: {
            create: items.map((item) => ({
              ProductId: Number(item.ProductId),
              Quantity: item.amount,
              Subtotal: item.Price * item.amount,
            })),
          },
        },
        include: {
          OrderItems: true,
        },
      });
      for (const item of items) {
        await tx.products.update({
          where: { ProductId: Number(item.ProductId) },
          data: {
            Stock: { decrement: item.amount },
          },
        });
      }
      await tx.payments.create({
        data: {
          OrderId: order.OrderId,
          PaymentDate: new Date(),
          Amount: total,
          Method: payMent,
        },
      });
      return order;
    });
  }
  async getOrder() {
    const getOrder = await prisma.orders.findMany();
    return getOrder;
  }
  async getOrderItems(orderId) {
    const items = await prisma.orders.findUnique({
      where: {
        OrderId: Number(orderId),
      },
      include: {
        OrderItems: {
          include: {
            Products: true,
          },
        },
        Payments: true,
      },
    });
    return items;
  }
  async putOrderStatus(orderId , status){
    const orderStatus = await prisma.orders.update({
      where: {
        OrderId: Number(orderId)
      },
      data: {
        Status: status
      }
    })
    return orderStatus
  }
}

module.exports = new OrderService();
