import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingScene from "../Scene/Landing/landing.scene";
import LoginScene from "../Scene/Login/login.scene";
import Dashboard from "../Scene/Dashboard/dashboard.scene";
import GamesScene from "../Scene/Games/games.scene";
import AddNewGame from "../Scene/AddNewGame/addNewGame.scene";

function IndexRouter() {
    return (
        <Router>
            <Route path="/" exact component={LandingScene} />
            <Route path="/login" exact component={LoginScene} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/games" exact component={GamesScene} />
            <Route path="/addNewGame" exact component={AddNewGame} />
        </Router >
    );
}

export default IndexRouter;
