import axios from 'axios';
import { useState } from 'react';

export const usePost = (url: string) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isSuccess, setIsSuccess] = useState<boolean>();

  const createPost = async (value: Object) => {
    setIsLoading(true);
    setIsSuccess(false);

    await axios
      .post(url, value)
      .then((res) => {
        setIsLoading(false);
        setIsSuccess(true);
        console.log(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsLoading(false);
        console.log(err);
      });
  };

  return { createPost, isLoading, isSuccess };
};
