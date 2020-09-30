import React, { useState } from "react";
import api from "../../services/api";
import Lottie from "react-lottie";
import Searching from "../../images/JSON/searching.json";
import Waiting from "../../images/JSON/waiting.json";
import NotFound from "../../images/JSON/not-found.json";

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
            {!searching && (
              <div className="dv-waiting">
                <h2>Use as opções para buscar o que deseja</h2>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: Waiting,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={250}
                  width={250}
                />
              </div>
            )}
            {searching && (
              <div className="dv-searching">
                <h2>Buscando...</h2>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: Searching,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={250}
                  width={250}
                />
              </div>
            )}
          </div>
        )}

        {notFound && results.length <= 0 && (
          <div className="dv-not-found">
            <h2>Nada encontrado!</h2>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: NotFound,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={250}
              width={250}
            />
          </div>
        )}

        {!notFound && results.length > 0 && (
          <div className="movies-list">
            <h2>Resultados da busca ({resultCount} resultados)</h2>

            <div>
              {results.map((movies) => (
                <div key={movies.imdbID}>
                  <p>{movies.Title}</p>
                  <p>{movies.Year}</p>
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
