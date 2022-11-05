import React from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { Info } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { getScoreColor } from "../utils";
import { IMG_BASE } from "../constants";
import type { MovieItemProp } from "../types";

const useStyles = makeStyles((theme) => ({
  score: {
    display: "inline-flex",
    position: "absolute",
    left: -5,
    top: 8,
    justifyContent: "center",
    fontWeight: "bold",
    padding: "2px 8px",
    minWidth: 30,
    color: "white",
    background: "#83d620",
    borderRadius: 2,
    [theme.breakpoints.down("xs")]: {
      left: -8,
      top: 12,
      fontSize: "1.5rem",
      minWidth: 40,
    },
  },
}));

const MovieCard = ({
  id,
  img,
  backdrop_path,
  title,
  author,
  vote_average,
}: MovieItemProp) => {
  const color = getScoreColor(vote_average);
  const vote = vote_average > 0 ? vote_average : "-";
  const classes = useStyles();

  return (
    <ImageListItem key={img}>
      <img
        src={`${IMG_BASE}/${backdrop_path}`}
        srcSet={`${IMG_BASE}/${backdrop_path} 2x`}
        alt={title}
        loading="lazy"
        height={500}
      />
      <Link to={`/movie/${id}`} key={id}>
        <ImageListItemBar
          title={title}
          subtitle={author}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${title}`}
            >
              <Info />
            </IconButton>
          }
        />
      </Link>
      <Typography
        variant="body1"
        className={classes.score}
        style={{ backgroundColor: color }}
      >
        {vote}
      </Typography>
    </ImageListItem>
  );
};

export default MovieCard;
