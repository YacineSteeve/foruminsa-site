import type { NextRequest, NextResponse } from 'next/server';

export type RequestHandlerContext = {
    params: Promise<Record<string, string>>;
};

export type RequestHandlerContextBase = {
    params: Promise<{}>;
};

export type RequestHandler<C extends RequestHandlerContext = RequestHandlerContextBase> = (
    request: NextRequest,
    context: C,
) => NextResponse | Promise<NextResponse>;
