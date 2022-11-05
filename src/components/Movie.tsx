import { useParams } from "react-router-dom";
import { Chip } from "@material-ui/core";
import useFetch from "../hooks/useFetch";
import { IMG_BASE } from "../constants";

const Movie = () => {
  const { id } = useParams();

  const { data } = useFetch({ id }) as any;

  return (
    <section className="Detail">
      <div className="container">
        <div className="Detail__grid">
          <img
            className="Detail__img"
            src={`${IMG_BASE}/${data?.backdrop_path}`}
            alt={data?.title}
          />
          <div>
            <h2>{data?.title}</h2>
            <p>{data?.overview}</p>
            <div className="Detail__tags">
              {data?.genres?.map((e: any) => {
                return <Chip label={e.name} color="primary" key={e.id} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Movie;
