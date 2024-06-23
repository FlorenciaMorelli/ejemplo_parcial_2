import React, { useState } from 'react';

function Enunciado()
{
  const [visible, setVisible] = useState(true);

  return (
      <>
        <h1>Parcial de frontend</h1>
        {
          visible==true && 
          <div className="">
            Completar el código funcional del front end del siguiente proyecto.
            <ul>
              <li>Instalar las dependencias con <code>npm install</code></li>
              <li>Iniciar el servidor de back end:
              <code>
                <br />cd api
                <br />node api.js
              </code>
              </li>
              <li>Iniciar el servidor de front end con <code>npm start</code></li>
            </ul>
            Dentro de la carpeta "src/parcial" se encuentran los componentes <strong>Listado</strong> y <strong>Formulario</strong>.
            El componente <strong>Listado</strong> contiene un listado de Carreras. En este componente debe hacerse lo siguiente:
            <ol>
              <li>Listar las carreas del back: <code className="text-primary">GET http://localhost:3001/carreras</code></li>
              <li>Implementar el botón "Agregar" que debe mostrar el formulario vacío, listo para crear una nueva Carrera</li>
              <li>Implementar el botón "Borrar" que debe llamar a <code className="text-primary">DELETE http://localhost:3001/carreras/<i className="text-secondary">:id</i></code></li>
              <li>Implementar el botón "Editar" que debe leer del back end el detalle de la carrra correspondiente mediante <code className="text-primary">GET http://localhost:3001/carreras/<i className="text-secondary">:id</i></code> y pasarlo al formulario</li>
            </ol>
            En el componente <strong>Formulario</strong> contiene el formulario y los controles para crear/editar carreras. En este control debe hacerse lo siguiente:
            <ol>
              <li>Incorporar las validaciones de cada campo, según corresponda (el campo "pilotos" debe ser array de al menos 1 elemento).</li>
              <li>Implementar botón "Guardar" que debe guardar los datos aplicando POST o PATCH según corresponda a creación o edición respectivamente, usando el recurso de API <code className="text-primary">POST http://localhost:3001/carreras</code> o <code className="text-primary">PATCH http://localhost:3001/carreras/<i className="text-secondary">:id</i></code></li>
              <li>Implementar el botón "Descartar" que vaciar los datos del formulario</li>
            </ol>
            Dentro de la carpeta <code>api</code> se encuentra el archivo <code>Ejercicio.postman_collection.json</code> en el cual se encuentran los formatos de datos necesarios para POST y PATH (en los respectvos "body" de cada petición). También puede utilizarse para observar los formatos de datos retornados por la API.
            Al finalizar, comprimir la carpeta "parcial" (asegurarse de que estén los componentes Listado y Formulario) y adjuntarla en el link correspondiente del classroom.
          </div>
        }
        <button type="button" className="btn btn-info btn-sm" onClick={() => setVisible(!visible)}>{ visible ? 'Ocultar' : 'Mostrar'}</button>
      </>
    );
}

export default Enunciado;