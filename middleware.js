import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;
    if (pathname !== '/categories') {
        return NextResponse.redirect(new URL('/categories', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|favicon.ico|.*\\.).*)',
    ],
};
