import React, { useEffect, useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { PieChart } from "react-minimal-pie-chart";
// EXTERNAL SERVICES
import api from "../../services/api";
// EXTERNAL ICONS
import KeyboardBackspaceSharp from "@material-ui/icons/KeyboardBackspaceSharp";
import EventIcon from "@material-ui/icons/Event";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import AssessmentIcon from "@material-ui/icons/Assessment";
// EXTERNAL COMPONENTS
import LoadingDetails from "../LoadingDetails";
// EXTERNAL IMAGES
import rt from "../../images/PNG/rotten.png";
import meta from "../../images/PNG/metacritic.png";
import imdb from "../../images/PNG/imdb.png";
// EXTERNAL STYLES
import "./styles.css";

const Details = (props) => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState([]);

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

  const insertCharts = (dados) => {
    let colors = ["#e0ab00", "#fa3306", "#022330"];
    let imgs = [imdb, rt, meta];
    let dt = dados.map((v, index) => {
      return (
        <div key={index}>
          <p>{v.val}%</p>
          <div>
            <Tooltip title={v.nome + " (" + v.val + "%)"}>
              <img src={imgs[index]} alt={v.nome} />
            </Tooltip>
            <PieChart
              className="chart-critic"
              data={[{ value: v.val, color: colors[index] }]}
              totalValue={100}
              lineWidth={20}
              rounded
            />
          </div>
        </div>
      );
    });

    return dt;
  };

  useEffect(() => {
    setLoading(true);
    const loadDetails = async () => {
      const response = await api.get("/?&apikey=ad055d30&i=" + props.detailsId);
      setLoading(false);
      separateActors(response.data.Actors.split(", "));
      setDetails(response.data);

      const dados = [];

      response.data.Ratings.forEach((e) => {
        dados.push({
          nome: e.Source === "Internet Movie Database" ? "IMDB" : e.Source,
          val: parseInt(e.Value.substr(0, 3).replace(/\./g, "")),
        });
      });
      setDados(dados);
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
                  Ano
                </strong>
                <p>{correctYear(details.Year)}</p>
              </div>
              <div>
                <strong>
                  <MovieFilterIcon />
                  Gênero(s)
                </strong>
                <p>{details.Genre}</p>
              </div>
              <div>
                <strong>
                  <EmojiPeopleIcon /> Diretor(a)
                </strong>
                <p>{details.Director}</p>
              </div>
              <div id="actors">
                <strong>
                  <SupervisedUserCircleIcon />
                  Atores
                </strong>
                <div></div>
              </div>
            </div>
          </div>
          {dados.length > 0 && (
            <>
              <div className="critic-top">
                <AssessmentIcon />
                <p>Críticas</p>
              </div>
              <div className="chart-review" id="chart-review">
                {insertCharts(dados)}
              </div>
            </>
          )}
        </>
      )}
      {loading && <LoadingDetails />}
    </div>
  );
};

export default Details;
