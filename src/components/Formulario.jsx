import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useMoneda from "../Hooks/useMoneda";
import useCriptomoneda from "../Hooks/useCriptomeda";
import axios from "axios";
import Error from './Error'

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #fa7676;
  border: 4px solid #b53330;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f06666;
    cursor: pointer;
  }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {
  //state para almacenar el resultado de la api de la data de criptomonedas

  const [listacripto, guardarCriptomonedas] = useState([]);
// validar el formulario 

  const [error, guardarError] = useState(false);
  
  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
    { codigo: "COP", nombre: "Peso Colombiano" }
  ];

  // utiizar el useMoneda, y son los valores que se le pasan al hook creado
  const [moneda, SelectMonedas] = useMoneda("Elige tu moneda", "", MONEDAS);

  //utilizamos useCriptomonedas, donde se llenan los datos que le vamos a pasar a useCriptomonedas
  const [criptomoneda, SelecCripto] = useCriptomoneda(
    "Elige tu Criptomeda",
    "",
    listacripto
  );

  useEffect(() => {
    const consultarAPI = async () => {
      //guardamos la urll en una variable
      const URL =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      // axios nos toma con get el objeto que se consulto.json y lo guerda en resultado
      const resultado = await axios.get(URL);

      guardarCriptomonedas(resultado.data.Data);
    };

    consultarAPI();
  }, []);

  // cuando el usuario hace submit o le da calcular
  const cotizarMoneda = e => {
    e.preventDefault();

    /* if campos vacios, estos campos vienen de los useMoneda y useCriptomoneda
    y por eso los podemos utilizar en el if */ 
    if(moneda === '' || criptomoneda === ''){

      guardarError(true);
      return;
    }

    // pasar los datos al componente principal
    guardarError(false);
   // estos valores vienen del custom hook que se creo para la api y lo tomamos una vez 
   // el usuario le da calcular    
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);

  }

  return (
    <form
    onSubmit = {cotizarMoneda}

    >
      {/* en caso de que se detecte un error */}
      {error ? <Error mensaje = '¡Todos los campos son requeridos!'/>: null}

      {/* Se pinta interfaz desde el hook useMoneda la funcion SelectMonedas */}
      <SelectMonedas />

      {/* Se pinta interfaz desde el hook useCriptomoneda la funcion SelecCripto */}
      <SelecCripto />

      <Boton 
      type="submit" 
      value="Calcular" />
    </form>
  );
};

export default Formulario;
