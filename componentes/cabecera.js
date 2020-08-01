import React from 'react';

const Cabecera = (props) => {

    return(

        <div id="header">
            <img src="/recursos/logo.svg" alt="logo" />
        
            <h1>React y Firebase</h1>
            {/* esta linea previene renderizar el boton salir en el login*/}
            {props.children}
        </div>
    );
};

export default Cabecera;