
const userService = require('../service/user-service')
class UserController{
 async users(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async upDateCheckOut(req, res, next) {
    try {
      const { id, name, surname, phone, address } = req.body;
      const userData = await UpdateUserInfo.updateUser(id, name, surname, phone, address);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController()