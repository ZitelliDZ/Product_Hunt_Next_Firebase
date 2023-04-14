import React, { useState } from 'react'
import styled from '@emotion/styled';
import Router from 'next/router';
import { css } from '@emotion/react'
import Layout from '@/layout/Layout';
import { Formulario, Campo, InputSubmit, Error } from '@/ui/Formulario';

import firebase from '../../firebase';


//validaciones
import useValidacion from '../../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';



const STATE_INICIAL = {
  email: '',
  password: ''
}

const Login = () => {


  const [error, setError] = useState(false);

  const { valores,
    errores,
    submitForm,
    handleSubmit, handleBlur,
    handleChange } = useValidacion(STATE_INICIAL, validarIniciarSesion, IniciarSesion)

  const { password, email } = valores;



  async function IniciarSesion() {

    try {
      await firebase.login(email, password)
      
      Router.push('/')
    } catch (error) {
      console.error('error al autenticar el usuario', error.message)
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
          `} >Iniciar Sesión</h1>
          <Formulario onSubmit={handleSubmit} >
            
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

            {error ? <Error>{error}</Error> : null}

            <InputSubmit type="submit" value={`Iniciar Sesión`} />
          </Formulario>
        
      </Layout>
      </div>
  )
}

export default Login