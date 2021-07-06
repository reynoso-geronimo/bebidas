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
  const { nombre, categoria } = busqueda;
  useEffect(() => {
    if (consultar) {
      const obtenerRecetas = async () => {
        const urlC = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoria.replace(
          " ",
          "_"
        )}`;
        const urlI = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre.replace(
          " ",
          "_"
        )}`;
        console.log(busqueda.nombre, busqueda.categoria);

        const respuestaC = await axios.get(urlC);
        const respuestaI = await axios.get(urlI);
        const resultadoC = respuestaC.data.drinks;
        const resultadoI = respuestaI.data.drinks;
        let filtro = [];
        resultadoI.forEach((resultado) => {
          filtro.push(resultado.idDrink);
        });

        let coincidencias = [];

        for (let l = 0; l < filtro.length; l++) {
          for (let i = 0; i < resultadoC.length; i++) {
            if (resultadoC[i].idDrink === filtro[l]) {
              coincidencias.push(resultadoC[i]);
            }
          }
        }

        guardarRecetas(coincidencias);
      };
      obtenerRecetas();
    }
  }, [busqueda, consultar]);

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
