const prisma = require('../prisma/prismaClient');

class UpdateUserInfo {
  async updateUser(userId, name, surname, phone, address) {
    if (!userId) {
      throw new Error("Немає ID користувача");
    }
    const updateUser = await prisma.users.update({
      where: {
        UserId: Number(userId),
      },
      data: {
        FullName: `${surname} ${name}`,
 
        Address: address,
        Phone: String(phone)
      },
    });
    return updateUser
  }
}

module.exports = new UpdateUserInfo();