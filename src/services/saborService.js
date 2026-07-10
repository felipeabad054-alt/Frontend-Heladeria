import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const saboresApi = axios.create({
  baseURL: `${API_URL}/sabores`,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function obtenerSabores() {
  const respuesta = await saboresApi.get("/");
  return respuesta.data;
}

export async function obtenerSaborPorId(id) {
  const respuesta = await saboresApi.get(`/${id}`);
  return respuesta.data;
}

export async function crearSabor(sabor) {
  const respuesta = await saboresApi.post("/", sabor);
  return respuesta.data;
}

export async function actualizarSabor(id, sabor) {
  const respuesta = await saboresApi.put(`/${id}`, sabor);
  return respuesta.data;
}

export async function eliminarSabor(id) {
  const respuesta = await saboresApi.delete(`/${id}`);
  return respuesta.data;
}