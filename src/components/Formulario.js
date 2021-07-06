import React,{useContext,useState} from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {
    const [busqueda,guardarBusqueda]=useState({
        nombre:'',
        categoria:'',

    })
    const {categorias} = useContext(CategoriasContext);
    const {buscarRecetas, guardarConsultar} = useContext(RecetasContext)

    const obtenerDatosBusqueda=e=>{
        guardarBusqueda({
            ...busqueda,
            [e.target.name]:e.target.value
        })
    }
    return ( 
        <form
            className='col-12'
            onSubmit={e=>{
                e.preventDefault()
                buscarRecetas(busqueda)
                guardarConsultar(true);
            }}
        >
            <fieldset className='text-center'>
                <legend>Busca bebidas por Categoria o Ingrediente</legend>
            </fieldset>
            <div className='row mt-4'>
                <div className='col-md-4'>
                    <input
                        name='nombre'
                        className='form-control'
                        type='text'
                        placeholder='Buscar por ingrediente'
                        onChange={obtenerDatosBusqueda}
                    />
                    
                </div>
                <div className='col-md-4'>
                    <select
                        className='form-control'
                        name='categoria'
                        onChange={obtenerDatosBusqueda}
                    >
                        <option value=''>--Seleccione Categoria--</option>
                        {categorias.map(categoria=>(
                            <option
                                value={categoria.strCategory}
                                key={categoria.strCategory}
                            >{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className='col-md-4'>
                    <input
                        type='submit'
                        className='btn btn-block btn-primary'
                        value='Buscar Recetas'
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;