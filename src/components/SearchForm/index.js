import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
// EXTERNAL STYLES
import "./styles.css";

const SearchForm = (props) => {
  const selectType = (type) => {
    props.selectType(type);
    let elem = document.getElementById("typeGroup");

    for (let i = 0; i < elem.children.length; i++) {
      elem.children[i].value === type
        ? elem.children[i].classList.add("selected")
        : elem.children[i].classList.remove("selected");
    }
  };

  return (
    <>
      <form
        onSubmit={props.loadMovies()}
        id="form-search"
        className="form-search"
      >
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
          disabled={props.selectedOption === ""}
          type="text"
          id="btnSubmit"
          value={props.nameSearch}
          onChange={(e) => props.setNameSearch(e.target.value)}
          placeholder="ex: back to the future"
          data-filled="true"
        />

        <button
          disabled={
            props.selectedOption === "" ||
            props.nameSearch === "" ||
            props.searching
          }
          type="submit"
          className="buttonSearch"
          id="buttonSearch"
        >
          {props.searching ? <LinearProgress /> : "Buscar"}
        </button>
      </form>
    </>
  );
};

export default SearchForm;
