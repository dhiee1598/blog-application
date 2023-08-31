import { BlogCardProps, UserProps } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axios.get("/api/blogs");
      const data = (await response.data) as BlogCardProps[];
      return data;
    },
  });
};

export const useFetchBlog = (id: string) => {
  return useQuery({
    queryKey: ["blogs", id],
    queryFn: async () => {
      const response = await axios.get(`/api/blogs/${id}`);
      const data = (await response.data) as BlogCardProps;
      return data;
    },
  });
};

export const useFetchUser = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await axios.get(`/api/users/${id}`);
      const data = (await response.data) as UserProps;
      return data;
    },
  });
};
