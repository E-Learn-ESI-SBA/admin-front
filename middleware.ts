import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getAuth } from "@/app/actions";

export async function middleware(request: NextRequest) {
  console.log("Middleware called");
  const { pathname } = request.nextUrl;
  const auth = await getAuth();

  if (pathname.match("/auth") && !auth.isAuth) {
    return NextResponse.next();
  }

  if (!auth.isAuth) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if(pathname.match("/auth") && !pathname.match("/auth/logout") && auth.isAuth){
    console.log("Redirecting to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.match("/app") && auth.payload?.role != "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  NextResponse.next();
  
  // NextResponse.redirect(new URL("/", request.url));
}
export const config = {
  matcher: [
  "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};