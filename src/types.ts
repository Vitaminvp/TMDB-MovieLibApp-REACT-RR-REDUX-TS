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
}
