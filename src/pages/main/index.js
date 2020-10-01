import React, { useEffect, useState } from "react";
// EXTERNAL SERVICES
import api from "../../services/api";
// EXTERNAL COMPONENTS
import LoadingCard from "../../components/LoadingCard";
import WaitAction from "../../components/WaitAction";
import NothingFd from "../../components/NothingFd";
import ItemsList from "../../components/ItemsList";
import Pagination from "../../components/Pagination";
// EXTERNAL STYLES
import "./styles.css";

const Main = () => {
  const [results, setResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [lastSearch, setLastSearch] = useState();
  const [lastType, setLastType] = useState();
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [resultCount, setResultCount] = useState("");
  const [page, setPage] = useState(1);

  const loadMovies = async (e) => {
    e.preventDefault();
    setResults([]);
    setNotFound(false);
    setSearching(true);

    if (lastSearch !== nameSearch.trim() || lastType !== selectedOption) {
      setPage(1);
    }

    const response = await api.get(
      "/?&apikey=ad055d30&s=" +
        nameSearch.trim() +
        "&type=" +
        selectedOption +
        "&page=" +
        page
    );

    if (response.data.Response === "True") {
      setResults(response.data.Search);
      setResultCount(response.data.totalResults);
      setSearching(false);
      setLastSearch(nameSearch.trim());
      setLastType(selectedOption);
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
            id="buttonSearch"
          >
            {searching ? "Buscando..." : "Buscar"}
          </button>
        </form>
        <Pagination
          prevPage={() => {
            setPage(page - 1);
            document.getElementById("buttonSearch").click();
          }}
          nextPage={() => {
            setPage(page + 1);
            document.getElementById("buttonSearch").click();
          }}
          page={page}
          resultCount={resultCount}
          lastSearch={lastSearch}
          lastType={lastType}
          actualSeach={nameSearch.trim()}
          actualType={selectedOption}
        />
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
          <ItemsList resultCount={resultCount} results={results} />
        )}
      </div>
    </div>
  );
};

export default Main;
