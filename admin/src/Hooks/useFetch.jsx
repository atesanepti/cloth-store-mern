import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchReq = async () => {
      try {
        const response = await fetch(url);
        const allData = await response.json();
        if (!allData.success) {
          setError(new Error(allData.message));
        } else {
          setData(allData.payload);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setData(false);
        setLoading(true);
        setError(error.message);
      }
    };
    fetchReq();
  }, [url]);

  return {
    data,
    isLoading,
    isError,
  };
};

export default useFetch;
