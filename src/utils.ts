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

export const getUrl = ({ id, page, search }: FetchProp) => {
  switch (true) {
    case Boolean(id):
      return `${BASE_URL}movie/${id}?api_key=${API_KEY}&append_to_response=credits`;
    case Boolean(search):
      return `${BASE_URL}search/movie?api_key=${API_KEY}&query=${search}&page=${page}`;
    case Boolean(page):
      return `${BASE_URL}discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;
    default:
      return `${BASE_URL}discover/movie?api_key=${API_KEY}`;
  }
};

export const debounce = (func: (...args: any[]) => string, timeout = 300) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return func(...args);
    }, timeout);
  };
};
