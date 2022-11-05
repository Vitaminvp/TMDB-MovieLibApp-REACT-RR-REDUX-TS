export interface MovieItemProp {
  id: string;
  img: string;
  backdrop_path: string;
  title: string;
  author: string;
  vote_average: number;
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
