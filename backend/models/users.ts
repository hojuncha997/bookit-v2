import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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

//  Encrypting password before saving the user
userSchema.pre("save", async function (next) {
  // pre는 미들웨어로, save는 document를 저장하기 전에 실행됨

  if (!this.isModified("password")) {
    // isModified는 몽구스 메소드로, 입력한 필드가 수정되었는지 확인. 회원가입의 경우는 모든 것이 처음 입력되기 때문에 true
    next(); // 미들웨어 체인의 다음 함수로 넘기는 함수. 만약 password가 수정되지 않았다면 다음 함수로 넘어감(암호화 과정 생략)
  }
  // npm i bcryptjs --save로 우선 설치 필요
  this.password = await bcrypt.hash(this.password, 10); // 비밀번호를 암호화.
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema); // 이미 존재하면 그대로 사용, 없으면 새로 생성
