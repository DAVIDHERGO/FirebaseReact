import React, { Component } from 'react';
import Cabecera from './cabecera'


export default class ContenedorHome extends Component {  
    
    salir = () => {

        firebase.auth().signOut();
    };

    render(){
        
        return (   

            <div id="contenedorHome"> 
            {/*En vez de <Cabecera/>
            utilizamos las etiquetas de apertura y cierre
            para que en cabecera.js podamos acceder al boton*/}
            <Cabecera>
                <h1> Hola, bienvenido</h1>  
                <button id="botonSalir" onClick={this.salir}> Salir</button>
            </ Cabecera>
            
            </div>

        ); 
    
    }

}