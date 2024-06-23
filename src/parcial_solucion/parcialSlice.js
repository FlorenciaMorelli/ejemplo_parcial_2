import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const listarCarreras = createAsyncThunk('carreras/listarCarreras', async () => {
  const response = await axios.get('http://localhost:3001/carreras');
  return response.data;
});

export const listarPilotos = createAsyncThunk('carreras/listarPilotos', async () => {
  const response = await axios.get('http://localhost:3001/pilotos');
  return response.data;
});

export const detalleCarreras = createAsyncThunk('carreras/detalleCarreras', async (id) => {
  const response = await axios.get(`http://localhost:3001/carreras/${id}`);
  return response.data;
});

export const borrarCarreras = createAsyncThunk('carreras/borrarCarreras', async (id) => {
  const response = await axios.delete(`http://localhost:3001/carreras/${id}`);
  return response.data;
});

export const guardarCarreras = createAsyncThunk('carreras/guardarCarreras', async (carrera) => {
  let response;
  carrera.pilotos = carrera.pilotos.map((pid) => parseInt(pid));
  if (carrera.id==null) {
    response = await axios.post('http://localhost:3001/carreras', carrera);
  } else {
    response = await axios.patch(`http://localhost:3001/carreras/${carrera.id}`, carrera);
  }
  return response.data;
});

const carrerasSlice = createSlice({
  name: 'parcial',
  initialState: {
    carreras: {
      data          : [],
      status        : null,
      error         : null,
      enEdicionId   : null,
      enEdicionObj  : null,
    },
    pilotos: {
      data          : [],
      status        : null,
      error         : null,
    },
  },
  reducers: {
    editarCarrera: (state, action) => {
      state.carreras.enEdicionId = action.payload;
    },
    resetCarrera: (state, action) => {
      state.carreras.enEdicionId = null;
      state.carreras.enEdicionObj = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listarCarreras.pending, (state) => {
        state.carreras.status = 'cargando';
        state.carreras.error = null;
      })
      .addCase(listarCarreras.fulfilled, (state, action) => {
        state.carreras.status = 'exito';
        state.carreras.data = action.payload;
        state.carreras.error = null;
      })
      .addCase(listarCarreras.rejected, (state, action) => {
        state.carreras.status = 'error';
        state.carreras.error = action.error.message;
      })

      .addCase(listarPilotos.pending, (state) => {
        state.pilotos.status = 'cargando';
      })
      .addCase(listarPilotos.fulfilled, (state, action) => {
        state.pilotos.status = 'exito';
        state.pilotos.data = action.payload;
      })
      .addCase(listarPilotos.rejected, (state, action) => {
        state.pilotos.status = 'error';
        state.pilotos.error = action.error.message;
      })

      .addCase(detalleCarreras.pending, (state) => {
        state.carreras.enEdicionObj = null;
        state.carreras.error = null;
      })
      .addCase(detalleCarreras.fulfilled, (state, action) => {
        state.carreras.enEdicionObj = action.payload;
        state.carreras.error = null;
      })
      .addCase(detalleCarreras.rejected, (state, action) => {
        state.carreras.enEdicionId = null;
        state.carreras.enEdicionObj = null;
        state.carreras.status = 'error';
        state.carreras.error = action.error.message;
      })

      .addCase(guardarCarreras.pending, (state) => {
        state.carreras.status = 'cargando';
      })
      .addCase(guardarCarreras.fulfilled, (state, action) => {
        state.carreras.status = null;
      })
      .addCase(guardarCarreras.rejected, (state, action) => {
        state.carreras.status = 'error';
      })

      .addCase(borrarCarreras.pending, (state) => {
        state.carreras.status = 'cargando';
      })
      .addCase(borrarCarreras.fulfilled, (state, action) => {
        state.carreras.status = null;
      })
      .addCase(borrarCarreras.rejected, (state, action) => {
        state.carreras.status = 'error';
      })
      ;
  },
});

export const { editarCarrera, resetCarrera } = carrerasSlice.actions;
export default carrerasSlice.reducer;