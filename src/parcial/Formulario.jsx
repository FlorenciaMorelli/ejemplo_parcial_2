import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detalleCarreras, listarPilotos, guardarCarreras } from './parcialSlice';
import { resetCarrera } from './parcialSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from 'moment-timezone';

const schema = yup.object().shape({
  id: yup.number(),
  nombre: yup.string().required('El nombre es obligatorio.'),
  lugar: yup.string().required('El lugar es obligatorio.'),
  fecha: yup.date().required('La fecha es obligatorio.'),
  vueltas: yup.number().required('Vueltas es obligatorio.').min(1),
  pilotos: yup.array().min(1, 'Debe seleccionar al menos un piloto.'),
});

function Formulario () {
  const { register, handleSubmit, setValue, formState: { isValid }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const enEdicionId = useSelector((state) => state.carreras.carreras.enEdicionId);
  const unaCarrera = useSelector((state) => state.carreras.carreras.enEdicionObj);
  const pilotos = useSelector((state) => state.carreras.pilotos.data);
  const statusPilotos = useSelector((state) => state.carreras.pilotos.status);
  const statusCarrera = useSelector((state) => state.carreras.carreras.status);

  useEffect(() => {
    if (enEdicionId != null && enEdicionId !== 0) {
      dispatch(detalleCarreras(enEdicionId));
    }
  }, [dispatch, enEdicionId]);

  useEffect(() => {
    dispatch(listarPilotos());
  }, [dispatch]);

  useEffect(() => {
    if(unaCarrera){
      let fechaCarrera = moment.tz(unaCarrera.fecha, "America/Argentina/Buenos_Aires");
      setValue('id', unaCarrera.id);
      setValue('nombre', unaCarrera.nombre);
      setValue('lugar', unaCarrera.lugar);
      setValue('fecha', fechaCarrera.format('YYYY-MM-DDTHH:mm'));
      setValue('vueltas', unaCarrera.vueltas);
      setValue('pilotos', unaCarrera.pilotos.map(piloto => piloto.id.toString()));
    }
  }, [unaCarrera, setValue]);

  const resetForm = () => {
    reset({
      id: null,
      nombre: '',
      lugar: '',
      fecha: '',
      vueltas: '',
      pilotos: []
    });
    dispatch(resetCarrera());
  }

  const enviar = (data) => {
    dispatch(guardarCarreras(data));
    resetForm()
  }

  return (
    <>
      { // Establecer condicional para mostrar el HTML correspondiente
        statusCarrera === 'cargando' &&
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      }
      { // Establecer condicional para mostrar el HTML correspondiente
        statusCarrera === 'error' &&
        <div className="text-danger" role="status">
          Error de carga
        </div>
      }
      { // Establecer condicional para mostrar el HTML correspondiente
        statusCarrera === 'exito' && statusPilotos === 'exito' &&
        <div>
          <form onSubmit={handleSubmit(enviar)}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre de la carrera</label>
              <input type="text" className="form-control" id="nombre" {...register("nombre")} />
            </div>
            <div className="mb-3">
              <label htmlFor="lugar" className="form-label">Lugar</label>
              <input type="text" className="form-control" id="lugar" {...register("lugar")} />
            </div>
            <div className="mb-3">
              <label htmlFor="fecha" className="form-label">Fecha y hora</label>
              <input type="datetime-local" className="form-control" id="fecha" {...register("fecha", { valueAsDate: true })} />
            </div>
            <div className="mb-3">
              <label htmlFor="vueltas" className="form-label">Vueltas</label>
              <input type="number" min="1" className="form-control" id="vueltas" {...register("vueltas")} />
            </div>
            <div className="mb-3">
              <label htmlFor="pilotos" className="form-label">Pilotos</label>
              {pilotos && (
                <select multiple className="form-control" id="pilotos" {...register("pilotos")}>
                  {pilotos.map(opcion => (
                    <option key={opcion.id} value={opcion.id}>
                      {opcion.nombre}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <button type="submit" className="btn btn-primary" disabled={!isValid}>Guardar</button>
            <button type="reset" className="ms-1 btn btn-secondary" onClick={resetForm}>Descartar</button>
          </form>
        </div>
      }
    </>
  );
}

export default Formulario;
