import Joi from '@hapi/joi';
import _ from 'lodash';
import User from '../models/user';
import Schemas from '../utils/validations';
import Helper from '../utils/Helper';

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
    console.log(req.params)
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
      const correctPassword = Helper.comparePassword(password, response.password);
      if (!correctPassword) {
        return res.status(401).json({ 
            status: 401, 
            message: 'Your password is incorrect.'
        });
      }
      if (response.isVerified === false) {
        return res.status(401).json({
            status: 401, 
            message: 'Your email is not verified.'
        });
     }
      next();
    });
  };
  
  export default {
    validateEmail, validateLogin, validateUser, emailExists
  };
  