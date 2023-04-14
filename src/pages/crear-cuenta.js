import React, { useState } from 'react'
import Router from 'next/router';
import { css } from '@emotion/react'
import Layout from '@/layout/Layout';
import { Formulario, Campo, InputSubmit, Error } from '@/ui/Formulario';

import firebase from '../../firebase';


//validaciones
import useValidacion from '../../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';


const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: ''
}

const CrearCuenta = () => {

  const [error, setError] = useState(false);

  const { valores,
    errores,
    submitForm,
    handleSubmit, handleBlur,
    handleChange } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta)

    
  const { nombre, password, email } = valores;



  async function crearCuenta() {

    try {
      await firebase.registrar(nombre, email, password)
      Router.push('/login')
    } catch (error) {
      console.error('hubo un error al crear el usuario', error.message)
      setError(error.message)
      setTimeout(() => {
        setError(false)

      }, 2000);
    }
  }


  return (
    <div className='listado-productos' >
      <Layout>
      
          <h1 css={css`
            text-align: center;
            margin-top: 5rem;
          `} >Crear Cuenta</h1>
          <Formulario onSubmit={handleSubmit} >
            <Campo>
              <label htmlFor="nombre">Nombre:</label>
              <input onBlur={handleBlur} onChange={handleChange} type="text" id='nombre' placeholder='Tu Nombre' name='nombre' value={nombre} />
            </Campo>
            {errores.nombre && <Error>{errores.nombre}</Error>}
            <Campo>
              <label htmlFor="email">Email:</label>
              <input onBlur={handleBlur} type="text" id='email' placeholder='Tu Email' name='email' onChange={handleChange} value={email} />
            </Campo>
            {errores.email && <Error>{errores.email}</Error>}
            <Campo>
              <label htmlFor="password">Password:</label>
              <input onBlur={handleBlur} type="password" onChange={handleChange} value={password} id='password' placeholder='Tu Password' name='password' />
            </Campo>
            {errores.password && <Error>{errores.password}</Error>}

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value={`Crear Cuenta`} />
          </Formulario>
        
      </Layout>
    </div>
  )
}

export default CrearCuenta