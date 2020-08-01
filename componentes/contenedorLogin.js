import React, { Component } from 'react';
import Cabecera from './cabecera';

class ContenedorLogin extends Component{

    //siempre se define el state al principio de los componentes
    state = {correo: '', contraseña: '',error : ''};
    
    manejaCambioEmail = (event) => {

        this.setState({ correo: event.target.value });
    };
    manejaCambioPass = (event) => {

        this.setState({ contraseña: event.target.value });
    }; 

    login(){
    
        firebase.auth().signInWithEmailAndPassword(this.state.correo,this.state.contraseña)
            .then(res => { 
              this.usuario = firebase.auth().currentUser;
              
              
              this.usuarioVerificado(this.usuario);

            } )
            .catch(err => { 
                
                if(err.code === 'auth/usuario-not-found'){

                    this.setState({ error: 'El correo ' + this.state.correo+' no existe.'+
                    'Regístrate para acceder a la app' });
                    
                } else{
                    this.setState({ error: 'Correo o contraseña incorrectos' });
                }
            });
    }
    registro(){

        firebase.auth().createUserWithEmailAndPassword(this.state.correo, this.state.contraseña)
        .then(res => {
            
            this.usuario = firebase.auth().currentUser;
            
            this.enviaCorreo(this.usuario);
              
        })
        .catch(error => {
            
            this.setState({error: "Error durante registro"})
            
        })
    }

    usuarioVerificado(usuario){

        if (usuario.emailVerified){
                    
            this.onLogin();
            
        } else{

            this.setState({mensaje: 'Antes de continuar, confirma la verificación enviada a tu correo'});
        }

    }

    enviaCorreo(usuario){
        
        usuario.sendEmailVerification()
        .then(res => {
        
        this.setState({mensaje: "Correo " + this.state.correo + " registrado." +
         "Confirma el correo de verificación para acceder a la app" });
        //console.log(usuario.emailVerified);

	    }).catch(err => {

	 	    this.setState({error:'Ha ocurrido un error, vuelve a intentarlo más tarde'});
         
        });
    }
    

    onLogin(){

        this.props.history.push('/home');

    }

    manejaSubmitLogin = (event) => {

        event.preventDefault();
        this.setState({ error: '' });
        

        if (this.state.correo && this.state.contraseña){
            
            this.login();
        
            }else {
                this.setState({ error: 'Llena los campos' });    
                
        }
           
    };
    //Pendiente: Utilizar referencias en vez de crear otro formulario
    manejaSubmitRegistro = (event) => {

        event.preventDefault();
        this.setState({ error: '' });
        
        if (this.state.correo && this.state.contraseña){
            
            this.registro();        

            }else {
                this.setState({ error: 'Llena los campos' });    
                
        }
           
    };

    render(){

        return( 
        <div id ="ContenedorLogin" className="contenedor-interno">
            < Cabecera />
            <div id="index" className="col">
                
                <div id="elem_login" className="col">
                    <h1>Bienvenido a esta app</h1>
                   <form  onSubmit={this.manejaSubmitLogin}>
                    Correo<br /><input type="text" name="correo" id="txtCorreo" value={this.state.correo} onChange={this.manejaCambioEmail}/><br /><br />
                    Contraseña<br /><input type="password" name="pass" id="txtContra" value={this.state.contraseña} onChange={this.manejaCambioPass} /><br /><br />
                    <p className="error">{this.state.error}</p>
                    <p className="mensaje">{this.state.mensaje}</p>

                <div id="botones" className="col">
                    <button id="login" ref="refLogin">Entra</button>
                        
                </div>     
            
                </form>
                <form onSubmit={this.manejaSubmitRegistro}>
                <button id="registro" ref="refRegistro">Regístrate</button> 
                </form>       
                </div>
                
            </div>

        </div>
        );
    }

}
export default ContenedorLogin;