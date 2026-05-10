export const CONFIG = {
  SERVER_API: process.env.NEXT_PUBLIC_SERVER_API,
  SIDE_BAR: [
    {
      TEXT: "Tổng quan",
      HREF: "/",
    },
    {
      TEXT: "Danh mục",
      HREF: "/categories",
    },
    {
      TEXT: "Sản phẩm",
      HREF: "/products",
    },
    {
      TEXT: "Đơn hàng",
      HREF: "/orders",
    },
    {
      TEXT: "Khách hàng",
      HREF: "/users",
    },
    {
      TEXT: "Tin nhắn",
      HREF: "/messages",
    },
  ],
  HEADER_SEARCH: "Nhập từ khoá...",
};
