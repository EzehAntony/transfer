import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  pin: { type: String, required: true },
  age: { type: String, required: true },
  account: { type: Number, default: 2000 },
  history: { type: Array },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.models.users || mongoose.model("users", usersSchema);
