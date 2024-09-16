import dbConnect from "@/backend/config/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User, { IUser } from "@/backend/models/users";
import bcrypt from "bcryptjs";

type Credentials = {
  email: string;
  password: string;
};

async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProvider({
        // @ts-ignore
        async authorize(credentials: Credentials) {
          dbConnect();
          const { email, password } = credentials;

          const user = await User.findOne({ email }).select("+password"); // User라는 모델에서 findOne을 통해 email이 일치하는 것을 찾고, password를 가져온다.

          if (!user) {
            throw new Error("Invalid email or password");
          }

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          ); // bcrypt를 통해 password를 비교한다. password는 사용자가 입력한 것, user.password는 DB에 저장된 것

          if (!isPasswordMatched) {
            throw new Error("Invalid email or password");
          }

          return user;
        },
      }),
    ],

    callbacks: {
      jwt: async ({ token, user }) => {
        console.log("token =>", token);
        console.log("user =>", user);
        user && (token.user = user); // user가 존재하면 token에 user를 넣어준다.

        // TODO - update session when user is updated

        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user as IUser; //session.user에 IUser 타입으로 token.user를 넣어준다.

        console.log("session =>", session);
        return session;
      },
    },

    secret: process.env.NEXTAUTH_SECRET,
  });
}
export { auth as GET, auth as POST };
// auth 함수인 GET과 POST를 export한다. 주의할 점은 export할 때 http method 명을 사용해야 한다.
