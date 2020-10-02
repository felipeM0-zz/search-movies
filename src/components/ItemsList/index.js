import React from "react";
import LazyLoad from "react-lazyload";
import LayersClear from "@material-ui/icons/LayersClearOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";

import Pagination from "../Pagination";

import "./styles.css";

const itemsList = (props) => {
  const math = Math.ceil(props.resultCount / 10);
  const page = parseInt(props.page);

  return (
    <div className="movies-list">
      <div>
        <h2>Resultados da busca</h2>
        <div>
          <span>{props.resultCount} resultados</span>
          <Tooltip arrow title="Descartar">
            <LayersClear onClick={() => props.clear()} />
          </Tooltip>
        </div>
      </div>
      <div>
        {props.results.map((movies, index) => (
          <Link
            to={`/details/${movies.Type}/${movies.Title}/${movies.Year}/${movies.imdbID}`}
            id={index}
            key={movies.imdbID}
          >
            <div>
              <LazyLoad>
                <img src={movies.Poster} alt={movies.Title} />
              </LazyLoad>
              <p>
                {movies.Year.length === 5
                  ? movies.Year.substr(0, 4)
                  : movies.Year}
              </p>
            </div>
            <div>
              <p>{movies.Title}</p>
            </div>
          </Link>
        ))}
      </div>
      {props.lastSearch === props.actualSeach &&
        props.lastType === props.actualType &&
        math > 1 && (
          <Pagination
            prevPage={() => props.prev()}
            nextPage={() => props.next()}
            page={page}
            math={math}
          />
        )}
    </div>
  );
};

export default itemsList;
