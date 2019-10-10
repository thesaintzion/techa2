import Joi from '@hapi/joi';

class CheckValidInput {
    /**
     * funtion to check if user input valid details during registration
     * @param {user} object
     */
    static createUser(user) {
      const schema = Joi.object().keys({
        email: Joi.string().trim().strict().email()
          .required()
          .error(() => 'Valid email field is required'),
        first_name: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
          .min(3)
          .required()
          .error(() => 'First name field is required with min length of 3 and must be alphabet'),
        last_name: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
          .min(3)
          .required()
          .error(() => 'last name field is required with min length of 3 and must be alphabet'),
        password: Joi.string().trim().strict()
          .min(6)
          .required()
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/)
          .label('password is required, must be at least 8 characters and must'
          + ' contain at least a number, one lowercase and one uppercase alphabet')
      });
      
      return Joi.validate(user, schema);
    }

     /**  funtion to validate login inputs
     * @param{details} string
     */
  static loginAuser(details) {
    const schema = Joi.object().keys({
      email: Joi.string().trim().strict().email()
        .required()
        .error(() => 'Email is required'),
      password: Joi.string().trim().strict().required()
        .error(() => 'you must provide a correct password'),
    });
    return Joi.validate(details, schema);
  }


}

export default CheckValidInput;
