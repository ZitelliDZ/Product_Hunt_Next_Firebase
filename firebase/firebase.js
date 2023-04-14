import app from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

import firebaseConfig from "./config";

class Firebase {
    constructor() {
        if (!app.apps.lengh) {
            app.initializeApp(firebaseConfig);
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    //Registrar usuario
    async registrar(nombre, email, password){
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email,password);
        return await nuevoUsuario.user.updateProfile({
            displayName : nombre
        }) 
    }
    //Iniciar sesion
    async login( email, password){
        
        return await this.auth.signInWithEmailAndPassword(email,password )
    }
    //Cerrar sesion
    async cerrarSesion(  ){
        await this.auth.signOut( )
    }

}

 const firebase = new Firebase()
 export default firebase;