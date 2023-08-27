import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useUpdateUser = (url: string) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const router = useRouter();

  const updateUser = async (value: Object) => {
    setIsLoading(true);

    await axios
      .patch(url, value)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);

        router.refresh();
        router.replace('/profile');
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return { updateUser, isLoading };
};
