import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const request = useCallback(
    async (
      url: string,
      method: string = "Get",
      body: any | null = null,
      headers = {}
    ) => {
      setLoading(true);

      if (body) {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Щось пішло не так!");
        }

        setLoading(false);
        return data;
      } catch (err) {
        setLoading(false);
        setError(err.message);
        throw err;
      }
    },
    []
  );

  const clearError = () => setError("");

  return { loading, error, request, clearError };
};
