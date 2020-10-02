import React, { useState } from "react";
import LazyLoad from "react-lazyload";
import LayersClear from "@material-ui/icons/LayersClearOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Pagination from "../Pagination";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./styles.css";

const ItemsList = (props) => {
  const math = Math.ceil(props.resultCount / 10);
  const page = parseInt(props.page);
  const [open, setOpen] = useState(false);

  return (
    <div className="movies-list">
      <div>
        <h2>Resultados da busca</h2>
        <div>
          <span>{props.resultCount} resultados</span>
          <Tooltip arrow title="Descartar">
            <LayersClear onClick={() => setOpen(true)} />
          </Tooltip>
        </div>
      </div>
      <div>
        {props.results.map((movies, index) => (
          <div
            onClick={() => props.details(movies.imdbID)}
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
          </div>
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
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>Descartar e limpar busca?</DialogTitle>
        <div className="dv-buttons-modal">
          <button onClick={() => props.clear()}>Sim</button>
          <button onClick={() => setOpen(false)}>Não</button>
        </div>
      </Dialog>
    </div>
  );
};

export default ItemsList;
