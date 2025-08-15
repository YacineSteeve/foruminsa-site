import { NextResponse } from 'next/server';
import type { Messages } from 'use-intl';

export type ApiErrorMessage = keyof Messages['ApiErrors'];

export interface ErrorResponseBody {
    message: ApiErrorMessage;
    cause?: string;
}

export class ApiError {
    public readonly message: ApiErrorMessage;
    public readonly statusCode: number;
    public readonly cause?: Error;

    constructor(message: ApiErrorMessage, statusCode: number, cause?: Error) {
        this.message = message;
        this.statusCode = statusCode;
        this.cause = cause;

        console.error(`New ApiError: ${this.toString()}`);
    }

    public asNextResponse(init?: ResponseInit) {
        return NextResponse.json(
            {
                message: this.message,
                cause: this.cause ? JSON.stringify(this.cause) : undefined,
            } satisfies ErrorResponseBody,
            {
                ...(init ?? {}),
                status: this.statusCode,
            },
        );
    }

    public toString() {
        return `ApiError: ${this.message} (Status Code: ${this.statusCode})${this.cause ? `, Cause: ${this.cause}` : ''}`;
    }
}
