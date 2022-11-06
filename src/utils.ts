import { API_KEY, BASE_URL, COLORS } from "./constants";
import type { FetchProp } from "./types";

export const getScoreColor = (score: number) => {
  let color = COLORS.EXCELLENT;
  if (!score || score === 0) color = COLORS.UNKNOWN;
  else if (score < 5.5) color = COLORS.BAD;
  else if (score < 6.5) color = COLORS.OK;
  else if (score < 7.25) color = COLORS.GOOD;

  return color;
};

export const getUrl = ({ id, page, search, genre, review }: FetchProp) => {
  switch (true) {
    case Boolean(review):
      return `${BASE_URL}/movie/${review}/reviews?api_key=${API_KEY}`;
    case Boolean(genre) && !page && !search:
      return `${BASE_URL}genre/movie/list?api_key=${API_KEY}`;
    case Boolean(id):
      return `${BASE_URL}movie/${id}?api_key=${API_KEY}&append_to_response=credits`;
    case Boolean(search):
      return `${BASE_URL}search/movie?api_key=${API_KEY}&query=${search}&page=${page}&with_genres=${genre}`;
    default:
      return `${BASE_URL}discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}&with_genres=${genre}`;
  }
};

export const debounce = (
  func: (...args: unknown[]) => string,
  timeout = 300
) => {
  let timer: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return func(...args);
    }, timeout);
  };
};
