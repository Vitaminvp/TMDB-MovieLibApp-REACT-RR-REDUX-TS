import { useState, ChangeEvent } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Button,
  Box,
  Pagination,
} from "@mui/material";
import { Info } from "@material-ui/icons";
import { IMG_BASE } from "../constants";

const Home = () => {
  const [page, setPage] = useState(1);

  const { data, error } = useFetch({ page }) as any;

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const handlePagination = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  if (error) {
    return <div className="movie__error">{error}</div>;
  }

  return (
    <Box padding={10}>
      <Button variant="text" onClick={prevPage} disabled={page <= 1}>
        Prev
      </Button>
      <Button variant="text" onClick={nextPage}>
        Next
      </Button>

      <ImageList cols={5} gap={50} rowHeight={"auto"}>
        {data?.results?.map((item: any) => (
          <ImageListItem key={item.img}>
            <img
              src={`${IMG_BASE}/${item.backdrop_path}`}
              srcSet={`${IMG_BASE}/${item.backdrop_path} 2x`}
              alt={item.title}
              loading="lazy"
              height={500}
            />
            <Link
              to={`/movie/${item.id}`}
              key={item.id}
              className="movie__card"
            >
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                  >
                    <Info />
                  </IconButton>
                }
              />
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
      <Pagination
        count={10}
        variant="outlined"
        color="primary"
        onChange={handlePagination}
      />
    </Box>
  );
};

export default Home;
