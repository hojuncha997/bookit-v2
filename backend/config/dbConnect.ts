import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  let DB_URI = "";

  if (process.env.NODE_ENV === "development") {
    DB_URI = process.env.DB_LOCAL_URI!;
    //!은 해당 변수가 null이 아님을 확신할 때 사용. 정확한 명칭은 Non-null assertion operator
  }

  if (process.env.NODE_ENV === "production") {
    DB_URI = process.env.DB_URI!;
  }

  await mongoose.connect(DB_URI);

  //   await mongoose.connect(DB_URI).then((con) => {
  //     // console.log(`MongoDB Connected: ${con.connection.host}`);
  //     console.log("MongoDB Connected");
  //   });
};

export default dbConnect;
