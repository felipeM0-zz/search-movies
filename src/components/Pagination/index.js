import React from "react";
import "./styles.css";

const Pagination = (props) => {
  const math = Math.ceil(props.resultCount / 10);
  const page = parseInt(props.page);

  return (
    <div className="dv-pagination">
      {props.lastSearch === props.actualSeach &&
        props.lastType === props.actualType &&
        math > 1 && (
          <div>
            {page > 1 && (
              <button onClick={() => props.prevPage()}>Anterior</button>
            )}
            <span>
              pág. {page} de {math}
            </span>
            {page !== math && (
              <button onClick={() => props.nextPage()}>Próxima</button>
            )}
          </div>
        )}
    </div>
  );
};

export default Pagination;
