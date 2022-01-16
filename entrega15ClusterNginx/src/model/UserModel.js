import mongoose from 'mongoose';

const User = mongoose.model('Users', {
  username: String,
  password: String,
  email: String,
});

export default User;
