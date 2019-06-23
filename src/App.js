import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/auth/protectedRoute";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authAction";
import { setToken } from "./actions/authAction";

// Imported pages/components
import AppNavbar from "./components/layout/AppNavbar";
import LandingPage from "./components/layout/LandingPage";
import Dashboard from "./components/layout/Dashboard";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Register from "./components/auth/Register";
import PasswordForget from "./components/auth/PasswordForget";
import Board from "./components/layout/Board";
import Chat from "./components/chat/Chat";
import Alert from "./components/layout/Alert";
import LobbyPage from "./components/lobby/LobbyPage";
import AddLobbyPage from "./components/lobby/AddLobby";
import { Logout } from "./components/auth/Logout";

// Check for a token in localStorage
// If there is a token then the user should be autherised
if (localStorage.token) {
  console.log("%c TOKEN", "color: orange; font-weight: bold");

  store.dispatch(
    setToken({
      isAuthenticated: true,
      token: localStorage.token
    })
  );
}

const App = () => {
  if (localStorage.token) {
    useEffect(() => {
      store.dispatch(loadUser(localStorage.token));
    }, []);
  } // Added brackets so the function only runs once

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="App">
            <AppNavbar />
            <div className="container-fluid">
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  zIndex: "5"
                }}
              >
                <Alert
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                />
              </div>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/about" component={About} />
                <ProtectedRoute exact path="/social" component={Dashboard} />
                <ProtectedRoute exact path="/lobby" component={LobbyPage} />
                <Route exact path="/lobby/add" component={AddLobbyPage} />
                <Route path="/game" component={Board} />
                <Route
                  exact
                  path="/password-forget"
                  component={PasswordForget}
                />
                <ProtectedRoute exact path="/chat" component={Chat} />
                <ProtectedRoute exact path="/logout" component={Logout} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
