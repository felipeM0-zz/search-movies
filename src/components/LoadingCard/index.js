import React, { useEffect } from "react";
import "../../../node_modules/placeholder-loading/src/scss/placeholder-loading.scss";
// EXTERNAL STYLES
import "./styles.css";

const LoadingCard = () => {
  useEffect(() => {
    for (let i = 0; i < 8; i++) {
      let item = `<div class="ph-item">
                        <div class="ph-col-12">
                            <div class="ph-row">
                                <div class="ph-col-4 big"></div>
                            </div>
                            <div class="ph-row">
                                <div class="ph-col-4 big"></div>
                                <div class="ph-col-4 big"></div>
                            </div>
                        </div>
                    </div>`;

      document.getElementById("dv-loading").innerHTML += item;
    }
  }, []);

  return (
    <div className="dv-searching">
      <h2>Buscando...</h2>
      <div id="dv-loading" className="dv-loading"></div>
    </div>
  );
};

export default LoadingCard;
