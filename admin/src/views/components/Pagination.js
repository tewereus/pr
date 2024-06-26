// // import styles from "./styles.module.css";

// const Pagination = ({ page, total, limit, setPage }) => {
//   const totalPages = Math.ceil(total / limit);

//   const onClick = (newPage) => {
//     setPage(newPage + 1);
//   };

//   return (
//     <div className="container">
//       {totalPages > 0 &&
//         [...Array(totalPages)].map((val, index) => (
//           <button
//             onClick={() => onClick(index)}
//             className={page === index + 1 ? `a b` : "page_btn"}
//             key={index}
//           >
//             {index + 1}
//           </button>
//         ))}
//     </div>
//   );
// };

// export default Pagination;

import React, { useState } from "react";

const Pagination = ({ totalUsers, limit, page, setPage }) => {
  const totalPages = Math.ceil(totalUsers / limit);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={page === 1}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={page === pageNumber ? "active" : ""}
          >
            {pageNumber}
          </button>
        )
      )}
      <button onClick={handleNextPage} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
