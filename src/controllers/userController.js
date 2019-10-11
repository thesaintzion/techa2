import UserService from '../services/userServices';
import Helper from '../utils/Helper';
import passport from 'passport';


/**
 * @class
 * @description A container class for all controllers
 * @exports UserController
 */
export default class UserController {
    /**
     * @method
     * @description Implements signup endpoint
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} JSON response
     * @memberof UserController
     */
    static signup(req, res) {
      const user = req.body;
      console.log("new user:", user);
      UserService.signup(user).then(response => {
        const result = {
          _id: response._id,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          password: response.password,
          registerAs: response.registerAs
        };
        const { email, _id } = result;
        const token = Helper.generateToken({ _id, email });
        return res.status(201).json({
          status: 201, 
          data: { token, ...result }
        });
      }).catch((error) => {
        console.log(error);
        return res.status(500).json({
          status: 500, 
          error: 'database error'
        });
      });
    }
  
    /**
     * @method
     * @description Implements signin endpoint
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} JSON response
     * @memberof UserController
     */
    static signin(req, res) {
      passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({
            message: info ? info.message : 'Login failed',
            user   : user
        });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }

      const loginCredentials = req.body;
      UserService.signin(loginCredentials).then(response => {
        const token = Helper.generateToken({ id: response._id, email: response.email });
        return res.status(200).json({
          status: 200, 
          message:'Login successful.', 
          data: { token, ...response }
        });
      }).catch(() => {
        return res.status(500).json({
          status: 500, 
          error:'database error'
        });
      });
    });
  })
}
  
    /**
     * @method
     * @description Email verification endpoint
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} JSON response
     * @memberof UserController
    */
    static async verifyUserEmail(req, res) {
      const { token } = req.params;
      const { id, email } = Helper.verifyToken(token);
      const user = await UserService.findUser(id);
      if (email === user.email) {
        UserService.updateUser(email);
      }
      return res.status(200).json({
        status: 200, 
        message: 'Your account has been verified'
      });
    }
  }
  