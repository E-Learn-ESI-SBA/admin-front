import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getAuth } from "@/app/actions";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const auth = await getAuth();

  if (pathname.startsWith("/auth") && !auth.isAuth) {
    if(pathname.match("/auth/logout")){
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    return NextResponse.next();
  }

  if (!auth.isAuth) {
    console.log("match 2")
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (auth.isAuth && auth.payload?.role != "admin" && !pathname.startsWith("/auth")) {
    console.log("match 3")
    return NextResponse.redirect(new URL("/auth/logout", request.url));
  }

  if(pathname.startsWith("/auth") && !pathname.match("/auth/logout") && auth.isAuth){
    console.log("match 4")
    console.log("Redirecting to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/dashboard") && auth.payload?.role != "admin") {
    console.log("match 5")
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