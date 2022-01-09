import express from 'express';
import bCrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../model/UserModel.js';
import session from 'express-session';

const { Router } = express;
const router = new Router();

router.use(
  session({
    secret: 'shhhhhhh',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 10 * 60 * 1000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

router.use(passport.initialize());
router.use(passport.session());

//router.use((req, res, next) => {});

// LOGIN
router.get('/failregister', (req, res) => {
  res.sendFile(process.cwd() + '/public/failregister.html');
});
router.get('/faillogin', (req, res) => {
  res.sendFile(process.cwd() + '/public/faillogin.html');
});
router.get('/login', (req, res) => {
  res.sendFile(process.cwd() + '/public/login.html');
});
router.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/faillogin' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/register', (req, res) => {
  res.sendFile(process.cwd() + '/public/register.html');
});

router.post(
  '/register',
  passport.authenticate('signup', { failureRedirect: '/failregister' }),
  (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  }
);

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logout');
});

router.get('/user', (req, res) => {
  const user = req.user;
  console.log(user.username, user.email);
  res.json({ username: user.username, email: user.email });
});

router.get('/', checkAuthentication, (req, res) => {
  console.log('Welcome');
  res.sendFile(process.cwd() + '/public/index.html');
});

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}

//MIDDLEWARE
passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      console.log(`Registrando usuario ${username}`);
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log('Error in SignUp: ' + err);
          return done(err);
        }

        if (user) {
          console.log('User already exists');
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
          email: req.body.email,
        };

        User.create(newUser, (err, userWithId) => {
          if (err) {
            console.log('Error in Saving user: ' + err);
            return done(err);
          }
          console.log(user);
          console.log('User Registration succesful');
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    console.log(`Login del usuario ${username}`);
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log('User Not Found with username ' + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log('Invalid Password');
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

export default router;
