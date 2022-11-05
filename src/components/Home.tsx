import React, { useState, ChangeEvent } from "react";
import { ImageList, Button, Box, Pagination, InputBase } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import useFetch from "../hooks/useFetch";
import MovieCard from "./MovieCard";
import type { MovieItemProp } from "../types";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    display: "flex",
    flexWrap: "nowrap",
    marginBottom: "20px",
  },
  icon: {
    position: "absolute",
    left: 0,
    top: 0,
    display: "flex",
    height: "100%",
    width: theme.spacing(7),
    pointerEvents: "none",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    color: "inherit",
    paddingLeft: theme.spacing(7),
    padding: 4,
    transition: theme.transitions.create("background"),
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    "&:focus, &:hover": {
      background: "rgba(0, 0, 0, 0.065)",
    },
    "&:focus": {
      minWidth: 400,
    },
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },
}));

const Home = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const { data, error } = useFetch({ page, search }) as any;

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const handlePagination = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handleSearch = ({ target }: any) => {
    setSearch(target.value);
  };

  if (error) {
    return <div className="movie__error">{error}</div>;
  }

  return (
    <Box padding={10}>
      <div className={classes.search}>
        <div className={classes.icon}>
          <Search />
        </div>
        <InputBase
          className={classes.input}
          value={search}
          type="search"
          onChange={handleSearch}
          placeholder="Search"
        />
      </div>
      <Button variant="text" onClick={prevPage} disabled={page <= 1}>
        Prev
      </Button>
      <Button variant="text" onClick={nextPage}>
        Next
      </Button>

      <ImageList
        cols={5}
        gap={50}
        rowHeight={"auto"}
        sx={{ overflowY: "initial" }}
      >
        {data?.results?.map((item: MovieItemProp) => (
          <MovieCard {...item} />
        ))}
      </ImageList>
      <div className={classes.pagination}>
        <Pagination
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
