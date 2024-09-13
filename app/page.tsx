import Home from "@/components/Home";
import Error from "./error";

// export const dynamic = "force-dynamic"; // 이렇게 선언하면, 페이지가 항상 동적으로 생성됨

// const getRooms = async () => {
//   const res = await fetch("http://localhost:3000/api/rooms"); // 데이터가 캐시됨
//   const data = await res.json();
//   return data;
// };

// const getRooms = async () => {
//   const res = await fetch("http://localhost:3000/api/rooms", {
//     cache: "no-store", //또는 no-cache
//   }); // 데이터가 캐시되지 않음
//   const data = await res.json();
//   return data;
// };

// const getRooms = async () => {
//   const res = await fetch("http://localhost:3000/api/rooms", {
//     next: { revalidate: 10 }, // 10초마다 재검증. 만약 0이면, 캐시를 사용하지 않음
//   });
//   const data = await res.json();
//   return data;

//   // 다른 방법으로는
//   // export const revalidate = 10; 을 코드상단 또는 상위 컴포넌트에 선언하는 방법이 있음. 이 경우 { next: { revalidate } }를 사용하지 않아도 됨
// };

export const metadata = {
  title: "HomePage - BookIT",
  // description: "Home Page",
};

const getRooms = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();

  const res = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`, {
    cache: "no-store",
  });
  // console.log("here, and res is", res.json());
  return res.json();
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: string;
}) {
  const data = await getRooms(searchParams);

  if (data?.message) {
    return <Error error={data} />;
  }

  return <Home data={data} />;
}
