
import { useState, useEffect } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import "./App.css";

import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";

import { DURATION_MAX_TIME } from "../../utils/constant";
import {
  deleteMovies,
  serverError,
  registerSuccessful,
  authError,
  saveMovies,
  loginSuccessful,
  conflictError,
  exitSuccessful,
  profileSuccessful
} from "../../utils/textError";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("signin"));
  const [isLoading, setIsLoading] = useState(false);

  const [allMovies, setAllMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [searchKeyWordMovies, setSearchKeyWordMovies] = useState("");
  const [searchKeyWordSavedMovies, setSearchKeyWordSavedMovies] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [checkboxSavedMovies, setCheckboxSavedMovies] = useState(false);

  const [isNotFound, setIsNotFound] = useState(false);
  const [isNotFoundInSaved, setIsNotFoundInSaved] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const history = useHistory();

// create Error Api
  function errorApi(err){
    console.log(`Ошибка: ${err}`);
  }

// Popup
  function openPopup(textError) {
    setPopupMessage(textError);
    setIsPopupOpen(true);
  }

  useEffect(() => {
    setTimeout(() => {
      setIsPopupOpen("");
    }, 2000);
  }, [isPopupOpen]);

// Регистрация
const handleRegister = ({name, email, password}) => {
  mainApi.register(name, email, password)
    .then((res) => {
      if (res) {
        handleLogin({email, password});
        openPopup(registerSuccessful);
      }
    })
    .catch((err) => {
      if (err.status === 409 || 11000) {
        openPopup(conflictError);
      } else {
        openPopup(serverError);
      }
      fullLogoutAuth(err);
    });
};

// Авторизация
const handleLogin = ({email, password}) => {
  mainApi.authorize(email, password)
    .then((data) => {
      if (data.message === "Аутентификация прошла успешно") {
        setLoggedIn(true);
        getUserData();
        history.push("/movies");
        //localStorage.setItem("jwt", data.token);
        localStorage.setItem("signin", true);
        openPopup(loginSuccessful);
      }
    })
    .catch((err) => {
      if (err.status === 401 || 404) {
        openPopup(authError);
      } else {
        openPopup(serverError);
      }
      fullLogoutAuth(err);
    });
};


// Обновление данных профиля
const handleUpdateUser = ({ name, email }) => {
  //const jwt = localStorage.getItem("jwt");
  mainApi.editUserInfo(name, email)
  .then((res) => {
    setCurrentUser(res.data);
    openPopup(profileSuccessful);
  })
  .catch((err) => {
    if (err.status === 409 || 11000) {
      openPopup(conflictError);
    } else {
      openPopup(serverError);
    }
    fullLogoutAuth(err);
  });
}

// Получение и сохранение данных о пользователе
const getUserData = () => {
  if (isLoggedIn) {
    mainApi.getUserInfo()
    .then((res) => {
      setCurrentUser(res.data);
    })
    .catch((err) => {
      fullLogoutAuth(err);
    });
  }
};

// tokenCheck. Отправяет данные на сервер
useEffect(() => {
  if (isLoggedIn) {
    tokenCheck();
  }
}, [isLoggedIn]);

const tokenCheck = () => {
  mainApi.getUserInfo()
  .then((res) => {
    if (res.data._id) {
      setCurrentUser(res.data);
      setLoggedIn(true);
      localStorage.setItem("signin", true);
    }
  })
  .catch((err) => {
    fullLogoutAuth(err);
  });
};

// Выход
const handleSignOut = () => {
  mainApi.logout()
    .then(() => {
        history.push("/");
        localStorage.clear();
        localStorage.removeItem("signin");
        setLoggedIn(false);
        setFoundMovies([]);
        setAllMovies([]);
        openPopup(exitSuccessful);
    })
    .catch(errorApi);
};

const fullLogoutAuth = (err) => {
    if (err.response === "Необходима авторизация") {
      setLoggedIn(false);
      localStorage.clear();
      localStorage.removeItem("signin");
      setAllMovies([]);
      setCurrentUser({});
      setFoundMovies([]);
      history.push("/");
    } else { return err}
  }

// ----- Films ------
// Страница Фильмы (получение всех фильмов, поиск)
function handleSearch(keyWord, checkbox) {
  keyWord = keyWord.trim().toLowerCase();
  setSearchKeyWordMovies(keyWord);
  localStorage.setItem("searchKeyWordMovies", keyWord);

  if (localStorage.getItem("allmovies")) {
    let searchMovies = allMovies.filter((item) =>
        item.nameRU.toLowerCase().includes(keyWord));
    if (checkbox) {
        searchMovies = searchMovies.filter((item) =>
        item.duration < DURATION_MAX_TIME);
    }
    setFoundMovies(searchMovies);
    localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));

    if (searchMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  } else {
    moviesApi.getAllMovies()
      .then((movies) => {
        localStorage.setItem("allmovies", JSON.stringify(movies));
        setAllMovies(movies);

        let searchMovies = movies.filter((item) =>
            item.nameRU.toLowerCase().includes(keyWord));
        if (checkbox) {
            searchMovies = searchMovies.filter((item) =>
            item.duration < DURATION_MAX_TIME);
        }
        setFoundMovies(searchMovies);
        localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
      })
      .catch((err) => {
        fullLogoutAuth(err);
      })
  }
}

function handleSetCheckboxMovies(value) {
  setCheckbox(value);
  localStorage.setItem("checkbox", value);
  if (searchKeyWordMovies)
    handleSearch(searchKeyWordMovies, value);
}

// Действие с карточками фильмов (сохранение и удаление)
function handleSaveMovie(movie) {
  mainApi.createMovie(movie)
  .then((res) => {
    const changeMoviesList = savedMovies.concat(res).reverse();
    setSavedMovies(changeMoviesList);
    openPopup(saveMovies);
  })
    .catch((err) => {
      openPopup(serverError);
      fullLogoutAuth(err);
    });
}


function handleDeleteMovie(movie) {
  const savedMovie = savedMovies.find((item) => item._id === movie._id);
  mainApi.deleteMovie(savedMovie._id)
    .then(() => {
      const changeMoviesList = savedMovies.filter((item) => item._id !== movie._id);
      setSavedMovies(changeMoviesList);
      setSavedMoviesList(changeMoviesList);
      openPopup(deleteMovies);
    })
    .catch((err) => {
      openPopup(serverError);
      fullLogoutAuth(err);
    });
}

// Страница Сохраненные фильмы (получение сохраненных фильмов, поиск)
useEffect(() => {

  if (isLoggedIn && currentUser) {
    mainApi.getSavedMovies()
      .then((res) => {
        const savedMovies = res.filter((movie) => movie.owner === currentUser._id);
        setSavedMovies(savedMovies.reverse());
        setSavedMoviesList([]);
      })
      .catch((err) => {
        fullLogoutAuth(err);
      });

    const arr = JSON.parse(localStorage.getItem("allmovies") || "[]");
    setAllMovies(arr);
    const arrSearched = JSON.parse(localStorage.getItem("searchedMovies") || "[]");
    setFoundMovies(arrSearched);
  }
}, [isLoggedIn, currentUser]);

useEffect(() => {
  if (isLoggedIn) {
    handleSearchSavedMovies(searchKeyWordSavedMovies, checkboxSavedMovies);
  }
}, [isLoggedIn, searchKeyWordSavedMovies, checkboxSavedMovies, savedMovies]);

function handleSearchSavedMovies(keyWord, checkboxSavedMovies) {
  keyWord = keyWord.trim().toLowerCase();
  setSearchKeyWordSavedMovies(keyWord);
  let searchMovies = savedMovies;
  if (keyWord !== "") {
      searchMovies = searchMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(keyWord))
  }
  if (checkboxSavedMovies) {
      searchMovies = searchMovies.filter((item) =>
      item.duration < DURATION_MAX_TIME);
  }
  setSavedMoviesList(searchMovies);

  if (searchMovies.length === 0) {
    setIsNotFoundInSaved(true);
  } else {
    setIsNotFoundInSaved(false);
  }
}

function handleSetCheckboxSavedMovies(value) {
  setCheckboxSavedMovies(value);
  if (searchKeyWordSavedMovies)
    handleSearchSavedMovies(searchKeyWordSavedMovies, value);
}

  return (
  <CurrentUserContext.Provider value={currentUser}>

  <div className="page">
          <Switch>
            <Route exact path="/">
              <Main isLoggedIn={isLoggedIn}/>
            </Route>

            <Route exact path="/signup">
              { !isLoggedIn ?
                <Register onSubmit={handleRegister} /> :
                <Redirect to="/movies" />
              }
            </Route>

            <Route exact path="/signin">
              { !isLoggedIn ?
              <Login onSubmit={handleLogin} /> :
              <Redirect to="/movies" />
              }
            </Route>

            <Route path="/movies">
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies
                        isLoading={isLoading}
                        onSearch={handleSearch}
                        foundMovies={foundMovies}
                        onSaveMovie={handleSaveMovie}
                        onDeleteMovie={handleDeleteMovie}
                        savedMovies={savedMovies}
                        onSubmitCheckbox={handleSetCheckboxMovies}
                        keyWord={searchKeyWordMovies}
                        checkboxStatus={checkbox}
                        isNotFound={isNotFound}
                />
              </ProtectedRoute>
            </Route>

            <Route path="/saved-movies">
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedMovies
                    onSearch={handleSearchSavedMovies}
                    onSubmitCheckbox={handleSetCheckboxSavedMovies}
                    foundMovies={savedMoviesList}
                    keyWord={searchKeyWordSavedMovies}
                    checkboxStatus={checkboxSavedMovies}
                    onSaveMovie={handleSaveMovie}
                    onDeleteMovie={handleDeleteMovie}
                    savedMovies={savedMovies}
                    isNotFound={isNotFoundInSaved}
                    isLoading={isLoading}

                />
              </ProtectedRoute>
            </Route>

            <Route path="/profile">
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                    handleUpdateUser={handleUpdateUser}
                    onLogout={handleSignOut}
                />
              </ProtectedRoute>
            </Route>

            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>

          <InfoTooltip
            text={popupMessage}
            isOpen={isPopupOpen}
          />
  </div>
  </CurrentUserContext.Provider>
  );
}

export default App;

