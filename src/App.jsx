import { useEffect, useState } from "react";
import {
  actualizarSabor,
  crearSabor,
  eliminarSabor,
  obtenerSabores,
} from "./services/saborService";
import "./App.css";
const S3_IMAGE_URL =
  import.meta.env.VITE_S3_IMAGE_URL ||
  "https://helado-bucket.s3.us-east-2.amazonaws.com/Helado%20Insano.png";

const formularioInicial = {
  nombre: "",
  precio: "",
  stock: "",
  descripcion: "",
};

function App() {
  const [sabores, setSabores] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [idEditando, setIdEditando] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  useEffect(() => {
    cargarSabores();
  }, []);

  async function cargarSabores() {
    try {
      setCargando(true);

      const datos = await obtenerSabores();
      setSabores(datos);
    } catch (error) {
      mostrarError(
        error.response?.data?.mensaje ||
          "No se pudieron cargar los sabores."
      );
    } finally {
      setCargando(false);
    }
  }

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((formularioAnterior) => ({
      ...formularioAnterior,
      [name]: value,
    }));
  }

  function validarFormulario() {
    if (!formulario.nombre.trim()) {
      mostrarError("El nombre del sabor es obligatorio.");
      return false;
    }

    if (formulario.precio === "" || Number(formulario.precio) < 0) {
      mostrarError("Ingrese un precio válido.");
      return false;
    }

    if (
      formulario.stock === "" ||
      Number(formulario.stock) < 0 ||
      !Number.isInteger(Number(formulario.stock))
    ) {
      mostrarError("Ingrese un stock entero válido.");
      return false;
    }

    return true;
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const datosSabor = {
      nombre: formulario.nombre.trim(),
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      descripcion: formulario.descripcion.trim(),
    };

    try {
      setGuardando(true);

      if (idEditando !== null) {
        await actualizarSabor(idEditando, datosSabor);
        mostrarExito("Sabor actualizado correctamente.");
      } else {
        await crearSabor(datosSabor);
        mostrarExito("Sabor creado correctamente.");
      }

      limpiarFormulario();
      await cargarSabores();
    } catch (error) {
      mostrarError(
        error.response?.data?.mensaje ||
          "No se pudo guardar el sabor."
      );
    } finally {
      setGuardando(false);
    }
  }

  function seleccionarParaEditar(sabor) {
    setIdEditando(sabor.id);

    setFormulario({
      nombre: sabor.nombre,
      precio: sabor.precio,
      stock: sabor.stock,
      descripcion: sabor.descripcion || "",
    });

    setMensaje("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function manejarEliminacion(sabor) {
    const confirmado = window.confirm(
      `¿Está seguro de eliminar el sabor "${sabor.nombre}"?`
    );

    if (!confirmado) {
      return;
    }

    try {
      await eliminarSabor(sabor.id);
      mostrarExito("Sabor eliminado correctamente.");

      if (idEditando === sabor.id) {
        limpiarFormulario();
      }

      await cargarSabores();
    } catch (error) {
      mostrarError(
        error.response?.data?.mensaje ||
          "No se pudo eliminar el sabor."
      );
    }
  }

  function limpiarFormulario() {
    setFormulario(formularioInicial);
    setIdEditando(null);
  }

  function cancelarEdicion() {
    limpiarFormulario();
    setMensaje("");
  }

  function mostrarExito(texto) {
    setTipoMensaje("success");
    setMensaje(texto);
  }

  function mostrarError(texto) {
    setTipoMensaje("danger");
    setMensaje(texto);
  }

  return (
    <div className="min-vh-100 bg-light">
      <header className="encabezado-heladeria py-4 mb-4">
        <div className="container">
          <h1 className="mb-1">🍦 Heladería Dulce Sabor de  la Tentaciòn</h1>
          <p className="mb-0">
            Sistema de Helados HOT
            <img
              src={S3_IMAGE_URL}
              alt="Helado Insano"
              className="imagen-helado-s3"
            />
          </p>
        </div>
      </header>

      <main className="container pb-5">
        {mensaje && (
          <div
            className={`alert alert-${tipoMensaje} alert-dismissible fade show`}
            role="alert"
          >
            {mensaje}

            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={() => setMensaje("")}
            />
          </div>
        )}

        <div className="row g-4">
          <div className="col-lg-4">
            <section className="card shadow-sm border-0">
              <div className="card-body">
                <h2 className="h4 mb-3">
                  {idEditando !== null
                    ? "Editar sabor"
                    : "Nuevo sabor"}
                </h2>

                <form onSubmit={manejarEnvio}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre
                    </label>

                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="form-control"
                      value={formulario.nombre}
                      onChange={manejarCambio}
                      maxLength="100"
                      placeholder="Ejemplo: Chocolate"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="precio" className="form-label">
                      Precio
                    </label>

                    <input
                      type="number"
                      id="precio"
                      name="precio"
                      className="form-control"
                      value={formulario.precio}
                      onChange={manejarCambio}
                      min="0"
                      step="0.01"
                      placeholder="Ejemplo: 2.50"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="stock" className="form-label">
                      Stock
                    </label>

                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      className="form-control"
                      value={formulario.stock}
                      onChange={manejarCambio}
                      min="0"
                      step="1"
                      placeholder="Ejemplo: 20"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="descripcion"
                      className="form-label"
                    >
                      Descripción
                    </label>

                    <textarea
                      id="descripcion"
                      name="descripcion"
                      className="form-control"
                      value={formulario.descripcion}
                      onChange={manejarCambio}
                      rows="3"
                      placeholder="Descripción del sabor"
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={guardando}
                    >
                      {guardando
                        ? "Guardando..."
                        : idEditando !== null
                          ? "Actualizar sabor"
                          : "Guardar sabor"}
                    </button>

                    {idEditando !== null && (
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={cancelarEdicion}
                        disabled={guardando}
                      >
                        Cancelar edición
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </section>
          </div>

          <div className="col-lg-8">
            <section className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h4 mb-0">Sabores disponibles</h2>

                  <span className="badge text-bg-primary">
                    {sabores.length} sabores
                  </span>
                </div>

                {cargando ? (
                  <div className="text-center py-5">
                    <div
                      className="spinner-border"
                      role="status"
                    >
                      <span className="visually-hidden">
                        Cargando...
                      </span>
                    </div>

                    <p className="mt-3 mb-0">
                      Cargando sabores...
                    </p>
                  </div>
                ) : sabores.length === 0 ? (
                  <div className="alert alert-info">
                    No hay sabores registrados.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-dark">
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Stock</th>
                          <th>Descripción</th>
                          <th className="text-center">Acciones</th>
                        </tr>
                      </thead>

                      <tbody>
                        {sabores.map((sabor) => (
                          <tr key={sabor.id}>
                            <td>{sabor.id}</td>
                            <td className="fw-semibold">
                              {sabor.nombre}
                            </td>
                            <td>
                              ${Number(sabor.precio).toFixed(2)}
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  sabor.stock > 0
                                    ? "text-bg-success"
                                    : "text-bg-danger"
                                }`}
                              >
                                {sabor.stock}
                              </span>
                            </td>
                            <td>{sabor.descripcion || "Sin descripción"}</td>
                            <td>
                              <div className="d-flex gap-2 justify-content-center">
                                <button
                                  type="button"
                                  className="btn btn-warning btn-sm"
                                  onClick={() =>
                                    seleccionarParaEditar(sabor)
                                  }
                                >
                                  Editar
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    manejarEliminacion(sabor)
                                  }
                                >
                                  Eliminar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;