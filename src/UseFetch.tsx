import { useEffect, useRef, useState } from "react";

function UseFetch<T>(url: RequestInfo | URL, options?: RequestInit) {
  const [data, setData] = useState<null | T>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchData() {
      setData(null);
      setLoading(true);
      try {
        const response = await fetch(url, {
          signal: signal,
          ...optionsRef.current,
        });
        if (!response.ok) throw new Error("Error: " + response.status);
        const json = (await response.json()) as T;
        if (!signal.aborted) setData(json);
      } catch (err) {
        if (!signal.aborted && err instanceof Error) setError(err.message);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return {
    data,
    loading,
    error,
  };
}

export default UseFetch;
