import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import "./App.css";
//import * as api from "../../utils/MainApi";
//import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {


  return (

        <div className="page">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/movies">
              <Movies />
            </Route>
            <Route exact path="/saved-movies">
              <SavedMovies />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/signin">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Register />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
      </div>

  );
}

export default App;
