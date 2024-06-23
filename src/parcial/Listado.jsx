import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import Formulario from './Formulario';
// Importar funciones correspondientes de parcialSlice
import { editarCarrera } from './parcialSlice';
import { listarCarreras, borrarCarreras } from './parcialSlice';

function Listado() {

  // Completar declaraciones y funciones necesarias para acciones.
  const dispatch = useDispatch();
  const carreras = useSelector((state) => state.carreras.carreras.data);
  const status = useSelector((state) => state.carreras.carreras.status);
  const error = useSelector((state) => state.carreras.carreras.error);
  const enEdicionId = useSelector((state) => state.carreras.carreras.enEdicionId);
  let content = '';

  useEffect(() => {
    if (status == null) {
      dispatch(listarCarreras());
    }
  }, [status, dispatch]);

  const botonEditar = (unaCarrera) => {
    dispatch(editarCarrera(unaCarrera.id));
  };

  const botonAgregar = () => {
    dispatch(editarCarrera(0));
  };

  const botonBorrar = (unaCarrera) => {
    if (window.confirm('¿Estás seguro de borrar este dato?')) {
      dispatch(borrarCarreras(unaCarrera.id));
    }
  };

  return (
    <>
      {
        // Establecer condicional para mostrar el HTML correspondiente
        (status == null || status === 'cargando') &&
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      }
      {
        // Establecer condicional para mostrar el HTML correspondiente
        status === 'error' &&
        <div className="text-danger" role="status">
          Error de carga
        </div>
      }  
      {
        // Establecer condicional para mostrar el HTML correspondiente
        status==='exito' &&
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="text-center">Carrera</th>
                <th scope="col" className="text-center">Lugar</th>
                <th scope="col" className="text-center">Fecha</th>
                <th scope="col" className="text-center">Vueltas</th>
                <th scope="col" className="text-center">Pilotos</th>
                <th scope="col" className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                carreras && carreras.map((carrera, index) => (
                  <tr key={index}>
                    <td className="text-center">{ carrera.nombre }</td>
                    <td className="text-center">{ carrera.lugar }</td>
                    <td className="text-center"><Moment format="DD/MM/YYYY HH:mm:ss" tz="America/Argentina/Buenos_Aires">{ carrera.fecha }</Moment></td>
                    <td className="text-center">{ carrera.vueltas }</td>
                    <td className="text-center">{ carrera.cantidadPilotos }</td>
                    <td className="text-center text-nowrap">
                      <button type="button" className="btn btn-sm btn-primary" onClick={() => botonEditar(carrera)} disabled={enEdicionId!=null}>
                        Editar
                      </button>
                      <button type="button" className="ms-1 btn btn-sm btn-danger" onClick={() => botonBorrar(carrera)} disabled={enEdicionId!=null}>
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <button type="button" className="ms-2 btn btn-sm btn-secondary" onClick={ () => botonAgregar() } disabled={ enEdicionId != null }>
            Agregar carrera
          </button>
        </div>
      }
      {
        // Establecer condicional para mostrar el HTML correspondiente
        enEdicionId != null &&
        <Formulario />
      }
    </>
    );
}

export default Listado;
