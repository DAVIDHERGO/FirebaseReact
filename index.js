//Para no tener que escribir la ruta relativa del script
//react.js y react-dom.js y solo llamar bundle.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './componentes/app'




//ReactDOM.render(React.createElement('h1',null,'Hola de react'),
//document.getElementById('root'));

//if(module.hot){
  //  module.hot.accept('./componentes/app', () => {

       const nextApp = require('./componentes/app').default;
        ReactDOM.render(
        <BrowserRouter>
        <App />
        </ BrowserRouter>,
        document.getElementById('root'));

//    });    
//}