// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import carrerasReducer from './parcial/parcialSlice';

const store = configureStore({
  reducer: {
    carreras: carrerasReducer,
  },
});

export default store;
