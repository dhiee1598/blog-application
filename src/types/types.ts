import { Prisma } from "@prisma/client";

export interface UserMenuProps {
  name?: string;
  image?: string;
}

export interface NewBlogPost {
  title: string;
  author: string;
  content: string;
}

export interface UserBlogCardProps {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
}

export interface PaginationProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  total_page: number;
}

export type BlogCardProps = Prisma.BlogGetPayload<{ include: { user: true } }>;

export type UserProps = Prisma.UserGetPayload<{
  include: { Blog: true };
}>;
