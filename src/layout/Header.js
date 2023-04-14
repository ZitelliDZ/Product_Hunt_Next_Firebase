import React, { useContext } from 'react'
import Link from 'next/link'
import Buscar from '../ui/Buscar'
import Navegacion from './Navegacion'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Boton from '../ui/Boton'
import { FirebaseContext } from '../../firebase'
import { Fragment } from 'react'

const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.div`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;

const Header = () => {

    const { usuario, firebase } = useContext(FirebaseContext);


    return (

        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}

        >
            <ContenedorHeader >
                <div
                    css={css`
                        display:flex;
                        align-items: center;
                    `}
                >
                    <Link legacyBehavior href={'/'}>
                        <Logo>P</Logo>
                    </Link>

                    {/* Buscador */}
                    <Buscar />
                    {/* Nav */}
                    <Navegacion />
                </div>
                <div
                    css={css`
                        display: flex;
                        align-items: center;

                    `}
                >

                    {usuario ? (
                        <Fragment>
                            <p css={css`
                                    margin-right: 2rem;
                                    
                                `}>Hola: {usuario.displayName}</p>
                            <Boton bgColor={true} onClick={()=>firebase.cerrarSesion()} type='button'>Cerrar Session</Boton>

                        </Fragment>

                    ) : (
                        <Fragment>
                            {/* Menu de Admin */}
                            <Boton bgColor={true}>
                                <Link legacyBehavior href={`/login`}>Login</Link>
                            </Boton>
                            <Boton>
                                <Link legacyBehavior href={`/crear-cuenta`}>Crear Cuenta</Link>
                            </Boton>
                        </Fragment>

                    )}

                </div>
            </ContenedorHeader>
        </header >

    )
}

export default Header