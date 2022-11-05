import axios from "axios";
import { useEffect, useState } from "react";
import { getUrl } from "../utils";
import type { FetchProp } from "../types";

const useFetch = (props: FetchProp) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const url = getUrl(props);

  useEffect(() => {
    axios
      .get(url, { timeout: 5000 })
      .then((response) => {
        setData(response.data);
      })
      .catch((error: any) => {
        setError(error.response.data.status_message);
      });
  }, [url]);
  return { data, error };
};

export default useFetch;
