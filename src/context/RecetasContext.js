import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
  const [recetas, guardarRecetas] = useState([]);
  const [busqueda, buscarRecetas] = useState({
    nombre: "",
    categoria: "",
  });
  const [consultar, guardarConsultar] = useState(false);
  //consultar api

  useEffect(() => {
    if (consultar) {
    const obtenerRecetas = async () => {
      
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`;

        const respuesta = await axios.get(url);
        const resultado=respuesta.data.drinks;
        guardarRecetas(resultado)
       
      }
      obtenerRecetas();
      
    };
    
  }, [busqueda,consultar]);

  return (
    <RecetasContext.Provider
      value={{
        recetas,
        buscarRecetas,
        guardarConsultar,
      }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
