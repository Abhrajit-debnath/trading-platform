
import { NextResponse, NextRequest } from "next/server";
import { cookies } from 'next/headers'

export async function proxy(req: NextRequest) {
    const cookieStore = await cookies()
    const token = cookieStore.has("token")

    const pathname = req.nextUrl.pathname
    if (pathname === "/" && !token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (token && (pathname === "/auth/login" || pathname === "/auth/register")) {
        return NextResponse.redirect(new URL("/", req.url));
    }


    return NextResponse.next()

}


export const config = {
    matcher: ["/auth/login", "/auth/register", "/"]
}

