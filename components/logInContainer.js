import React, { Component } from "react";
import Header from "./header";

class LogInContainer extends Component {
  state = { email: "", password: "", error: "" };

  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  logIn() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        this.user = firebase.auth().currentUser;
        this.verifiedUser(this.user);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          this.setState({
            error:
              "El correo " +
              " no existe." +
              " Regístrate para acceder a la app",
          });
        } else {
          this.setState({ error: "Correo o contraseña incorrectos" });
        }
      });
  }

  signUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        this.user = firebase.auth().currentUser;

        this.sendEmail(this.user);
      })
      .catch((error) => {
        this.setState({ error: "Error durante registro" });
      });
  }

  verifiedUser(user) {
    if (user.emailVerified) {
      this.onLogIn();
    } else {
      this.setState({
        message:
          "Antes de continuar" +
          ",sigue las instrucciones enviadas a tu correo",
      });
    }
  }

  sendEmail(user) {
    user
      .sendEmailVerification()
      .then((res) => {
        this.setState({
          message:
            "Para continuar" + ",sigue las instrucciones enviadas a tu correo",
        });
      })
      .catch((error) => {
        this.setState({
          error: "Ha ocurrido un error" + ".Vuelve a intentarlo más tarde",
        });
      });
  }

  onLogIn() {
    this.props.history.push("/home");
  }

  handleLogIn = (event) => {
    event.preventDefault();

    this.setState({ error: "" });

    if (this.state.email && this.state.password) {
      this.logIn();
    } else {
      this.setState({ error: "Llena los campos" });
    }
  };

  manejaSubmitRegistro = (event) => {
    event.preventDefault();

    this.setState({ error: "" });

    if (this.state.email && this.state.password) {
      this.signUp();
    } else {
      this.setState({ error: "Llena los campos" });
    }
  };

  render() {
    return (
      <div id="loginContainer">
        <Header />

        <div id="loginElem">
          <h1>Bienvenido a esta app</h1>

          <form onSubmit={this.handleLogIn}>
            Correo
            <br />
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleEmail}
            />
            <br />
            <br />
            Contraseña
            <br />
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePassword}
            />
            <br />
            <br />
            <div id="buttons">
              <button id="login">Entra</button>
            </div>
          </form>
          <form onSubmit={this.manejaSubmitRegistro}>
            <button id="registro">Regístrate</button>
          </form>

          <p className="error">{this.state.error}</p>

          <p className="message">{this.state.message}</p>
        </div>
      </div>
    );
  }
}
export default LogInContainer;
