import express from 'express';
import UserController from '../controllers/userController';
import userValidations from '../middleware/userValidation';

const userRoute = express.Router();

userRoute.post('/user/signup',
  userValidations.validateUser('signup'),
  userValidations.emailExists,
  UserController.signup);

userRoute.post('/user/signupCompany',
  userValidations.validateUser('signupCompany'),
  userValidations.emailExists,
  UserController.signupCompany);

userRoute.post('/user/signin',
  userValidations.validateUser('signin'),
  userValidations.validateLogin,
  UserController.signin);

userRoute.post('/user/signinCompany',
  userValidations.validateUser('signin'),
  userValidations.validateCompanyLogin,
  UserController.signinCompany);

userRoute.get('/users/verifyEmail/:token',
    UserController.verifyUserEmail);

userRoute.get('/users/verifyCompany/:token',
    UserController.verifyCompanyEmail);

userRoute
    .post('/users/reset', UserController.resetPassword)
    .get('/users/reset/:token', UserController.updatePassword)
    .patch(
      '/users/reset/:token',
      userValidations.validateUser('updatePassword'),
      UserController.updatePassword
    );

userRoute
    .post('/users/resetCompany', UserController.resetPassword)
    .get('/users/resetCompany/:token', UserController.updatePassword)
    .patch(
      '/users/resetCompany/:token',
      userValidations.validateUser('updatePassword'),
      UserController.updatePassword
    );
  

    
  export default userRoute;
