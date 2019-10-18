import Joi from '@hapi/joi';

const name = Joi.string().trim().required().regex(/^[A-Za-z]+$/)
  .min(3);

const firstName = name
  .label('firstname is required, must be alphabets only and have at least 3 characters');

const lastName = name
  .label('lastname is required, must be alphabets only and have at least 3 characters');

const companyName = name
  .label('company name is required, must be alphabets only and have at least 3 characters');

const email = Joi.string().trim().lowercase().email()
  .required()
  .label('email is required, and should follow this format: myemail@domain.com');

const password = Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/)
  .label('password is required, must be at least 8 characters and must'
    + ' contain at least a number, one lowercase and one uppercase alphabet');

const registerAs = Joi.string()
    .label('Are you registering as a student or company?');

export default {
  signup: Joi.object().keys({
    firstName,
    lastName,
    email,
    password,
    registerAs
  }),
  signin: Joi.object().keys({
    email,
    password
  }),
  signupCompany: Joi.object().keys({
    companyName,
    email,
    password
  }),
  updatePassword: Joi.object().keys({
    password
  }),
};
