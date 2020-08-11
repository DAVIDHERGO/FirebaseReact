import React from "react";

const Header = (props) => {
  return (
    <div id="header">
      <img src="/assets/logo.svg" alt="logo" />

      <h1>React y Firebase</h1>
      {/*renderiza el botón salir en homeContainer*/}
      {props.children}
    </div>
  );
};

export default Header;
