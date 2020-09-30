import React, { useState, useEffect } from "react";
import "materialize-css";
import api from "../../services/api";

import "./styles.css";

const Main = () => {
  const [results, setResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [nameSearch, setNameSearch] = useState("");

  const loadMovies = async () => {
    const response = await api.get("/?&apikey=ad055d30&s=avengers&page=1");
    if (response.data.Response === "True") {
      setResults(response.data.Search);
    } else {
      setResults([]);
    }
  };

  const selectType = (type) => {
    setSelectedOption(type);
    let elem = document.getElementById("typeGroup");

    for (let i = 0; i < elem.children.length; i++) {
      elem.children[i].value === type
        ? elem.children[i].classList.add("selected")
        : elem.children[i].classList.remove("selected");
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className="dv-main">
      <div className="dv-search">
        <form className="form-search">
          <div>Pesquisar</div>
          <div>O que deseja buscar?</div>
          <div id="typeGroup">
            <button
              value="movies"
              type="button"
              onClick={() => selectType("movies")}
            >
              Filmes
            </button>
            <button
              value="series"
              type="button"
              onClick={() => selectType("series")}
            >
              Séries
            </button>
            <button
              value="episode"
              type="button"
              onClick={() => selectType("episode")}
            >
              Episódio
            </button>
          </div>

          <input
            disabled={selectedOption === ""}
            type="text"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            placeholder="ex: back to the future"
            data-filled="true"
          />

          <button
            disabled={selectedOption === "" || nameSearch === ""}
            type="submit"
          >
            Buscar
          </button>
        </form>
      </div>
      {results.length > 0 && (
        <div className="movies-list">
          {results.map((movies) => (
            <h2 key={movies.imdbID}>{movies.Title}</h2>
          ))}
        </div>
      )}
      {results.length <= 0 && (
        <div>
          <h2>Nada encontrado</h2>
        </div>
      )}
    </div>
  );
};

export default Main;
