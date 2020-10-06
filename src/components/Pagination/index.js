import React from "react";
// EXTERNAL COMPONENTS
import Tooltip from "@material-ui/core/Tooltip";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
// EXTERNAL STYLES
import "./styles.css";

const Pagination = (props) => {
  return (
    <div className="dv-pagination">
      <div>
        {props.page > 1 && (
          <Tooltip title="Anterior">
            <div className="prev" onClick={() => props.prevPage()}>
              <ArrowBackIcon />
              <p>Anterior</p>
            </div>
          </Tooltip>
        )}
        <span>
          pág. <strong>{props.page}</strong> de <strong>{props.math}</strong>
        </span>
        {props.page !== props.math && (
          <Tooltip title="Próxima">
            <div className="next" onClick={() => props.nextPage()}>
              <ArrowForwardIcon />
              <p>Próxima</p>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Pagination;
