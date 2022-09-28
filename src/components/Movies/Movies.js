import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";

function Movies () {

  return (
    <>
      <Header />
      <main>
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  )
};

export default Movies;
