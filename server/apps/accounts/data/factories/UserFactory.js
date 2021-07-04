/**
 * @param username:string
 * @param name:string
 * @param password:string
 * @param avatar:string
 */
class UserFactory {
  #username;
  #name;
  #password;
  #avatar;

  constructor() {}

  get username() {
    return this.#username;
  }

  set username(newUsername) {
    this.#username = newUsername;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get password() {
    return this.#password;
  }

  set password(newPassword) {
    this.#password = newPassword;
  }

  get avatar() {
    return this.#avatar;
  }

  set avatar(newAvatar) {
    this.#avatar = newAvatar;
  }
}

module.exports = UserFactory;