import React,{useContext,useState} from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      [theme.breakpoints.down('sm')]: {
        width: '100%',  
      },
      [theme.breakpoints.up('sm')]: {
        width: 450,  
      },
      maxWidth:320,
      maxHeight: 480,
      overflowY: 'auto',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    //alguna configuracion del modal de material ui

    const [ ModalStyle] = useState(getModalStyle);
    const [open,setOpen] = useState(false)

    const classes= useStyles();

    const handleOpen=()=>{
        setOpen(true)

    }
    const handleClose=()=>{
        setOpen(false);
    }

    const mostrarIngredientes= informacion=>{
        let ingredientes= [];
        for(let i = 1; i<16; i++){
            if(informacion[`strIngredient${i}`]){
                ingredientes.push(
                    <li>{informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes;
    }

    const {informacion, guardarIdReceta, guardarReceta}=useContext(ModalContext);
    return (
        <div className='col-md-4 mb-3'>
            <div className='card'>
                <h2 className='card-header'>{receta.strDrink}</h2>
                <img className='card-img-top'src={receta.strDrinkThumb}alt={`imagen de ${receta.strDrink}`}/>
                <div className='card-body'>
                    <button
                        type='button'
                        className='btn btn-block btn-primary'
                        onClick={()=>{guardarIdReceta(receta.idDrink)
                        handleOpen()
                        }}
                    >
                        Ver Receta
                    </button>
                    <Modal
                        open={open}
                        onClose={()=>{
                            guardarReceta({})
                            guardarIdReceta(null)
                            handleClose();
                        }}

                    >
                        <div style={ModalStyle} className={classes.paper}>
                            <h2>{informacion.strDrink}</h2>
                            <h3 className='mt-4'>Instrucciones</h3>
                            <p>
                                {informacion.strInstructions}
                            </p>
                            <img className='img-fluid my-4 'src={informacion.strDrinkThumb}alt={informacion.strDrink}/>
                            <h3> Ingredientes y Cantidades</h3>
                            <ul>
                                {mostrarIngredientes(informacion)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
        );
}
 
export default Receta;