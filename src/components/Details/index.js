import React, { useEffect, useState } from "react";
import api from "../../services/api";

import LoadingDetails from "../LoadingDetails";

import KeyboardBackspaceSharp from "@material-ui/icons/KeyboardBackspaceSharp";
import EventIcon from "@material-ui/icons/Event";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

import "./styles.css";

const Details = (props) => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const separateActors = (act) => {
    for (let i = 0; i < act.length; i++) {
      let span = `<a target="_blank" href="https://pt.wikipedia.org/wiki/${act[i]}">${act[i]}</a>`;
      document.getElementById("actors").children[1].innerHTML += span;
    }
  };

  const returnList = () => {
    setDetails({});
    document.getElementById("actors").children[1].innerHTML = "";
    props.returnBack();
  };

  useEffect(() => {
    setLoading(true);
    const loadDetails = async () => {
      const response = await api.get("/?&apikey=ad055d30&i=" + props.detailsId);
      separateActors(response.data.Actors.split(", "));
      setDetails(response.data);
      setLoading(false);
    };

    loadDetails();
  }, [props.detailsId]);

  return (
    <div className="dv-geral">
      {!loading && (
        <>
          <div onClick={() => returnList()}>
            <KeyboardBackspaceSharp />
            <p>Retornar</p>
          </div>
          <p>{details.Title}</p>
          <div>
            <img
              alt={details.Title}
              className="img-back"
              src={details.Poster}
            />
            <div>
              <div>
                <strong>
                  <EventIcon />
                  Ano:
                </strong>
                <p>{details.Year}</p>
              </div>
              <div>
                <strong>
                  <MovieFilterIcon />
                  Gênero(s):
                </strong>
                <p>{details.Genre}</p>
              </div>
              <div>
                <strong>
                  <EmojiPeopleIcon /> Diretor(a):
                </strong>
                <p>{details.Director}</p>
              </div>
              <div id="actors">
                <strong>
                  <SupervisedUserCircleIcon />
                  Atores:
                </strong>
                <div></div>
              </div>
            </div>
          </div>
        </>
      )}
      {loading && <LoadingDetails />}
    </div>
  );
};

export default Details;
