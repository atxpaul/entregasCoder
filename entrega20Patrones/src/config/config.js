// import dotenv from 'dotenv';
// dotenv.config();

const config = {
  session: {
    secret: 'shhhhhhh',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 10 * 60 * 1000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  },
};
export default config;
