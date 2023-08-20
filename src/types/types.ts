import { Prisma } from '@prisma/client';

export type BlogWithUsers = Prisma.BlogGetPayload<{ include: { user: true } }>;
