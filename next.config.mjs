/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_LOCAL_URI: "mongodb://127.0.0.1:27017/bookit-v2",
    DB_URI: "",
  },
  // Strict Mode를 비활성화
  reactStrictMode: false,
};

export default nextConfig;

// 테스트용 설정이므로 파일 업로드
