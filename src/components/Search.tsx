import React from "react";
import {
  Select,
  MenuItem,
  InputBase,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { Search as SearchIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import type { SearchProps } from "../types";

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
  label: {
    paddingTop: "5px!important",
  },
}));

const Search = ({
  onQueryChange,
  onGenreChange,
  query,
  genre,
  genres = [],
}: SearchProps) => {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <div className={classes.icon}>
        <SearchIcon />
      </div>
      <InputBase
        className={classes.input}
        value={query}
        type="search"
        onChange={onQueryChange}
        placeholder="Search"
      />
      <FormControl>
        <InputLabel id="select-label" className={classes.label}>
          Genre
        </InputLabel>
        <Select
          labelId="select-label"
          id="simple-select"
          value={genre}
          onChange={onGenreChange}
          label="Genre"
          className={classes.select}
          input={<OutlinedInput label="Genre" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {genres.map(({ id, name }: { id: number; name: string }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Search;
