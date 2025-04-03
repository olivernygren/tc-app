import { useState, useCallback } from 'react';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toggle = useCallback(() => {
    setIsLoading((prev) => !prev);
  }, []);

  return { isLoading, toggle };
};

export default useLoading;
