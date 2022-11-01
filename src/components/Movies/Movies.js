import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";

function Movies ({
  onSearch,
  foundMovies,
  savedMovies,
  onSaveMovie,
  onDeleteMovie,
  onSubmitCheckbox,
  isNotFound,
  isLoading,
  keyWord,
  checkboxStatus
}){

  return (
    <>
      <Header
          isLoggedIn={true}
          isMovies={true}
          isSavedMovies={false}
          isMain={false}
      />
      <main>
        <SearchForm
          onSearch={onSearch}
          onSubmitCheckbox={onSubmitCheckbox}
          inputValue={keyWord}
          isChecked={checkboxStatus}
        />
        {isLoading && <Preloader />}

        {!isNotFound ?
        ( <MoviesCardList
                foundMovies={foundMovies}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                savedMovies={savedMovies}
          />
        ) : <span className="movie__err">Ничего не найдено</span>
        }
      </main>
      <Footer />
    </>
  )
};

export default Movies;
