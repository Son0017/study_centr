import { useState, useEffect } from "react";
import axiosFetch from "../utils/axiosFetch";
function useFetchHook(url: string) {
  const [data, setData] = useState<any>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const responce = async () => {
    try {
      setLoading(true);
      const data = await axiosFetch(url, {});

      setData(data.data?.data);
    } catch (error: any) {
      console.log(error);

      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    responce();
  }, [url]);

  return { data, error, loading };
}

export default useFetchHook;
