import dovenv from 'dotenv';
dovenv.config();

const mariaDbOptions = {
  client: 'mysql',
  connection: {
    host: process.env.MARIA_DB_HOST,
    user: process.env.MARIA_DB_USER,
    password: process.env.MARIA_DB_PASS,
    database: 'productos',
  },
};

export default mariaDbOptions;
