import React from 'react';
import Parcial from './Parcial';
import Enunciado from './Enunciado';
import { Provider } from 'react-redux';
import store from './store';

function App() {

  return (
    <Provider store={store}>
      <main className="container">
        <Enunciado />
        <hr />
        <Parcial />
      </main>
    </Provider>
  );
}

export default App;
