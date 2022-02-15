import logger from '../config/logger.js';

class UserController {
  constructor() {}

  //Este controller no tiene capa de negocio ya que es meramente redireccional con alguna operación con la sesión.

  postLogin = async (req, res) => {
    const { originalUrl, method } = req;
    logger.info(`${method}-${originalUrl} Recibiendo petición`);
    res.redirect('/');
  };

  postRegister = async (req, res) => {
    const { originalUrl, method } = req;
    logger.info(`${method}-${originalUrl} Recibiendo petición`);
    req.session.destroy();
    res.redirect('/login');
  };

  getfailRegister = async (req, res) => {
    const { originalUrl, method } = req;
    logger.warn(
      `${method}-${originalUrl} Recibiendo petición para fallo de registro`
    );
    res.sendFile(process.cwd() + '/public/failregister.html');
  };

  getfailLogin = async (req, res) => {
    const { originalUrl, method } = req;
    logger.warn(
      `${method}-${originalUrl} Recibiendo petición para fallo de login`
    );
    res.sendFile(process.cwd() + '/public/faillogin.html');
  };

  getLogin = async (req, res) => {
    const { originalUrl, method } = req;
    logger.info(`${method}-${originalUrl} Recibiendo petición`);
    res.sendFile(process.cwd() + '/public/login.html');
  };

  getRegister = async (req, res) => {
    const { originalUrl, method } = req;
    logger.info(`${method}-${originalUrl} Recibiendo petición`);
    res.sendFile(process.cwd() + '/public/register.html');
  };

  getLogout = async (req, res) => {
    const { originalUrl, method } = req;
    logger.info(`${method}-${originalUrl} Saliendo de sesión`);
    req.session.destroy();
    res.send('Logout');
  };

  getUser = async (req, res) => {
    const { originalUrl, method } = req;
    logger.info(`${method}-${originalUrl} Recibiendo petición`);
    const user = req.user;
    res.json({ username: user.username, email: user.email });
  };

  getMain = async (req, res) => {
    const { originalUrl, method } = req;
    logger.info(`${method}-${originalUrl} Recibiendo petición`);
    res.sendFile(process.cwd() + '/public/index.html');
  };
}

export default UserController;
