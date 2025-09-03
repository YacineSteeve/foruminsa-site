import type { Messages } from 'use-intl';

export type ServiceErrorMessage = keyof Messages['ApiErrors'];

export class ServiceError extends Error {
    constructor(message: ServiceErrorMessage, cause?: unknown) {
        super(message, { cause });

        console.error(`New ServiceError: ${this.toString()}`);
    }

    public toString() {
        return `ServiceError: ${this.message} ${this.cause ? `, Cause: ${this.cause}` : ''}`;
    }
}
