import knexLib from 'knex';

const options = {
  client: 'sqlite3',
  connection: {
    filename: '../DB/ecommerce.sqlite',
  },
  useNullAsDefault: true,
};

const knex = new knexLib(options);

try {
  await knex.raw(`CREATE TABLE MENSAJES (
          ID_MENSAJE INT AUTO_INCREMENT,
          AUTOR VARCHAR (50) NOT NULL,
          MENSAJE VARCHAR (150) NOT NULL,
          FECHA DATE,
          PRIMARY KEY (ID_MENSAJE)
        )`);
} catch (err) {
  console.log(err);
}
knex.destroy();
