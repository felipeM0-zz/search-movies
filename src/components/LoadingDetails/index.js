import React from "react";
import "../../../node_modules/placeholder-loading/src/scss/placeholder-loading.scss";
import "./styles.css";

const LoadingDetails = () => (
  <div className="dv-loading-dt">
    <h2>Buscando dados...</h2>
    <div className="dv-loading-item">
      <div className="ph-item">
        <div className="ph-col-12">
          <div className="ph-row">
            <div className="ph-col-4 big"></div>
          </div>
          <div className="ph-row">
            <div className="ph-col-4 big"></div>
            <div className="ph-col-4 big"></div>
            <div className="ph-col-4 big"></div>
            <div className="ph-col-4 big"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingDetails;
