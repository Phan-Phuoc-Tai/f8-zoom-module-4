export const AUTH_CONFIG = {
  EMAIL: {
    LABEL: "Email",
    PLACEHOLDER: "Nhập email...",
    REQUIRED: "Email không được để trống",
    INVALID: "Email không đúng định dạng",
    EXIST: "Email đã tồn tại. Vui lòng sử dụng email khác",
  },
  PASSWORD: {
    LABEL: "Mật khẩu",
    PLACEHOLDER: "Nhập mật khẩu...",
    REQUIRED(isRegister = true) {
      return isRegister
        ? `Mật khẩu phải từ 8 ký tự, có ít nhất 1 ${this.NOT_UPPERCASE}, ${this.NOT_LOWERCASE}, ${this.NOT_NUMBER}`
        : `Mật khẩu phải từ 8 ký tự`;
    },
    ERROR_BASE: "Mật khẩu phải có một",
    NOT_UPPERCASE: "chữ hoa",
    NOT_LOWERCASE: "chữ thường",
    NOT_NUMBER: "số",
  },
  USERNAME: {
    LABEL: "Tên người dùng",
    PLACEHOLDER: "nguyenvana",
    REQUIRED: "Tên người dùng không được để trống",
  },
  FULL_NAME: {
    LABEL: "Họ và tên",
    PLACEHOLDER: "Nguyễn Văn A",
    REQUIRED: "Họ và tên không được để trống",
  },
  CONFIRM_PASSWORD: {
    LABEL: "Xác nhận mật khẩu",
    REQUIRED: "Xác nhận mật khẩu không được để trống",
    INCORRECT: "Xác nhận mật khẩu không khớp",
  },

  LOGIN_TITLE: "Đăng nhập",
  LOGIN_BUTTON: {
    SUBMITTING: "Đang xử lý",
    SUBMIT: "Đăng nhập",
  },
  LOGIN_ACTION: {
    SUCCESS: "Đăng nhập thành công",
    LOADING: "Đang xử lý",
    ERROR: "Email hoặc mật khẩu không chính xác",
  },

  REGISTER_TITLE: "Đăng ký",
  REGISTER_BUTTON: {
    SUBMITTING: "Đang xử lý",
    SUBMIT: "Đăng ký",
  },
  REGISTER_ACTION: {
    SUCCESS: "Đăng ký thành công",
    LOADING: "Đang xử lý",
    ERROR: "Đăng ký thất bại",
  },

  LOGOUT_BUTTON: "Đăng xuất",
  LOGOUT_ACTION: {
    SUCCESS: "Đăng xuất thành công",
    LOADING: "Đang xử lý",
    ERROR: "Đăng xuất thất bại",
  },

  REFRESH_TOKEN: {
    ERROR: "Token không hợp lệ",
  },
};
