import { useState } from "react";

export const useApi = (apiFunc: any) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args: any) => {
    setLoading(true);

    const response: any = await apiFunc(...args);

    setLoading(false);

    if (!response.ok) return setError(true);

    setError(false);

    setData(response.data);
  };

  return { data, error, loading, request };
};
