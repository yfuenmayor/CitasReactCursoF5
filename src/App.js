import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'


function App() {

    //Tomando citas iniciales del LocalStorage
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
      //condicionamos por si no hay citas para generar un array vacio
      if (!citasIniciales) {
        citasIniciales = [];
      }

    //State de listado de Citas
    const [listadoCitas, setlistadoCitas] = useState(citasIniciales);


     // useEffect para realizar ciertas operaciones cuando el state cambia
      // Lo usamos para agregar o quitar del localStorage
      useEffect( () => {

          let citasIniciales = JSON.parse(localStorage.getItem('citas'));


          if (citasIniciales) {
              localStorage.setItem('citas', JSON.stringify(listadoCitas))
            } else {
              localStorage.setItem('citas', JSON.stringify([]))
          }
          
      }, [listadoCitas]);

      
    //Funcion para tomar las citas actuales y agregue una nueva
    const crearCita = citaNew => { 
        //usamos la funcion que actualiza el state del listado de citas para mostrar
        setlistadoCitas([
          //obtenemos una copia del listado para no sobreescribir
          ...listadoCitas,
          //insertamos la cita nueva al state
          citaNew
        ])
     };


     //Funcion que elimina las citas del state del listado
     const eliminarCita = id => { 
            //obtenemos todos menos el seleccionado
            const citas = listadoCitas.filter( cita => cita.id !== id);
            //los agregamos al state
            setlistadoCitas(citas);
      };

      //Creamos un titulo dependiendo de si tenemos citas o no
      const titulo = listadoCitas.length === 0 ? 'No hay citas pautadas' : 'Administra tus Citas' ;


  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
          <div className="row">
              <div className="one-half column">
                <Formulario
                  //Pasamos funcion para agregar cita a APP 
                  crearCita = {crearCita}
                />
              </div>
              <div className="one-half column">
                  <h2>{titulo}</h2>
                  {listadoCitas.map(cita => (
                    <Cita 
                        //siempre pasamos un key
                        key = {cita.id}
                        cita = {cita}
                        eliminarCita = {eliminarCita}
                    />
                  ))}
              </div>
          </div>
      </div>
    </Fragment>
  );
}

export default App;
