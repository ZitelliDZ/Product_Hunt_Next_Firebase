import styled from "@emotion/styled";


const Formulario = styled.form`
    
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;

    fieldset{
        padding: 2rem;
        margin: 1.5rem 0;
        border: 1px solid #575757;
        font-size: 2rem;
        border-radius: 5px;
    }

`;
const Campo = styled.div`
    
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    label {
        flex: 0 0 150px ;
        font-size: 1.8rem;
    }
    input, textarea{
        flex: 1;
        padding: 1rem;
        border: 1px solid #000;
        box-shadow: 0 0 5pt 0.5pt #969696;
        padding: 1rem;
    }
    textarea{
        height: 150px;
    }
    

`;
const InputSubmit = styled.input`
    
    
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #fff;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans',sans-serif;
    font-weight: 700;
    border-radius: 10px;

    &:hover{
        cursor: pointer;
    }
`;


const Error = styled.p`
    
    background-color: #fc3a51;
    border-radius: 5px;
    padding: 1rem;
    font-family: 'PT Sans',sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
    
`;




export {
    Formulario,
    Campo,
    InputSubmit,
    Error
}

export default Formulario;