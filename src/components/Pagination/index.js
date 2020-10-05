import React from "react";
// EXTERNAL STYLES
import "./styles.css";

const Pagination = (props) => {
  return (
    <div className="dv-pagination">
      <div>
        {props.page > 1 && (
          <button className="prev" onClick={() => props.prevPage()}>
            Anterior
          </button>
        )}
        <span>
          pág. {props.page} de {props.math}
        </span>
        {props.page !== props.math && (
          <button className="next" onClick={() => props.nextPage()}>
            Próxima
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
