import React, {Fragment, useState} from 'react';
// importamos libreria para generar id
import { v4 as uuid } from 'uuid';
// importamos propTypes para documentar los props que le pasamos a los componentes
import PropTypes from 'prop-types'


const Formulario = ({crearCita}) => {

    //Crear el State de Citas
    const [cita, updateCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''

    });

    //Crear el State de error de validacion de formulario
    const [errorForm , updateErrorForm] = useState(false)

    //Funcion que se ejecuta cada vez que escriben en cada imput: usamos event para obtener todo sobre el input en donde se esta ejecutando el listener
    const updateState = e => {
        //Llamaos la funcion que hace los cambios al state updateCita
        updateCita({
            //Hacemos una copia del state para que mantenga los cambios 
            ...cita,
            //Agregamos los datos con event, por esto el name es igual a los elementos del object del state
            [e.target.name]: e.target.value
        })
    }

    //Tomamos los valores del cada elemento y lo colocamos en el value de cada input
    const {mascota, propietario, fecha, hora, sintomas} = cita

    //Creando funcion de submit de formulario de citas
    const submitCita = e => {
        e.preventDefault();
        
        //1.- Validacion - Video 54
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            
            //Modificamos el estado del error o alerta de la validacion
            updateErrorForm(true);
             
            //Este return lo que hace es que nos saca de la funcion de cunplirse esta condicion
            return;
        }

            //Si pasamos la validacion cambiamos el state del error para eliminarlo
            updateErrorForm(false);

        //2.-Asignar un id o key unico usaremos la librerias: uuid o shortid desde npm (npm i uuid)
        cita.id = uuid();
        console.log(cita.id);

        //3.-Crear Cita: la guardamos en un state en el componente APP donde se mostrara
        crearCita(cita)

        //4.-Reiniciar el form: simplemente hacemos un update del estado del form y lo dejamos todo en ''
        updateCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })

    }

    return ( 
        <Fragment>
            {/* Titulo */}
            <h2>Crear Cita</h2>

            {/* Mensaje de Validacion */}
            { errorForm ? <p className="alerta-error">Todos los campos son requeridos</p> : null }

            {/* Formulario */}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota:</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width" 
                    placeholder="Nombre mascota" 
                    onChange={updateState}
                    value={mascota}
                />

                <label>Propietario</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width" 
                    placeholder="Nombre dueño mascota" 
                    onChange={updateState}
                    value={propietario}
                />
                
                <label>Fecha</label>
                <input 
                    type="date" 
                    name="fecha" 
                    className="u-full-width"  
                    onChange={updateState}
                    value={fecha}
                />
                
                <label>Hora</label>
                <input 
                    type="time" 
                    name="hora" 
                    className="u-full-width"  
                    onChange={updateState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    name="sintomas" 
                    className="u-full-width" 
                    onChange={updateState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"  
                >Agregar Cita</button>

            </form>

        </Fragment>
     );
}

//Documentamos los props que le pasamos a este componente
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;