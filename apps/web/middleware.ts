import { NextResponse, userAgent } from 'next/server'
import type { NextRequest, NextFetchEvent } from 'next/server'

const isMobile = (req: NextRequest) => {
    const { device } = userAgent(req);
    return device.type === 'mobile';
};

export async function middleware(request: NextRequest, event: NextFetchEvent) {

    if (request.nextUrl.pathname.startsWith('/project')) {
        console.log('next/server', '/project/:path*')
    }

    if (request.nextUrl.pathname.match(new RegExp('/city/[^\s]+/about'))) {
        const url = request.nextUrl.clone()
        url.pathname = isMobile(request) ? '/city/mobile' : '/city/about';
        return NextResponse.rewrite(url)
    }

    if (request.nextUrl.pathname.match(new RegExp('/city/[^\s]+/index'))) {
        const url = request.nextUrl.clone()
        url.pathname = isMobile(request) ? '/city/mobile' : '/city';
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

// export const config = {
//     matcher: ['/about', '/project/:path*']
// }