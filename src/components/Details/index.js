import React, { useEffect, useState } from "react";
import api from "../../services/api";

import KeyboardBackspaceSharp from "@material-ui/icons/KeyboardBackspaceSharp";

import "./styles.css";

const Details = (props) => {
  const [details, setDetails] = useState({});

  const separateActors = (act) => {
    for (let i = 0; i < act.length; i++) {
      let span = `<a href="https://pt.wikipedia.org/wiki/${act[i]}">${act[i]}</a>,&nbsp`;
      document.getElementById("actors").innerHTML += span;
    }
  };

  const returnList = () => {
    setDetails({});
    document.getElementById("actors").innerHTML = "Atores: ";
    props.returnBack();
  };

  useEffect(() => {
    const loadDetails = async () => {
      const response = await api.get("/?&apikey=ad055d30&i=" + props.detailsId);
      separateActors(response.data.Actors.split(", "));
      setDetails(response.data);
    };

    loadDetails();
  }, [props.detailsId]);

  return (
    <div className="dv-geral">
      <div onClick={() => returnList()}>
        <KeyboardBackspaceSharp />
        <p>Retornar</p>
      </div>
      <p>{details.Title}</p>
      <div>
        <img alt={details.Title} className="img-back" src={details.Poster} />
        <div>
          <p>
            <strong>Ano:</strong> {details.Year}
          </p>
          <p>
            <strong>Gênero(s):</strong> {details.Genre}
          </p>
          <p>
            <strong>Diretor(a):</strong> {details.Director}
          </p>
          <p id="actors">
            <strong>Atores:</strong>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
