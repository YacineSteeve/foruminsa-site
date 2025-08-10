import dotenv from 'dotenv';
import path from 'node:path';
import { defineConfig } from 'prisma/config';

const repoRootDir = __dirname;
const prismaRootDir = path.join(repoRootDir, 'src', 'lib', 'prisma');

dotenv.config({
    path: path.join(repoRootDir, '.env'),
    override: true,
    debug: process.env.NODE_ENV === 'development',
});

export default defineConfig({
    schema: path.join(prismaRootDir, 'schema.prisma'),
    migrations: {
        path: path.join(prismaRootDir, 'migrations'),
        seed: `tsx ${path.join(prismaRootDir, 'seed.ts')}`,
    },
});
