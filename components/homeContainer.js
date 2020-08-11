import React, { Component } from "react";
import Header from "./header";

export default class HomeContainer extends Component {
  salir = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <div id="homeContainer">
        <Header>
          <h1> Hola, bienvenido</h1>

          <button id="exitButton" onClick={this.salir}>
            Salir
          </button>
        </Header>
      </div>
    );
  }
}
