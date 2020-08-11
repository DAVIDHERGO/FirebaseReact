import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import HomeContainer from "./homeContainer";
import LogInContainer from "./logInContainer";
import "../public/styles/app.css";

class App extends Component {
  state = { user: null };

  componentDidMount() {
    /*evita la navegación entre componentes si
        el user no está autenticado*/

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.props.history.push("/");
      }
    });
  }

  render() {
    return (
      <div id="root">
        <Route exact path="/" component={LogInContainer} />

        <Route exact path="/home" component={HomeContainer} />
      </div>
    );
  }
}

export default withRouter(App);
