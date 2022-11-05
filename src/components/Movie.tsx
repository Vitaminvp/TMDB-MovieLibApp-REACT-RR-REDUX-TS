import { useParams } from "react-router-dom";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import useFetch from "../hooks/useFetch";
import { IMG_BASE } from "../constants";

const useStyles = makeStyles(() => ({
  movieContainer: {
    paddingTop: 50,
    paddingBottom: 50,
  },
  backdrop: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: -1,
    "&:after": {
      position: "absolute",
      content: "''",
      display: "block",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(30, 47, 60, 0.75)",
      backgroundImage:
        "radial-gradient(circle at 20% 50%, rgba(30, 47, 60, 0.75) 0%, rgba(48, 65, 78, 0.75) 100%)",
    },
  },
  backdropImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  poster: {
    width: "100%",
    borderRadius: 10,
    boxShadow: "0px 3px 20px #0000003b",
  },
  releaseDate: {
    fontSize: "11pt",
    color: "#dadde2",
  },
  vote: {
    display: "flex",
    alignItems: "center",
    fontSize: "12pt",
  },
  genreList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
  },
  genre: {
    cursor: "pointer",
    padding: "1px 6px",
    marginRight: 10,
    border: "1px solid white",
    borderRadius: 4,
    fontSize: "10pt",
  },
  subtitle: {
    marginBottom: 8,
    fontSize: "13pt",
  },
  crewList: {
    listStyle: "none",
    padding: 0,
  },
}));

const Movie = () => {
  const { id } = useParams();
  const classes = useStyles();
  const { data } = useFetch({ id }) as any;

  if (!data) return null;

  return (
    <main style={{ position: "relative" }}>
      <div className={classes.backdrop}>
        <img
          className={classes.backdropImage}
          src={`${IMG_BASE}/${data?.backdrop_path}`}
          alt={"Backdrop of " + data?.title}
        />
      </div>

      <Container className={classes.movieContainer}>
        <Grid container spacing={7}>
          <Grid item md={3}>
            <img
              className={classes.poster}
              src={`${IMG_BASE}/${data?.poster_path}`}
              alt={"Poster of " + data?.title}
            />
          </Grid>
          <Grid item md={8} style={{ color: "white" }}>
            <div className={classes.releaseDate}>{data?.release_date}</div>
            <Typography
              variant={"h4"}
              style={{ fontWeight: "bold" }}
              component={"h1"}
            >
              {data?.title}
            </Typography>
            <ul className={classes.genreList}>
              {data.genres?.map(({ id, name }: any) => (
                <li className={classes.genre} key={id}>
                  {name}
                </li>
              ))}
            </ul>
            <div className={classes.vote}>
              <Rating value={data?.vote_average / 2} readOnly />
              <span style={{ margin: "2px 0px 0 6px" }}>
                {data?.vote_average}/10
              </span>
            </div>
            <div style={{ marginTop: 10 }}>
              <Typography component={"div"} style={{ marginRight: 15 }}>
                <b>Duration:</b> {data?.duration} min.
              </Typography>
              <Typography component={"div"}>
                <b>Budget:</b> {data?.budget ? "$" + data?.budget : "-"}
              </Typography>
            </div>
            {data?.legend && (
              <>
                <h3 className={classes.subtitle}>Legend</h3>
                <Typography variant={"body1"}>{data?.legend}</Typography>
              </>
            )}
            {data?.overview && (
              <>
                <h3 className={classes.subtitle}>Overview</h3>
                <Typography variant={"body1"}>{data?.overview}</Typography>
              </>
            )}
            {data?.credits?.crew?.length && (
              <>
                <h3 className={classes.subtitle}>Crew</h3>
                <Grid
                  container
                  spacing={3}
                  component="ul"
                  className={classes.crewList}
                >
                  {data?.credits?.crew
                    .slice(0, 4)
                    .map((person: any, i: number) => (
                      <Grid
                        item
                        md={3}
                        sm={6}
                        component="li"
                        key={i}
                        style={{ paddingRight: 16 }}
                      >
                        <Typography
                          variant={"body2"}
                          style={{ fontWeight: "bold" }}
                        >
                          {person.name}
                        </Typography>
                        <Typography variant={"body2"}>
                          {person.department}, {person.job}
                        </Typography>
                      </Grid>
                    ))}
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Movie;
