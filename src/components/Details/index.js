import React, { useEffect, useState } from "react";
import api from "../../services/api";

import KeyboardBackspaceSharp from "@material-ui/icons/KeyboardBackspaceSharp";
import EventIcon from "@material-ui/icons/Event";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import "./styles.css";

import LoadingDetails from "../LoadingDetails";

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

  const correctYear = (year) => {
    return year !== undefined && year.length === 5 ? year.substr(0, 4) : year;
  };

  useEffect(() => {
    setLoading(true);
    const loadDetails = async () => {
      const response = await api.get("/?&apikey=ad055d30&i=" + props.detailsId);
      setLoading(false);
      separateActors(response.data.Actors.split(", "));
      setDetails(response.data);
    };

    loadDetails();
  }, [props.detailsId]);

  return (
    <div className="dv-geral">
      {!loading && (
        <>
          <div className="btn-return" onClick={() => returnList()}>
            <KeyboardBackspaceSharp />
            <p>Retornar</p>
          </div>
          <p className="title-name">{details.Title}</p>
          <div className="dv-content-dt">
            {details.Poster !== "N/A" && (
              <img
                alt={details.Title}
                className="img-back"
                src={details.Poster}
              />
            )}
            <div>
              <div>
                <strong>
                  <EventIcon />
                  Ano:
                </strong>
                <p>{correctYear(details.Year)}</p>
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
