import UserService from '../services/userServices';
import Helper from '../utils/Helper';
import sendEmail from '../utils/mailer';
import transporter from '../utils/transporter';
import User from '../models/user';
import Companies from '../models/companies';


/**
 * @class
 * @description A container class for all controllers
 * @exports UserController
 */
export default class UserController {

  /**
   * @method
   * @description compose email verification
   * @static
   * @param {string} email
   * @param {string} host
   * @param {string} token - application url
   * @returns {object} object
  */
 static composeVerificationMail(email, host, token) {
  return {
    recipientEmail: `${email}`,
    subject: 'Email verification',
    body: `<p>Your registration was successful. Please click on the link below to verify your email</p></br>
    <a href='http://${host}/api/v1/users/verifyEmail/${token}'>click here to verify your email</a>`
  };
}

/**
   * @method
   * @description compose email verification
   * @static
   * @param {string} email
   * @param {string} host
   * @param {string} token - application url
   * @returns {object} object
  */
 static composeCompanyVerificationMail(email, host, token) {
  return {
    recipientEmail: `${email}`,
    subject: 'Email verification',
    body: `<p>Your registration was successful. Please click on the link below to verify your email</p></br>
    <a href='http://${host}/api/v1/users/verifyCompany/${token}'>click here to verify your email</a>`
  };
}
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
      const { host } = req.headers;
      const msg = 'Kindly confirm the link sent to your email account to complete your registration';
      UserService.signup(user).then(response => {
        const result = {
          _id: response._id,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          password: response.password,
          registerAs: response.registerAs,
          createdAt: response.createdAt
        };
        const { email, _id, createdAt } = result;
        const token = Helper.generateToken({ _id, email, createdAt });
        const mailData = UserController.composeVerificationMail(email, host, token);
        sendEmail(transporter(), mailData);
        return res.status(201).json({
          status: 201, 
          message: msg,
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
     * @description Implements signup endpoint
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} JSON response
     * @memberof UserController
     */
    static signupCompany(req, res) {
      const user = req.body;
      const { host } = req.headers;
      const msg = 'Kindly confirm the link sent to your email account to complete your registration';
      UserService.signupCompany(user).then(response => {
        const result = {
          _id: response._id,
          email: response.email,
          companyName: response.companyName,
          password: response.password,
          createdAt: response.createdAt
        };
        const { email, _id, companyName, createdAt } = result;
        const token = Helper.generateToken({ _id, email, createdAt, companyName });
        const mailData = UserController.composeCompanyVerificationMail(email, host, token);
        sendEmail(transporter(), mailData);
        return res.status(201).json({
          status: 201, 
          message: msg,
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
      const loginCredentials = req.body;
      UserService.signin(loginCredentials).then(response => {
        const token = Helper.generateToken({ _id: response._id, email: response.email, 
          createdAt: response.createdAt });
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
    static signinCompany(req, res) {
      const loginCredentials = req.body;
      UserService.signinCompany(loginCredentials).then(response => {
        const token = Helper.generateToken({ _id: response._id, email: response.email,
           companyName: response.companyName, createdAt: response.createdAt });
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
      const { _id, email } = Helper.verifyToken(token);
      User.findOneAndUpdate(_id, { isVerified: true }, { new: true })
       .then(user => {
         if (email === user.email && user.isVerified) {
           console.log(user);
          return res.status(200).json({
          status: 200, 
          message: 'Your account has been verified successfully'
          });
        }
        }).catch(err => {
          console.log(err);
        return res.status(500).json({
        status: 500, 
        message: 'Something went wrong'
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
   static async verifyCompanyEmail(req, res) {
    const { token } = req.params;
    const { _id, email } = Helper.verifyToken(token);
    Companies.findOneAndUpdate(_id, { isVerified: true }, { new: true })
     .then(company => {
       if (email === company.email && company.isVerified) {
         console.log(company);
        return res.status(200).json({
        status: 200, 
        message: 'Your account has been verified successfully'
        });
      }
      }).catch(err => {
        console.log(err);
      return res.status(500).json({
      status: 500, 
      message: 'Something went wrong'
      });
    })
}
}