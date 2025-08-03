import { serverEnv } from '@lib/config/env';
import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaBetterSQLite3({
    url: serverEnv.DATABASE_URL,
});

const prismaClient = new PrismaClient({ adapter });

export { prismaClient };
