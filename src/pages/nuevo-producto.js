import React, { useState, useContext, Fragment } from 'react'
import Router, { useRouter } from 'next/router';
import { css } from '@emotion/react'
import Layout from '@/layout/Layout';
import FileUploader from 'react-firebase-file-uploader'
import { Formulario, Campo, InputSubmit, Error } from '@/ui/Formulario';

import { FirebaseContext } from '../../firebase';
import Error404 from '@/layout/404';

//validaciones
import useValidacion from '../../hooks/useValidacion';
import validarCrearProducto from '@/validacion/validarCrearProducto';


const STATE_INICIAL = {
  nombre: '',
  empresa: '',
  url: '',
  descripcion: ''
}


const NuevoProducto = () => {

  //state imagen
  const [nombreImagen, setNombreImagen] = useState('')
  const [subiendo, setSubiendo] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [urlImagen, setUrlImagen] = useState('')

  const [error, setError] = useState(false);

  const { valores,
    errores,
    submitForm,
    handleSubmit, handleBlur,
    handleChange } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto)

  const { nombre, empresa, url, descripcion } = valores;

  const router = useRouter()

  const { usuario, firebase } = useContext(FirebaseContext)

  async function crearProducto() {

    if (!usuario) {
      return router.push('/login')
    }

    //crear el objeto - nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlImagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      },
      haVotado: []
    }

    //agregar nuevo producto a la db
    firebase.db.collection('productos').add(producto)
    return router.push('/')


  }



  const handleUploadStart = () => {
    setProgreso(0)
    setSubiendo(true)
  }

  const handleProgress = progreso => setProgreso({ progreso });


  const handleUploadError = error => {
    setSubiendo(error)
    console.error(error);
  };
  const handleUploadSuccess = nombre => {
    setProgreso(100)
    setSubiendo(false)
    setNombreImagen(nombre)
    firebase
      .storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then(url => {
        console.log(url)
        setUrlImagen(url)
      });
  };



  return (
    <div className='listado-productos' >
    <Layout>

      {!usuario ? <Error404 /> : (
        <Fragment>
          <h1 css={css`
            text-align: center;
            margin-top: 5rem;
          `} >Nuevo Producto</h1>
          <Formulario onSubmit={handleSubmit} >

            <fieldset>
              <legend>Información General</legend>

              <Campo>
                <label htmlFor="nombre">Nombre del Producto:</label>
                <input onBlur={handleBlur} onChange={handleChange} type="text" id='nombre' placeholder='Nombre del Producto' name='nombre' value={nombre} />
              </Campo>
              {errores.nombre && <Error>{errores.nombre}</Error>}
              <Campo>
                <label htmlFor="empresa">Nombre de la Empresa:</label>
                <input onBlur={handleBlur} onChange={handleChange} type="text" id='empresa' placeholder='Nombre de la Empresa' name='empresa' value={empresa} />
              </Campo>
              {errores.empresa && <Error>{errores.empresa}</Error>}
              <Campo>
                <label htmlFor="imagen">Imagen:</label>
                <FileUploader accept='image/*' randomizeFilename
                  storageRef={firebase.storage.ref('productos')}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}

                  id='imagen' placeholder='Suba una imagen' name='imagen' />
              </Campo>

              <Campo>
                <label htmlFor="url">Url:</label>
                <input onBlur={handleBlur} type="url" id='url' placeholder='Ingrese una url' name='url' onChange={handleChange} value={url} />
              </Campo>
              {errores.url && <Error>{errores.url}</Error>}
            </fieldset>
            <fieldset>
              <legend>Sobre tu Producto</legend>
              <Campo>
                <label htmlFor="descripcion">Descripción:</label>
                <textarea onBlur={handleBlur}
                  id='descripcion' placeholder='Descripción...' name='descripcion' onChange={handleChange} value={descripcion} />
              </Campo>
              {errores.descripcion && <Error>{errores.descripcion}</Error>}
            </fieldset>

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value={`Crear Producto`} />
          </Formulario>
        </Fragment>
      )}


    </Layout>
    </div>
  )
}

export default NuevoProducto