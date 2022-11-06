import { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";

export interface MovieItemProp {
  id: string;
  img: string;
  backdrop_path: string;
  title: string;
  author: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  duration: string;
  budget: string;
  legend: string;
  overview: string;
  credits?: {
    crew: PersonProp[];
  };
  genres: GenreProp[];
}

export interface GenreProp {
  name: string;
  id: number;
}

export interface PersonProp {
  name: string;
  department: string;
  job: string;
}
export interface FetchProp {
  page?: number;
  id?: string;
  search?: string;
  genre?: string;
  review?: string;
}

export interface ReviewProp {
  author_details: { name: string; avatar_path: string };
  content: string;
  author: string;
}

export interface FetchMovieProp {
  data?: { results: MovieItemProp[] };
  error: string;
}

export interface FetchGenresProp {
  data: { genres: GenreProp[] };
}

export interface SearchProps {
  onQueryChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  onGenreChange: ({ target: { value } }: SelectChangeEvent<string>) => void;
  query: string;
  genre?: string;
  genres: GenreProp[];
}
