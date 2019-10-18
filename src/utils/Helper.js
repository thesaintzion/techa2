import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const secret = process.env.SECRET;

/**
 * @class Helper
 * @description An helper class containing utility methods
 * @exports Helper
 */

export default class Helper {

    /**
     * @method generateToken
     * @description Generates token for securing endpoints
     * @static
     * @param {object} payload - data object
     * @returns {object} JSON response
     * @memberof Helper
     */

    static generateToken(payload) {
      const token = jwt.sign(payload, secret, {
        expiresIn: '24hr',
      });
      return token;
    }
  
    /**
     * @method hashPassword
     * @description Hash password before saving in the database
     * @static
     * @param {string} password
     * @returns {string} string response
     * @memberof Helper
     */
  
    static async hashPassword(password) {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    }

    /**
       * compare Password
       * @param {string} hashPassword
       * @param {string} password
       * @returns {Boolean} return True or False
    */
   
    static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * @method verifyToken
   * @description verify user's token for authorization
   * @static
   * @param { string } token - sting
   * @returns {object} payload
   * @memberof Helper
  */

 static verifyToken(token) {
  const decoded = jwt.verify(token, secret);
  return decoded;
}

/**
    * @method constructResetEmail
    * @description construct a password rest email
    * @static
    * @param {object} req object,
    * @param {string} email string,
    * @returns {object} constructed object
    * @memberof Helper
    */
   static constructResetEmail(req, email) {
    const recipients = [email];
    const issued = Date.now();
    const expiryDate = parseInt(Date.now(), 10) + 3600000;
    const payload = { email, issued, expiryDate };
    const token = Helper.generateToken(payload);
    const link = `http://${req.headers.host}/api/v1/users/reset/${token}`;
    const text = `
           <h2>Hi, there</h2>
           <p>you can reset your password <a href='${link}'>here</a></p>
    `;
    return {
      from: `Tech Academy <${process.env.EMAIL}>`,
      to: [...recipients],
      subject: 'Tech Academy Password Reset Link',
      html: text
    };
  }

  static async verifyExistingEmail(email) {
    const check = await User.findOne({ email: email.trim().toLowerCase(), isVerified: true });
    if (check) {
      return true;
    }
    return false;
  }


}

