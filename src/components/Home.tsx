import React, { useState, ChangeEvent } from "react";
import {
  ImageList,
  Button,
  Box,
  Pagination,
  InputBase,
  OutlinedInput,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
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
    marginRight: "20px",
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
    marginRight: "20px",
    width: "100%",
    "&:focus, &:hover": {
      background: "rgba(0, 0, 0, 0.065)",
    },
    "&:focus": {
      minWidth: 400,
    },
  },
  select: {
    color: "inherit",
    padding: 4,
    transition: theme.transitions.create("background"),
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: theme.shape.borderRadius,
    minWidth: 150,
    "&:focus, &:hover": {
      background: "rgba(0, 0, 0, 0.065)",
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
  const [genre, setGenre] = useState();

  const classes = useStyles();

  const { data: movies, error } = useFetch({ page, search, genre }) as any;
  const { data: genres } = useFetch({ genre: "all" }) as any;

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const handleGenre = ({ target: { value } }: any) => {
    setGenre(value);
  };

  const handlePagination = (_: ChangeEvent<unknown>, page: number) => {
    console.log(page);
    setPage(page);
  };

  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  if (error) return <div className="movie__error">{error}</div>;

  if (!movies) return <CircularProgress color="inherit" />;

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
        <FormControl>
          <InputLabel id="select-label">Genre</InputLabel>
          <Select
            labelId="select-label"
            id="simple-select"
            value={genre}
            onChange={handleGenre}
            label="Genre"
            className={classes.select}
            input={<OutlinedInput label="Genre" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genres?.genres?.map(
              ({ id, name }: { id: number; name: string }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
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
        {movies.results?.map((item: MovieItemProp) => (
          <MovieCard {...item} />
        ))}
      </ImageList>
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
