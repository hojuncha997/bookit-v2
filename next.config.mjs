/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    DB_LOCAL_URI: "mongodb://127.0.0.1:27017/bookit-v2",
    DB_URI: "",

    // next-auth가 사용하는 환경 변수(필수)
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "random_secret_for_me",
  },

  images: {
    domains: ["res.cloudinary.com"],
  },

  // Strict Mode를 비활성화
  reactStrictMode: false,
};

export default nextConfig;

// 테스트용 설정이므로 파일 업로드
