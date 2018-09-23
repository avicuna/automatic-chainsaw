import * as React from "react";
import "./App.css";
import "./include/mdb";
// import RegisterUser from "./components/register-user";

// import ViewWorkout from "./components/view-workout";

import Login from "./components/login";
import RegisterUser from "./components/register-user";
import Dashboard from "./components/dashboard/dashboard";
import Profile from "./components/profile/profile";
import ViewWorkoutHistory from "./components/view-workout-history";
import NewWorkout from "./components/new-workout";
import EditProfile from "./components/profile/edit-profile";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomeComponent } from "./components/home/home.component";

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <div id="main-content-container">
              <Switch>
                <Route path="/home" component={HomeComponent}/>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/sign-up" component={RegisterUser} />
                <Route path="/new-workout" component={NewWorkout} />
                <Route
                  path="/view-workout-history"
                  component={ViewWorkoutHistory}
                />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
                <Route path="/edit-profile" component={EditProfile} />
                <Route component={HomeComponent} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
