module.exports = class UserDto {
  email;
  id;
  isActivated;
  role;

  constructor(model) {
    this.email = model.Email;
    this.id = model.UserId;
    this.isActivated = model.IsActivated;
    this.role = model.Role
  }
};
