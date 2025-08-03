import type { NextRequest, NextResponse } from 'next/server';

export type RequestHandler = (
    request: NextRequest,
    context: unknown,
) => NextResponse | Promise<NextResponse>;

export type MiddlewareFactory<T extends object = {}> = (
    handler: RequestHandler,
    options?: T,
) => RequestHandler;
