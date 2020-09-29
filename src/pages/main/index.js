import React, { Component } from "react";
import api from "../../services/api";

export default class Main extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    this.loadMovies();
  }

  loadMovies = async () => {
    const response = await api.get("/?&apikey=ad055d30&s=sherlock&page=1");
    this.setState({ movies: response.data.Search });
  };

  render() {
    return (
      <div className="movies-list">
        {this.state.movies.map((movies) => (
          <h2 key={movies.imdbID}>{movies.Title}</h2>
        ))}
      </div>
    );
  }
}
