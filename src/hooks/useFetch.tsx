import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data  for the resources");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, []);
  return { data, isPending, error };
};

export default useFetch;
