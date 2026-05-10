import * as crypto from "crypto";
export const generate = {
  secretId: () => {
    const random = Math.random() + Date.now() + "";
    return crypto.createHash("md5").update(random).digest("hex");
  },
  otp: (length = 6) => {
    const max = Number("1".padEnd(length + 1, "0"));
    return `${Math.floor(Math.random() * max)}`.padStart(length, "0");
  },
};
