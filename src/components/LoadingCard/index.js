import React, { useEffect } from "react";
import "../../../node_modules/placeholder-loading/src/scss/placeholder-loading.scss";
import "./styles.css";

const LoadingCard = () => {
  useEffect(() => {
    for (let i = 0; i < 8; i++) {
      let item = `<div class="ph-item">
                        <div class="ph-col-12">
                            <div class="ph-row">
                                <div class="ph-col-6 big"></div>
                                <div class="ph-col-4 empty big"></div>
                                <div class="ph-col-2 big"></div>
                                <div class="ph-col-4"></div>
                                <div class="ph-col-8 empty"></div>
                                <div class="ph-col-6"></div>
                                <div class="ph-col-6 empty"></div>
                                <div class="ph-col-12"></div>
                            </div>
                        </div>
                    </div>`;

      document.getElementById("dv-loading").innerHTML += item;
    }
  }, []);

  return <div id="dv-loading" className="dv-loading"></div>;
};

export default LoadingCard;
