import axios from 'axios';
import React,{createContext,useState,useEffect} from 'react';

 //crear el context

 export const CategoriasContext= createContext();

 //provide es donde se encuentras las funciones y state

 const CategoriasProvider= (props)=>{

    //crear el state del context
    const [categorias, guardarCategorias]= useState([]);

    //ejecturar el llamado a la api
    useEffect(()=>{
        const obtenerCategorias = async()=>{
            const url=`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`

            const categorias = await axios.get(url)
            const resultado = categorias.data.drinks
            guardarCategorias(resultado)
        }
        obtenerCategorias()
    },[])

    return(
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )

 }

 export default CategoriasProvider;