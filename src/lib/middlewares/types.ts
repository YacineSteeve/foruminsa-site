import type { NextRequest, NextResponse } from 'next/server';

export type RequestHandlerContextBase =
    | {
          params: Promise<Record<string, string>>;
      }
    | never;

export type RequestHandler<C extends RequestHandlerContextBase = never> = (
    request: NextRequest,
    context: C,
) => NextResponse | Promise<NextResponse>;
