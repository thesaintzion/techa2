import Joi from '@hapi/joi';
import _ from 'lodash';
import User from '../models/user';
import Companies from '../models/companies';
import Schemas from '../utils/validations';
import bcrypt from 'bcryptjs';

/**
 * @function
 * @description Validates user credentials
 * @param {object} path - The signup schema
 * @returns {object} JSON response
 */
const validateUser = path => (req, res, next) => {
    const user = req.body;
    if (_.has(Schemas, path)) {
      const schema = _.get(Schemas, path, 0);
      const response = Joi.validate(user, schema, { abortEarly: false });
      if (!response.error) {
        req.body = user;
      } else {
        const errors = [];
        response.error.details.forEach(error => {
          errors.push(error.context.label);
          console.log(error);
        });
        return res.status(400).json({status: 400, error: errors});
      }
    }
    next();
  };
  
  const validateEmail = path => (req, res, next) => {
    const email = req.params;
    if (_.has(Schemas, path)) {
      const schema = _.get(Schemas, path, 0);
      const response = Joi.validate(email, schema, { abortEarly: false });
      if (!response.error) {
        req.params = email;
      } else {
        const errors = [];
        response.error.details.forEach(error => {
          errors.push(error.context.label);
        });
        return res.status(400).json({status: 400, error: errors});
      }
    }
    next();
  };
  /**
 * @function
 * @description Check if email is already exists
 * @param {object} req - Resquest object
 * @param {object} res - Response object
 * @param {object} next
 * @returns {object} JSON response
 */
const emailExists = (req, res, next) => {
    User.findOne({ email: req.body.email.trim().toLowerCase() }).then(data => {
      if (data) {
        return res.status(409).json({
            status: 409, 
            message: 'email already in use'
        });
      }
      next();
    }).catch(() => {
      return res.status(500).json({
          status: 500, 
          message: 'database error'
        });
    });
  };
  
  
  /**
   * @function
   * @description Check if user email exist, password correct and verified
   * @param {object} req - Resquest object
   * @param {object} res - Response object
   * @param {object} next
   * @returns {object} JSON response
   */
  const validateLogin = (req, res, next) => {
    const { password } = req.body;
    User.findOne({ email: req.body.email.trim().toLowerCase() }).then(response => {
      if (!response) {
        return res.status(404).json({
            status: 404, 
            message: 'Your email does not exist.'
    });
    }
      bcrypt.compare(password, response.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ 
            status: 401, 
            message: 'Your password is incorrect.'
        });
      }
      if (response.isVerified === false) {
        return res.status(401).json({
            status: 401, 
            message: 'Your email is not verified, kindly verify your email.'
        });
     }
     if(err){
       console.log(err);
       return res.status(500).json({
        status: 500, 
        message: 'Database error'
     });
     }
      next();
    })
})

}


/**
   * @function
   * @description Check if user email exist, password correct and verified
   * @param {object} req - Resquest object
   * @param {object} res - Response object
   * @param {object} next
   * @returns {object} JSON response
   */
  const validateCompanyLogin = (req, res, next) => {
    const { password } = req.body;
    Companies.findOne({ email: req.body.email.trim().toLowerCase() }).then(response => {
      if (!response) {
        return res.status(404).json({
            status: 404, 
            message: 'Your email does not exist.'
    });
    }
      bcrypt.compare(password, response.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ 
            status: 401, 
            message: 'Your password is incorrect.'
        });
      }
      if (response.isVerified === false) {
        return res.status(401).json({
            status: 401, 
            message: 'Your email is not verified, kindly verify your email.'
        });
     }
     if(err){
       console.log(err);
       return res.status(500).json({
        status: 500, 
        message: 'Database error'
     });
     }
      next();
    })
})

}


/**
   * @method resetPassword
   * @description Signs in user with valid credentials
   * @param {string} password
   * @param {string} email
   * @returns {object} JSON response
   * @memberof UserService
   */
  const resetPassword = (password, email) => {
    const newPassword = Helper.hashPassword(password);
    return User.findOneAndUpdate(email, { password: newPassword }, { new: true });
  }


 

  export default {
    validateEmail, validateLogin, validateUser, emailExists, validateCompanyLogin, resetPassword
  };
  