import { serverEnv } from '@lib/config/env';
import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { PrismaClient, Prisma } from '@prisma/client';
import type { SqlDriverAdapterFactory } from '@prisma/client/runtime/library.js';

const adapter = serverEnv.LOCAL_DB
    ? new PrismaBetterSQLite3({
          url: serverEnv.DATABASE_URL,
      })
    : new PrismaLibSQL({
          url: serverEnv.DATABASE_URL,
          authToken: serverEnv.DATABASE_TOKEN,
      });

const prismaClient = new PrismaClient({
    adapter: adapter as unknown as SqlDriverAdapterFactory
});

const createCustomPrismaClient = (options: Omit<Prisma.PrismaClientOptions, 'adapter'>) => {
    return new PrismaClient({
        ...options,
        adapter: adapter as unknown as SqlDriverAdapterFactory,
    });
};

export { prismaClient, createCustomPrismaClient };
