import dovenv from 'dotenv';
dovenv.config();
const mongoConfig = {
  url: process.env.MONGO_DB,
  advancedOptions: { useNewUrlParser: true, useUnifiedTopology: true },
};

export default mongoConfig;
