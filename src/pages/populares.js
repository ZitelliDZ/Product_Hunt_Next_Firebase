import React, { Fragment } from 'react'
import Layout from '../layout/Layout';
import DetallesProducto from '@/components/DetallesProducto';
import useProductos from '../../hooks/useProductos';






const Populares = () => {

  const { productos } = useProductos('votos')

  return (
    <Fragment>
      <Layout>

        <div className='listado-productos'>
          <div className='contenedor'>
            <ul className='bg-white'>
              {productos.map(producto =>{
                  return <DetallesProducto key={producto.id} producto={producto} />
              })}
            </ul>
          </div>
        </div>
      </Layout>
    </Fragment>
  )
}

export default Populares



