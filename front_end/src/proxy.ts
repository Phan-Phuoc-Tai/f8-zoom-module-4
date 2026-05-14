import { NextRequest, NextResponse } from "next/server";
import { refreshTokenAction } from "./actions/auth.action";
import { getProfileAction } from "./actions/profile.action";
import { CACHE_TTL } from "./constants/cache.constant";

export const proxy = async (request: NextRequest) => {
  try {
    await getProfileAction();
  } catch {
    const isRefresh = await refreshTokenAction();
    if (!isRefresh) {
      const response = NextResponse.redirect(
        new URL("/auth/login", request.nextUrl.origin),
      );
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
    const newToken = isRefresh as { accessToken: string; refreshToken: string };
    const response = NextResponse.next();
    response.cookies.set("accessToken", newToken.accessToken, {
      httpOnly: true,
      maxAge: CACHE_TTL.TOKEN_1H,
    });
    response.cookies.set("refreshToken", newToken.refreshToken, {
      httpOnly: true,
      maxAge: CACHE_TTL.TOKEN_7D,
    });
    return response;
  }
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|auth/login|auth/register|favicon.ico).*)",
  ],
};

//Bị lỗi proxy luôn chạy lại mỗi khi refreshToken hết hạn => redirect sang "auth/login".
//Lý do: Ở matcher chưa loại trừ "auth/login". Ban đầu đang để matcher: ["/:path*"]
