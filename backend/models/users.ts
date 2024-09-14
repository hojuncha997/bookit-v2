import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: {
    public_id: string;
    url: string;
  };
  createdAt: Date;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}

const userSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true, // 이메일 중복 방지
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Your password must be longer than 6 characters"],
    select: false, // password는 보여지지 않도록 함. 응답에도 포함되지 않음.
  },
  avatar: {
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema); // 이미 존재하면 그대로 사용, 없으면 새로 생성
