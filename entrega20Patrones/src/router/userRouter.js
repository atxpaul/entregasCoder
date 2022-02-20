import express from 'express';
import passport from 'passport';
import UserController from '../controller/UserController.js';
import checkAuthentication from '../middleware/checkAuthentication.js';

const { Router } = express;
const router = new Router();

const userController = new UserController();

router.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/faillogin' }),
  userController.postLogin
);

router.post(
  '/register',
  passport.authenticate('signup', { failureRedirect: '/failregister' }),
  userController.postRegister
);

router.get('/failregister', userController.getfailRegister);
router.get('/faillogin', userController.getfailLogin);
router.get('/login', userController.getLogin);
router.get('/register', userController.getRegister);
router.get('/logout', userController.getLogout);
router.get('/user', userController.getUser);
router.get('/', checkAuthentication, userController.getMain);

export default router;
