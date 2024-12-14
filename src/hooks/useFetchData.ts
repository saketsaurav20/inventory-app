import { useState, useEffect } from "react";
import { fetchData } from "../services/apiService";

type UseFetchDataResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export const useFetchData = <T,>(url: string): UseFetchDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await fetchData(url);
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message || "Something went wrong");
          } else {
            setError("An unexpected error occurred");
          }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url]);

  return { data, loading, error };
};
