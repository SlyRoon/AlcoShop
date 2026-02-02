const jwt = require('jsonwebtoken');
const prisma = require('../prisma/prismaClient');

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '120m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '90d' });
    return {
      accessToken,
      refreshToken,
    };
  }
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await prisma.tokens.findFirst({
      where: { UserId: userId },
    });
    if (tokenData) {
      const updated = await prisma.tokens.update({
        where: { Id: tokenData.Id },
        data: { RefreshToken: refreshToken },
      });
      return updated;
    }
    const token = await prisma.tokens.create({
      data: {
        UserId: userId,
        RefreshToken: refreshToken,
      },
    });
    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = await prisma.tokens.findFirst({
      where: { RefreshToken: refreshToken },
    });

    if (tokenData) {
      return await prisma.tokens.delete({
        where: { Id: tokenData.Id },
      });
    }
    return null;
  }
  async findToken(refreshToken) {
    const tokenData = await prisma.tokens.findFirst({
      where: { RefreshToken: refreshToken },
    });
    return tokenData;
  }
}

module.exports = new TokenService();
