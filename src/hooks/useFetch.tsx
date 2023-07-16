import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const abort = new AbortController();

    fetch(url, { signal: abort.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data  for the resources");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abort.abort();
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;
