import { Prisma } from '@prisma/client';

export type UserBlogProps = Prisma.UserGetPayload<{ include: { Blog: true } }>;

export type BlogUserProps = Prisma.BlogGetPayload<{ include: { user: true } }>;

export type NewBlogPost = {
  title: string;
  author: string;
  content: string;
};

export type UpdatePageProps = {
  username?: string;
  aboutMe?: string;
  contact?: string;
  userId: string;
};

export type UpdateBlogProps = {
  title: string;
  author: string;
  content: string;
  id: string;
};

export type PaginationProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
