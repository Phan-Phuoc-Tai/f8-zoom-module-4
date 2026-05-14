export const generatePagination = (currentPage: number, totalPage: number) => {
  //totalPage = 7 => Không hiển thị ...
  if (totalPage <= 7) {
    return Array.from({ length: totalPage }, (_, index) => index + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis", totalPage];
  }
  if (currentPage >= totalPage - 2) {
    return [
      1,
      "ellipsis",
      totalPage - 3,
      totalPage - 2,
      totalPage - 1,
      totalPage,
    ];
  }
  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPage,
  ];
};
