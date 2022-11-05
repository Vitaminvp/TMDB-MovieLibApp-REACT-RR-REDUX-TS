import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../constants";

interface Prop {
  page?: number;
  id?: string;
}
const getUrl = ({ id, page }: Prop) => {
  switch (true) {
    case Boolean(id):
      return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    case Boolean(page):
      return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;
    default:
      return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;
  }
};

const useFetch = ({ page, id }: Prop) => {
  const url = getUrl({ id, page });
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

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
