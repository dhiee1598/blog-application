import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

export const usePost = (url: string) => {
  const router = useRouter();

  const createBlogPost = useMutation({
    mutationFn: async (values: Object) => {
      const response = await axios.post(url, values);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs", data.id] });
      router.push(`/blogs/${data.id}`);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { createBlogPost };
};

export const useUpdateUser = (url: string) => {
  const router = useRouter();

  const updateUsers = useMutation({
    mutationFn: async (values: Object) => {
      const response = await axios.patch(url, values);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users", data.id] });
      router.push("/profile");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { updateUsers };
};

export const useUpdateBlog = (url: string) => {
  const router = useRouter();
  const updateBlogs = useMutation({
    mutationFn: async (values: Object) => {
      const response = await axios.patch(url, values);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs", data.id] });
      console.log(data);
      router.push("/profile");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { updateBlogs };
};

export const useDeleteBlog = () => {
  const router = useRouter();
  const deleteBlog = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/blogs/${id}`);
      const data = await response.data;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.push("/profile");
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { deleteBlog };
};
