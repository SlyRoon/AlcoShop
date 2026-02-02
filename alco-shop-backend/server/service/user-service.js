const prisma = require('../prisma/prismaClient');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');


class UserService {
  async registration(email, password) {
    const candidate = await prisma.users.findUnique({
      where: { Email: email },
    });

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    if (candidate) {
      throw ApiError.BadRequest(`Користувач з поштою ${email} вже існує, спробуйте інший`);
    }

    const user = await prisma.users.create({
      data: {
        Email: email,
        PasswordHash: hashPassword,
        FullName: email,
        Address: 'Не вказано',
        Role: 'User',
        IsActivated: false,
        ActivationLink: activationLink,
      },
    });
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user); // id , email, isActivated
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    console.log('UserService.activate START, link =', activationLink);

    const user = await prisma.users.findFirst({
      where: { ActivationLink: activationLink },
    });

    if (!user) {
      throw ApiError.BadRequest('Некоректне посилання активації');
    }

    // if (user.IsActivated) {
    //   console.log('User already activated, id =', user.UserId);
    //   return user;
    // }

    const updatedUser = await prisma.users.update({
      where: { UserId: user.UserId },
      data: { IsActivated: true },
    });

    // console.log('UserService.activate END, id =', updatedUser.UserId, 'IsActivated =', updatedUser.IsActivated);

    return updatedUser;
  }

  async login(email, password) {
    const user = await prisma.users.findUnique({
      where: { Email: email },
    });
    if (!user) {
      throw ApiError.BadRequest('Користувача не знайдено');
    }
    const isPassEquals = await bcrypt.compare(password, user.PasswordHash);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Некоректний пароль');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken , userDto.role);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await prisma.users.findUnique({
        where: {UserId: userData.id}
    })
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async getAllUsers(){
    const users = await prisma.users.findMany()
    return(users)
  }


}

module.exports = new UserService();
