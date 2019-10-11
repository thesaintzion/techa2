import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        expiresIn: '1hr',
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

}

