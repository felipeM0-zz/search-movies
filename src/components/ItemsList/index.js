import React from "react";
import LazyLoad from "react-lazyload";

import "./styles.css";

const itemsList = (props) => {
  return (
    <div className="movies-list">
      <div>
        <h2>Resultados da busca</h2>
        <span>{props.resultCount} resultados</span>
      </div>
      <div>
        {props.results.map((movies) => (
          <div key={movies.imdbID}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default itemsList;
