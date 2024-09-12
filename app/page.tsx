import Home from "@/components/Home";

// const getRooms = async () => {
//   const res = await fetch("http://localhost:3000/api/rooms"); // 데이터가 캐시됨
//   const data = await res.json();
//   return data;
// };

const getRooms = async () => {
  const res = await fetch("http://localhost:3000/api/rooms", {
    cache: "no-store", //또는 no-cache
  }); // 데이터가 캐시되지 않음
  const data = await res.json();
  return data;
};

export default async function HomePage() {
  const rooms = await getRooms();
  console.log("resPerPage", rooms.resPerPage); // 5

  return <Home />;
}
