import express from 'express';
import UserController from '../controllers/userController';
import userValidations from '../middleware/userValidation';

const userRoute = express.Router();

userRoute.post('/user/signup',
  userValidations.validateUser('signup'),
  userValidations.emailExists,
  UserController.signup);


  
  
  
  export default userRoute;
