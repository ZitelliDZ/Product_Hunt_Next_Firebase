import React, { useContext } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { FirebaseContext } from '../../firebase';


const Nav = styled.div`
   padding-left: 2rem;
   a{
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gris2);
    font-family: 'PT Sans',sans-serif;

    &:last-of-type{
      margin-right: 0;
    }
   }
`;


const Navegacion = () => {


  const { usuario } = useContext(FirebaseContext)

  return (

    <Nav>
      <Link legacyBehavior href={`/`}>Inicio</Link>
      <Link legacyBehavior href={`/populares`}>Populares</Link>
      {usuario && (
        <Link legacyBehavior href={`/nuevo-producto`}>Nuevo Producto</Link>
      )}
    </Nav>


  )
}

export default Navegacion