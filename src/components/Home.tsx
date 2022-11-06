import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  ImageList,
  Pagination,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import MovieCard from "./MovieCard";
import Search from "./Search";
import useFetch from "../hooks/useFetch";
import type { FetchMovieProp, MovieItemProp } from "../types";
import { FetchGenresProp } from "../types";

const useStyles = makeStyles(() => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },
}));

const Home = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  const classes = useStyles();

  const { data: movies, error } = useFetch({
    page,
    search,
    genre,
  }) as unknown as FetchMovieProp;
  const {
    data: { genres },
  } = useFetch({
    genre: "all",
  }) as unknown as FetchGenresProp;

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const handleGenre = ({ target: { value } }: SelectChangeEvent<string>) => {
    setGenre(value);
  };

  const handlePagination = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  if (error) return <div className="movie__error">{error}</div>;

  if (!movies) return <CircularProgress color="inherit" />;

  return (
    <Box padding={10}>
      <Search
        onQueryChange={handleSearch}
        onGenreChange={handleGenre}
        genres={genres}
        query={search}
        genre={genre}
      />
      <Button variant="text" onClick={prevPage} disabled={page <= 1}>
        Prev
      </Button>
      <Button variant="text" onClick={nextPage}>
        Next
      </Button>
      {movies.results && (
        <ImageList
          cols={5}
          gap={50}
          rowHeight={"auto"}
          sx={{ overflowY: "initial" }}
        >
          {movies.results.map((item: MovieItemProp) => (
            <MovieCard {...item} key={item.id} />
          ))}
        </ImageList>
      )}
      <div className={classes.pagination}>
        <Pagination
          page={page}
          count={10}
          variant="outlined"
          color="primary"
          shape="rounded"
          onChange={handlePagination}
        />
      </div>
    </Box>
  );
};

export default Home;
