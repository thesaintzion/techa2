import jwt from 'jsonwebtoken';

/**
 * @class Auth
 * @description A class for user authentication
 * @exports Auth
 */
class Auth {
    /**
     * @method userAuth
     * @description Authenticate a user
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof Auth
     */
    static async userAuth(req, res, next) {
      const authorization  = req.headers.authorization;
      if (!authorization) {
        return res.status(401).json({
            status: 401,
            message: 'You are not logged in'
        });
      }
      let token = authorization;
      if (token.includes(' ')){
          token = authorization.split(' ')[1];
      }
      try {
        const decoded = await jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        return next();
      } catch (err) {
        const message = await Auth.getTokenErrorMessage(err);
        return res.status(401).json({
            status: 401,
            message: message
        });
      }
    }
  
    /**
     * @method getTokenErrorMessage
     * @description get jwt error message
     * @static
     * @param {object} error - Request object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof Auth
     */
    static getTokenErrorMessage(error) {
      const expMessage = 'your session has expired, please login again';
      const errorMessage = error.message === 'jwt expired'
        ? expMessage : 'Authentication failed';
      return errorMessage;
    }
  }
  
  export default Auth;
  