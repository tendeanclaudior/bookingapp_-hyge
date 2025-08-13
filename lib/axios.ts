import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";

export const fetchAPIAxios = async (
  url: string,
  options?: AxiosRequestConfig
) => {
  try {
    const response = await axios(url, options);
    return response.data;
  } catch (error: any) {
    console.log("fetch error", error.response);

    throw error;
  }
};

export const useFetchAxios = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAPIAxios(url, options);
      console.log("result", result);

      if (result.data) {
        setData(result.data);
      } else {
        setData(result);
      }

      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
      setData(null);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
