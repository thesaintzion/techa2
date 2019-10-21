import User from '../models/user';
import Companies from '../models/companies';
import Helper from '../utils/Helper'


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
      firstName, lastName, email, password
    } = userCredentials;
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim().toLowerCase();
    password = password;
    let user = {
      firstName, lastName, email, password
    };

    let newUser = new User(user);
    console.log(newUser);
    return await newUser.save();
  }

   /**
   * @method signupCompany
   * @description Medium between the database and UserController
   * @static
   * @param {object} userCredentials - data object
   * @returns {object} JSON response
   * @memberof UserService
   */
  static async signupCompany(userCredentials) {
    let {
      companyName, email, password
    } = userCredentials;
    companyName = companyName.trim();
    email = email.trim().toLowerCase();
    password = password;
    const company = {
      companyName, email, password
    };

    const newCompany = new Companies(company);
    console.log(newCompany);
    return await newCompany.save();
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

   /**
   * @method signinCompany
   * @description Signs in user with valid credentials
   * @static
   * @param {object} loginCredentials - data object
   * @returns {object} JSON response
   * @memberof UserService
   */
  static async signinCompany(loginCredentials) {
    let { email } = loginCredentials;
    email = email.trim().toLowerCase();
    const foundUser = await Companies.findOne({ email });
    const user = {
      id: foundUser.id,
      email: foundUser.email,
      companyName: foundUser.companyName,
    };
    return user;
  }
  
}
