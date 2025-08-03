import { NextResponse } from 'next/server';
import type { Messages } from 'use-intl';

export type ApiErrorMessage = keyof Messages['ApiErrors'];

export interface ErrorResponseBody {
    message: ApiErrorMessage;
    stack?: string;
}

export class ApiError {
    public readonly message: ApiErrorMessage;
    public readonly statusCode: number;
    public readonly stack?: string;

    constructor(message: ApiErrorMessage, statusCode: number, stack?: string) {
        this.message = message;
        this.statusCode = statusCode;
        this.stack = stack;
    }

    public asNextResponse(init?: ResponseInit) {
        return NextResponse.json(
            {
                message: this.message,
                stack: this.stack,
            } satisfies ErrorResponseBody,
            {
                ...(init ?? {}),
                status: this.statusCode,
            },
        );
    }

    public toString() {
        return `ApiError: ${this.message} (Status Code: ${this.statusCode})${this.stack ? `, Stack: ${this.stack}` : ''}`;
    }
}
