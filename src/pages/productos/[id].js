import React, { useEffect, useState, useContext, Fragment } from 'react'
import { useRouter } from 'next/router'
import Error404 from '@/layout/404'
import Layout from '@/layout/Layout'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { Campo, InputSubmit } from '@/ui/Formulario'
import Boton from '@/ui/Boton'


import { FirebaseContext } from '../../../firebase'


const ContenedorProducto = styled.div`
@media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
}
`

const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: white;
    text-transform: uppercase;
    font-size: bold;
    display: inline-block;
    text-align: center;
    border-radius: 10px;
    margin: 3rem 0 1rem 0;
`


const Producto = () => {
    //state del componente
    const [producto, setProducto] = useState({})
    const [error, setError] = useState(false)
    const [comentario, setComentario] = useState({})
    const [consultarDB, setConsultarDB] = useState(true)

    //Routing para obtener el id actual
    const router = useRouter()
    const { query: { id } } = router

    // context de firebase
    const { firebase, usuario } = useContext(FirebaseContext)

    useEffect(() => {
        if (id && consultarDB) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id)
                const producto = await productoQuery.get()
                if (producto.exists) {
                    setProducto(producto.data())
                    setConsultarDB(false)
                } else {
                    setError(true)
                    setConsultarDB(false)
                }

            }

            obtenerProducto()

        }

    }, [id])

    if (Object.keys(producto).length === 0 && !error) return 'Cargando...';

    const { creador, comentarios, creado, descripcion, empresa, nombre, url, urlImagen, votos, haVotado } = producto;

    //Administrar y validar los votos
    const votarProducto = async () => {
        if (!usuario) {
            return router.push('/')
        }
        //obtener y sumar un nuevo voto
        const totalVotos = votos + 1;

        //verificar si ha votado
        if (haVotado.includes(usuario.uid)) {
            return
        }

        console.log(usuario.uid)

        const nuevoHaVotado = [...haVotado, usuario.uid]

        //Actualizar db
        await firebase.db.collection('productos').doc(id).update({ votos: totalVotos, haVotado: nuevoHaVotado })

        //Actualizar state
        setProducto({
            ...producto,
            votos: totalVotos,
            haVotado: nuevoHaVotado
        })

        setConsultarDB(true)
    }

    //funcion para crear comentario
    const comentarioChange = e => {
        setComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    //Identificar si el comentario es del creador
    const esCreador = id => {
        if (creador.id == id) {
            return true
        }
        return false
    }
    const agregarComentario = async e => {
        e.preventDefault()
        if (!usuario) {
            return router.push('/login')
        }

        //info extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName

        //Tomar copia de comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario]

        //actualizar la db
        await firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        })

        //actualizar el state
        setProducto({
            ...producto,
            comentarios: nuevosComentarios
        })


        setConsultarDB(true)
    }

    //funcion que revisa que el creador del producto sea el mismo que esta auth
    const puedeBorrar = () => {
        if (!usuario) return false;
        if (creador.id === usuario.uid) {
            return true
        }
        return false
    }

    const eliminarProducto = async () => {

        if (!usuario) return router.push('/login');
        if (creador.id !== usuario.uid) {
            return router.push('/');
        }
        try {
            await firebase.db.collection('productos').doc(id).delete()
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <Fragment>
                {error ? <Error404 /> : (
                    <div className='contenedor'>
                        <h1
                            css={css`
                            text-align: center;
                            margin: 5rem;
                        `}
                        >

                            {nombre}
                        </h1>
                        <ContenedorProducto>
                            <div>
                                <p>Publicado hace: {formatDistanceToNow(new Date(creado), { locale: es })}</p>
                                <p>Publicado por: {creador.nombre} de {empresa}</p>
                                <img src={urlImagen} alt="" />
                                <p>{descripcion}</p>
                                {usuario && (
                                    <Fragment>
                                        <h2>Agrega tu comentario</h2>
                                        <form onSubmit={agregarComentario} >
                                            <Campo>
                                                <input type='text'
                                                    name='mensaje'
                                                    onChange={comentarioChange} />
                                            </Campo>
                                            <InputSubmit type='submit'
                                                value={`Agregar Comentario`} />

                                        </form>
                                    </Fragment>
                                )}
                                <h2 css={css`
                                    margin: 2rem 0;
                                `}>Comentarios</h2>
                                {comentarios.length === 0 ? 'Aún no hay comentarios' : (
                                    <ul>
                                        {comentarios.map((comentario, i) => (
                                            <li key={`${comentario.usuarioId}-${i}`}
                                                css={css`
                                                border: 1px solid #e1e1e1;
                                                padding: 2rem;
                                            `}

                                            >
                                                <p>{comentario.mensaje}</p>
                                                <p>Escrito por:
                                                    <span
                                                        css={css`
                                                            font-weight: bold;
                                                        `}
                                                    >
                                                        {'  '}{comentario.usuarioNombre}
                                                    </span>
                                                </p>
                                                {esCreador(comentario.usuarioId) && <CreadorProducto>Es Creador</CreadorProducto>}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                            </div>
                            <aside>
                                <Boton target='_blank' bgColo='true' href={url} >Visitar URL</Boton>


                                <div
                                    css={css`
                                        margin-top: 5rem;
                                    `}
                                >
                                    <p css={css`
                                    text-align: center;
                                    margin-bottom: 3rem;
                                `}>{votos} Votos</p>
                                    {usuario && (

                                        <Boton onClick={votarProducto}>Votar</Boton>
                                    )}
                                </div>

                            </aside>
                        </ContenedorProducto>
                        {puedeBorrar() && (
                            <Boton onClick={eliminarProducto}>Eliminar Producto</Boton>
                        )}
                    </div>
                )}

            </Fragment>
        </Layout>
    )
}

export default Producto