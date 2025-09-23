import type { NextRequest, NextResponse } from 'next/server';

export type RequestHandlerContext = {
    params: Promise<Record<string, string>>;
};

export type RequestHandler<C extends RequestHandlerContext = RequestHandlerContext> = (
    request: NextRequest,
    context: C,
) => NextResponse | Promise<NextResponse>;
