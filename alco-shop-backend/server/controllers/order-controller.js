const ApiError = require('../exceptions/api-error');
const orderService = require('../service/order-service');

class OrderController {
  async createOrder(req, res, next) {
    try {
      const { items, userId, total, payMent } = req.body;
      const order = await orderService.createOrder(items, userId, total, payMent);
      return res.json(order);
    } catch (e) {
      next(e);
    }
  }
  async getOrder(req, res, next) {
    try {
      const getOrder = await orderService.getOrder();
      return res.json(getOrder);
    } catch (e) {
      next(e);
    }
  }
  async getOrderItems(req, res, next) {
    try {
      const {id} = req.params
      const items = await orderService.getOrderItems(id)
      return res.json(items)
    } catch (e) {
      next(e);
    }
  }
  async putOrderStatus(req , res, next) {
    try{
      const {id} = req.params
      const {status} = req.body
      if(!status){
        return next(ApiError.BadRequest('Не вказано новий статус'))
      }
      const updateOrder = await orderService.putOrderStatus(id , status) 
      return res.json(updateOrder)
    } catch (e){
      next(e)
    }
  }
}

module.exports = new OrderController();
