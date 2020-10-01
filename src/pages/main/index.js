import React, { useEffect, useState } from "react";
// EXTERNAL SERVICES
import api from "../../services/api";
// EXTERNAL COMPONENTS
import LoadingCard from "../../components/LoadingCard";
import WaitAction from "../../components/WaitAction";
import NothingFd from "../../components/NothingFd";
// EXTERNAL STYLES
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

  useEffect(() => {
    let elemLeft = document.getElementById("dv-search");
    let elemRight = document.getElementById("dv-result");
    window.addEventListener("scroll", () => {
      if (window.scrollY === 0) {
        elemRight.classList.remove("notop");
        elemLeft.classList.remove("notop");
      } else {
        elemRight.classList.add("notop");
        elemLeft.classList.add("notop");
      }
    });
  }, []);

  return (
    <div className="dv-main">
      <div id="dv-search" className="dv-search">
        <form onSubmit={loadMovies} className="form-search">
          <div>
            <div>Pesquisar</div>
            <div>O que deseja buscar?</div>
          </div>
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
      <div id="dv-result" className="dv-result">
        {!notFound && results.length <= 0 && (
          <div>
            {!searching && <WaitAction />}
            {searching && <LoadingCard />}
          </div>
        )}

        {notFound && results.length <= 0 && <NothingFd />}

        {!notFound && results.length > 0 && (
          <div className="movies-list">
            <div>
              <h2>Resultados da busca</h2>
              <span>{resultCount} resultados</span>
            </div>
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
