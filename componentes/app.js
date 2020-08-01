//{Component} es una clase que estamos heredando de react
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import ContenedorHome from './contenedorHome';
import ContenedorLogin from './contenedorLogin';

//import '../public/estilos/app.css';

//componente funcional
//const App = () =>{

//    return <h1>Hola de react</h1>
//};

//componente tipo clase
class App extends Component{

    estado = {usuario: null};

    componentDidMount(){
        //verificar el estado de usuario
        //util para prevenir la navegacion entre componentes si no estas autenticado
        firebase.auth().onAuthStateChanged((usuario) => {
            if(usuario){

                this.setState({ usuario });
                //console.log(this.estado.usuario);
            }else{
                this.props.history.push('/');
            }
        });
    }
//tambien podemos crear metodos para llamarlos en render()
    //saludoLog = () =>{
    //    console.log('Saludos log');
    //}
   
    render(){
        //this.saludoLog();    
        //saludos = 'Hola de react!!';        

        //return <h1>Hola de react</h1>;  
        //return <h1>{this.saludos}</h1>;
        return(
            <div id="root" className="contenedor-interno">
                <Route exact path='/' component={ContenedorLogin} />
                <Route exact path='/home' component={ContenedorHome} />
            </div>
        );
    }

}

//cuando lo exportemos, esta se convierte en 
//la funcion default

export default withRouter(App);