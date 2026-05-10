const AUTH_MESSAGE_ERRORS = {
  USERNAME: "Tên người dùng không được để trống",
  FULL_NAME: "Họ và tên không được để trống",
  EMAIL: {
    REQUIRED: "Email không được để trống",
    INVALID: "Email không đúng định dạng",
    EXIST: "Email đã tồn tại. Vui lòng sử dụng email khác",
  },
  PASSWORD: {
    REQUIRED: "Mật khẩu phải từ 8 ký tự",
    BASE: "Mật khẩu phải có một",
    NOT_UPPERCASE: "chữ hoa",
    NOT_LOWERCASE: "chữ thường",
    NOT_NUMBER: "số",
  },
  CONFIRM_PASSWORD: {
    REQUIRED: "Xác nhận mật khẩu không được để trống",
    INCORRECT: "Xác nhận mật khẩu không khớp",
  },
  REGISTER: {
    FAILED: "Đăng ký thất bại",
  },
  LOGIN: {
    INCORRECT: "Email hoặc mật khẩu không chính xác",
    NOT_VERIFIED:
      "Tài khoản chưa xác thực. Vui lòng kiểm tra hộp thư đến tại email đã đăng ký để hoàn tất quá trình xác thực",
  },
  PROFILE: {
    NOT_FOUND: "Không tìm thấy thông tin người dùng",
  },
  TOKEN_INVALID: "Token không hợp lệ hoặc đã hết hạn",
};

const AUTH_MESSAGE_SUCCESS = {
  REGISTER: "Đăng ký thành công",
  LOGIN: "Đăng nhập thành công",
  LOGOUT: "Đăng xuất thành công",
  PROFILE: "Lấy thông tin người dùng thành công",
};

export { AUTH_MESSAGE_ERRORS, AUTH_MESSAGE_SUCCESS };
