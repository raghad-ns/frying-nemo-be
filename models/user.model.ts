import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user'
  },
  fullName: {
    type: String,
    required: true
  },
  imageUrl: String,
  authToken: String,
  // In case you want to store what items each user added
  items: {
    type: [mongoose.Schema.Types.ObjectId]
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
