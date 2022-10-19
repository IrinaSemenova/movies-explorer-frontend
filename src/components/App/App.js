
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
      errorApi(err);
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
      errorApi(err);
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
    errorApi(err);
  });
}

// Получение и сохранение данных о пользователе
const getUserData = () => {
  if (isLoggedIn) {
    mainApi.getUserInfo()
    .then((res) => {
      setCurrentUser(res.data);
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
    errorApi(err);
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
        setSavedMovies([]);
        openPopup(exitSuccessful);
    })
    .catch(errorApi);
};

// ----- Films ------

// Хранилище
useEffect(() => {
  if (JSON.parse(localStorage.getItem("allMovies"))) {
      if (localStorage.getItem("allMovies")) {
          setAllMovies(JSON.parse(localStorage.getItem("allMovies")));
      }
  }
  if (localStorage.getItem("searchedMovies") && localStorage.getItem("checkbox")) {
    const checkbox = JSON.parse(localStorage.getItem("checkbox"));
    handleCheckbox(checkbox);
}
}, [])

// Страница Фильмы (получение всех фильмов, поиск)
function handleSearch(movie, checked) {
  if (allMovies.length !== 0) {
      const searchMovies = allMovies.filter((item) =>
            item.nameRU.toLowerCase().includes(movie.toLowerCase()));

      if (searchMovies.length === 0) {
          setIsNotFound(true);
      } else {
          localStorage.setItem("keyWord", movie);
          localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
          localStorage.setItem("checkbox", JSON.stringify(checked));
          setIsNotFound(false);
          setFoundMovies(searchMovies);
      }
  } else {
      moviesApi.getAllMovies()
          .then((movies) => {
              const searchMovies = movies.filter((item) =>
                  item.nameRU.toLowerCase().includes(movie.toLowerCase()));

              if (searchMovies.length === 0) {
                  setIsNotFound(true);
              } else {
                  localStorage.setItem("allMovies", JSON.stringify(movies));
                  setAllMovies(movies);
                  localStorage.setItem("keyWord", movie);
                  localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
                  localStorage.setItem("checkbox", JSON.stringify(checked));
                  setIsNotFound(false);
                  setFoundMovies(searchMovies);
              }
          })
          .catch(errorApi);
  }
}

function handleCheckbox(checkbox) {
  let shortMovies;
  let movies = JSON.parse(localStorage.getItem("searchedMovies"));

  if (checkbox) {
      shortMovies = movies.filter((item) => item.duration <= DURATION_MAX_TIME);
  } else if (!checkbox) {
      shortMovies = movies;
  }
  setFoundMovies(shortMovies);
  localStorage.setItem("checkbox", JSON.stringify(checkbox));
}

// Действие с карточками фильмов (сохранение и удаление)
function handleSaveMovie(movie) {
  mainApi.createMovie(movie)
      .then((res) => {
          setSavedMovies(savedMovies.concat(res));
          setSavedMoviesList(savedMoviesList.concat(res).reverse());
          openPopup(saveMovies);
      })
      .catch((err) => {
        openPopup(serverError);
        errorApi(err);
      });
}

function handleDeleteMovie(movie) {
  mainApi.deleteMovie(movie._id)
      .then(() => {
          const changeMoviesList = savedMovies.filter((item) => item._id !== movie._id);
          setSavedMovies(changeMoviesList);
          setSavedMoviesList(savedMoviesList.filter((item) => item._id !== movie._id));
          openPopup(deleteMovies);
        })
        .catch((err) => {
          openPopup(serverError);
          errorApi(err);
        });
}

// Страница Сохраненные фильмы (получение сохраненных фильмов, поиск)
useEffect(() => {
  if (isLoggedIn && currentUser) {
    mainApi.getSavedMovies()
    .then((res) => {
        const savedMovies = res.filter((movie) => movie.owner === currentUser._id);
        setSavedMovies(savedMovies);
        setSavedMoviesList(savedMovies.reverse());
    })
    .catch(errorApi);
  }
}, [isLoggedIn, currentUser]);

function handleSearchSavedMovie(request) {
  const searchMovies = savedMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(request.toLowerCase()));

  if (searchMovies.length === 0) {
      setIsNotFoundInSaved(true);
  } else {
      setSavedMovies(searchMovies);
      setIsNotFoundInSaved(false);
  }
}

function handleCheckboxSavedMovies(checkbox) {
  if (checkbox) {
      setSavedMovies(savedMovies.filter((item) => item.duration <= DURATION_MAX_TIME));
  } else if (!checkbox) {
      setSavedMovies(savedMoviesList);
  }
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
                        onSubmitCheckbox={handleCheckbox}
                        isNotFound={isNotFound}
                />
              </ProtectedRoute>
            </Route>

            <Route path="/saved-movies">
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedMovies
                    onSearch={handleSearchSavedMovie}
                    onSaveMovie={handleSaveMovie}
                    onDeleteMovie={handleDeleteMovie}
                    savedMovies={savedMovies}
                    onSubmitCheckbox={handleCheckboxSavedMovies}
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

