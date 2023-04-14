import React, { useState, useEffect } from 'react'

const useValidacion = (STATE_INICIAL, validar, fn) => {

    const [valores, setValores] = useState(STATE_INICIAL)
    const [errores, setErrores] = useState({})
    const [submitForm, setSubmitForm] = useState(false)


    useEffect(() => {
        if (submitForm) {
            const noErrores = Object.keys(errores).length === 0;
            if (noErrores) {
                fn(); // Fn = Funcion que se ejecuta en el componente
                setErrores({});
            }
            setSubmitForm(false)
        }

    }, [submitForm])


    //Funcion que se ejecuta conforme el usuario escribe algo
    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }

    //Funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = async e =>{
        e.preventDefault();
        const erroresValidacion = await validar(valores)
        setErrores(erroresValidacion);
         setSubmitForm(true);
        
    }

    //cuando se realiza el evento de blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores)
        setErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        submitForm,
        handleSubmit,
        handleChange,
        handleBlur
    }
}

export default useValidacion