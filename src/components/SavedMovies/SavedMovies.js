import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import "./SavedMovies.css";

function SavedMovies ({
  onSearch,
  onSubmitCheckbox,
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
  isNotFound,
  isLoading,
}) {

  return (
    <>
      <Header
          isLoggedIn={true}
          isMovies={false}
          isSavedMovies={true}
          isMain={false}
      />
      <main>
        <SearchForm
          onSearch={onSearch}
          onSubmitCheckbox={onSubmitCheckbox}/>

          {isLoading && <Preloader />}
          {!isNotFound ?
          ( <MoviesCardList
                foundMovies={savedMovies}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                savedMovies={savedMovies}
            />
          ): <span className="movie__err">Ничего не найдено</span>
        }
      </main>
      <Footer />
    </>
  )
};

export default SavedMovies;
