import User from '../models/user';


/**
 * @class
 * @description A class containing all services
 * @exports UserService
 */
export default class UserService {
  /**
   * @method signup
   * @description Medium between the database and UserController
   * @static
   * @param {object} userCredentials - data object
   * @returns {object} JSON response
   * @memberof UserService
   */
  static async signup(userCredentials) {
    let {
      firstName, lastName, email, password, registerAs
    } = userCredentials;
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim().toLowerCase();
    password = password;
    registerAs = registerAs;
    const user = {
      firstName, lastName, email, password, registerAs
    };

    const newUser = new User(user);
    console.log(newUser);
    return await newUser.save();
  }

  /**
   * @method signin
   * @description Signs in user with valid credentials
   * @static
   * @param {object} loginCredentials - data object
   * @returns {object} JSON response
   * @memberof UserService
   */
  static async signin(loginCredentials) {
    let { email } = loginCredentials;
    email = email.trim().toLowerCase();
    const foundUser = await User.findOne({ email });
    const user = {
      id: foundUser.id,
      email: foundUser.email,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName
    };
    return user;
  }

  
}
