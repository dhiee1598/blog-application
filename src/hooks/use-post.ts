import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const usePost = (url: string) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const router = useRouter();

  const createPost = async (value: Object) => {
    setIsLoading(true);

    await axios
      .post(url, value)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
        router.refresh();
        router.push('/profile');
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return { createPost, isLoading };
};
