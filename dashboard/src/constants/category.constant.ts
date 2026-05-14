export const CATEGORY_CONFIG = {
  TITLE: "Danh mục",
  SEARCH_PLACEHOLDER: "Tìm danh mục...",
  ADD_BTN: "Tạo danh mục",
  MODAL: {
    ADD_FORM: {
      TITLE: "Tạo danh mục",
      NAME: "Tên",
      STATUS: "Trạng thái",
      PLACEHOLDER_NAME: "Treo tường",
      PLACEHOLDER_STATUS: "Máy lạnh",
      ADD_BTN: "Tạo",
      CANCEL_BTN: "Huỷ",
      LOADING: "Đang xử lý",
      SUCCESS: "Tạo danh mục thành công",
      ERROR: "Tạo danh mục thất bại",
    },
    UPDATE_FORM: {
      TITLE: "Chỉnh sửa danh mục",
      NAME: "Tên",
      STATUS: "Trạng thái",
      PLACEHOLDER_NAME: "Treo tường",
      PLACEHOLDER_STATUS: "",
      ADD_BTN: "Chỉnh sửa",
      CANCEL_BTN: "Huỷ",
      LOADING: "Đang xử lý",
      SUCCESS: "Chỉnh sửa danh mục thành công",
      ERROR: "Chỉnh sửa danh mục thất bại",
    },
    DELETE: {
      TITLE: "Xóa danh mục",
      DESC: "Danh mục đã xóa sẽ không thể khôi phục. Bạn chắc chắn muốn xoá?",
      CANCEL_BTN: "Huỷ",
      DELETE_BTN: "Xóa",
      LOADING: "Đang xử lý",
      SUCCESS: "Xóa danh mục thành công",
      ERROR: "Xóa danh mục thất bại",
    },
  },
  ZOD_ERRORS: {
    NAME: "Tên danh mục không được để trống",
  },
  ERRORS: {
    EXIST: "Danh mục đã tồn tại",
  },
  TABLE: [
    {
      FIELD: "ID",
      TEXT: "ID",
      CLASS_NAME: "text-left",
    },
    {
      FIELD: "NAME",
      TEXT: "Tên danh mục",
      CLASS_NAME: "text-left",
    },
    {
      FIELD: "STATUS",
      TEXT: "Trạng thái",
      CLASS_NAME: "text-left",
    },
    {
      FIELD: "UPDATED_AT",
      TEXT: "Ngày cập nhật",
      CLASS_NAME: "text-left",
    },
    {
      FIELD: "ACTION",
      TEXT: "Hành Động",
      CLASS_NAME: "text-center",
    },
  ],
  STATUS: {
    true: "Đang bán",
    false: "Ngừng bán",
  },
};
