import { serverEnv } from '@lib/config/env';
import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { PrismaClient, Prisma } from '@prisma/client';

const adapter =
    serverEnv.LOCAL_DB === 'true'
        ? new PrismaBetterSQLite3({
              url: serverEnv.DATABASE_URL,
          })
        : new PrismaLibSQL({
              url: serverEnv.DATABASE_URL,
              authToken: serverEnv.DATABASE_TOKEN,
          });

const prismaClient = new PrismaClient({ adapter });

const createCustomPrismaClient = (options: Omit<Prisma.PrismaClientOptions, 'adapter'>) => {
    return new PrismaClient({
        ...options,
        adapter,
    });
};

export { prismaClient, createCustomPrismaClient };
