"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import Pagination from "react-js-pagination";

interface Props {
  resPerPage: number;
  filteredRoomsCount: number;
}

const CustomPagination = ({ resPerPage, filteredRoomsCount }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let page = searchParams.get("page") || 1;
  page = Number(page);

  let queryParam;

  const handlePageChange = (currentPage: string) => {
    if (typeof window !== "undefined") {
      //   window.location.href = `${window.location.origin}/rooms?page=${currentPage}`;
      queryParam = new URLSearchParams(window.location.search);
      if (queryParam.has("page")) {
        queryParam.set("page", currentPage);
      } else {
        queryParam.append("page", currentPage);
      }

      const path = `${window.location.pathname}?${queryParam.toString()}`;
      router.push(path);
    }
  };

  return (
    <div>
      {resPerPage < filteredRoomsCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={filteredRoomsCount}
            onChange={handlePageChange}
            pageRangeDisplayed={5}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </div>
  );
};

export default CustomPagination;
