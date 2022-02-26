import passport from 'passport';
import UserController from '../controller/UserController.js';
import checkAuthentication from '../middleware/checkAuthentication.js';
import logger from '../config/logger.js';

class UserRouter {
  constructor(express) {
    this.express = express;
    this.router = this.express.Router();
    this.userController = new UserController();
  }

  start() {
    logger.info(`Starting User Router`);
    this.router.post(
      '/login',
      passport.authenticate('login', { failureRedirect: '/faillogin' }),
      this.userController.postLogin
    );

    this.router.post(
      '/register',
      passport.authenticate('signup', { failureRedirect: '/failregister' }),
      this.userController.postRegister
    );

    this.router.get('/failregister', this.userController.getfailRegister);
    this.router.get('/faillogin', this.userController.getfailLogin);
    this.router.get('/login', this.userController.getLogin);
    this.router.get('/register', this.userController.getRegister);
    this.router.get('/logout', this.userController.getLogout);
    this.router.get('/user', this.userController.getUser);
    this.router.get('/', checkAuthentication, this.userController.getMain);

    return this.router;
  }
}

export default UserRouter;
