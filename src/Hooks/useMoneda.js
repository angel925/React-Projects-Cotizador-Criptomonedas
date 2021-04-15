import React, { Fragment, useState } from "react";
import styled from '@emotion/styled'


const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    letter-spacing: 2px;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display:block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
    align-items: center;
`

const useMoneda = (titulo, stateInicial, opcionesMonedas) => {
  //state de nuestro custom hook
  const [state, actualizarState] = useState("");

  const Seleccionar = () => (
    <Fragment>
      <Label>{titulo}</Label>
      <Select
      
      onChange = {e => actualizarState(e.target.value)}
      value = {state}
      
      >
        <option value="">--Seleccione un Moneda--</option>
        {opcionesMonedas.map(opcion =>(
           <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
        ))}
      </Select>
    </Fragment>
  )
  //retornar state interaz y fun que modifica el state
  return [state, Seleccionar, actualizarState];
};

export default useMoneda;
