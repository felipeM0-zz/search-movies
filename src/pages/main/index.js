import React, { useState } from "react";
import "materialize-css";
import api from "../../services/api";

import "./styles.css";

const Main = () => {
  const [results, setResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [resultCount, setResultCount] = useState("");

  const loadMovies = async (e) => {
    e.preventDefault();

    setResults([]);
    setNotFound(false);
    setSearching(true);

    const response = await api.get(
      "/?&apikey=ad055d30&s=" +
        nameSearch.trim() +
        "&type=" +
        selectedOption +
        "&page=1"
    );

    if (response.data.Response === "True") {
      setResults(response.data.Search);
      setResultCount(response.data.totalResults);
      setSearching(false);
    } else {
      setNotFound(true);
      setResultCount("");
      setSearching(false);
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

  return (
    <div className="dv-main">
      <div className="dv-search">
        <form onSubmit={loadMovies} className="form-search">
          <div>Pesquisar</div>
          <div>O que deseja buscar?</div>
          <div id="typeGroup">
            <button
              value="movie"
              type="button"
              onClick={() => selectType("movie")}
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
            disabled={selectedOption === "" || nameSearch === "" || searching}
            type="submit"
          >
            {searching ? "Buscando..." : "Buscar"}
          </button>
        </form>
      </div>
      <div className="dv-result">
        {!notFound && results.length <= 0 && (
          <div>
            {!searching && <h2>Busque ao lado por filmes e séries</h2>}
            {searching && <h2>Buscando...</h2>}
          </div>
        )}

        {notFound && results.length <= 0 && (
          <div>
            <h2>Nada encontrado</h2>
          </div>
        )}

        {!notFound && results.length > 0 && (
          <div className="movies-list">
            <h2>Resultados da busca ({resultCount} resultados)</h2>

            <div>
              {results.map((movies) => (
                <div key={movies.imdbID}>
                  <h2>{movies.Title}</h2>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
