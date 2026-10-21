// ✅ Ya no hay imports, las funciones vienen de storage.js y ui.js

const formulario = document.querySelector("#formJuego");
const inputNombre = document.querySelector("#nombre");
const inputCategoria = document.querySelector("#categoria");
const inputPrecio = document.querySelector("#precio");
const inputStock = document.querySelector("#stock");
const inputCalificacion = document.querySelector("#calificacion");

const cuerpoTabla = document.querySelector("#tablaJuegos");
const totalJuegos = document.querySelector("#totalJuegos");
const mensaje = document.querySelector("#mensaje");
const btnGuardar = document.querySelector("#btnGuardar");
const btnCancelar = document.querySelector("#btnCancelar");

const buscador = document.querySelector("#buscador");
const filtroCategoria = document.querySelector("#filtroCategoria");

let juegos = cargarJuegos();
let idEnEdicion = null;

function renderizar() {
    let juegosFiltrados = juegos;

    const textoBusqueda = buscador.value.toLowerCase();
    if (textoBusqueda) {
        juegosFiltrados = juegosFiltrados.filter(juego => 
            juego.nombre.toLowerCase().includes(textoBusqueda)
        );
    }

    const categoriaSeleccionada = filtroCategoria.value;
    if (categoriaSeleccionada) {
        juegosFiltrados = juegosFiltrados.filter(juego => 
            juego.categoria === categoriaSeleccionada
        );
    }

    renderizarJuegos(juegosFiltrados, cuerpoTabla);
    totalJuegos.textContent = juegosFiltrados.length; 
}
renderizar();

function validarJuego(juego) {
    if (juego.nombre.length < 2) return "El nombre debe tener mínimo 2 caracteres.";
    if (!juego.categoria) return "Seleccione una categoría.";
    if (!Number.isFinite(juego.precio) || juego.precio < 0) return "El precio no puede ser negativo.";
    if (!Number.isInteger(juego.stock) || juego.stock < 0) return "El stock debe ser un número entero positivo.";
    if (!Number.isInteger(juego.calificacion) || juego.calificacion < 1 || juego.calificacion > 5) {
        return "La calificación debe ser un número entero entre 1 y 5.";
    }
    return null;
}

function crearJuego(datosJuego) {
    const nuevoJuego = { 
        id: Date.now().toString(), 
        ...datosJuego 
    };
    juegos.push(nuevoJuego);
    mostrarMensaje(mensaje, "Videojuego registrado correctamente.");
}

function actualizarJuego(nuevosDatos) {
    juegos = juegos.map((juego) => {
        if (juego.id === idEnEdicion) {
            return { ...juego, ...nuevosDatos };
        }
        return juego;
    });
    mostrarMensaje(mensaje, "Videojuego actualizado.");
}

function prepararEdicion(id) {
    const juego = juegos.find(juego => juego.id === id);
    if (!juego) return;

    inputNombre.value = juego.nombre;
    inputCategoria.value = juego.categoria;
    inputPrecio.value = juego.precio;
    inputStock.value = juego.stock;
    inputCalificacion.value = juego.calificacion;

    idEnEdicion = id;
    btnGuardar.textContent = "Guardar cambios";
    btnCancelar.classList.remove("oculto");
    inputNombre.focus();
}

function eliminarJuego(id) {
    const juego = juegos.find(juego => juego.id === id);
    if (!juego) return;

    const confirmar = confirm(`¿Eliminar "${juego.nombre}"?`);
    if (!confirmar) return;

    juegos = juegos.filter(juego => juego.id !== id);
    guardarJuegos(juegos);
    renderizar();
    mostrarMensaje(mensaje, "Videojuego eliminado.");

    if (idEnEdicion === id) {
        limpiarFormulario();
    }
}

function manejarFormulario(evento) {
    evento.preventDefault();

    const juego = {
        nombre: inputNombre.value.trim(),
        categoria: inputCategoria.value,
        precio: Number(inputPrecio.value),
        stock: Number(inputStock.value),
        calificacion: Number(inputCalificacion.value)
    };

    const error = validarJuego(juego);
    if (error) {
        mostrarMensaje(mensaje, error, "error");
        return;
    }

    if (idEnEdicion === null) {
        crearJuego(juego);
    } else {
        actualizarJuego(juego);
    }

    guardarJuegos(juegos);
    renderizar();
    limpiarFormulario();
}

function manejarAccionesTabla(evento) {
    const boton = evento.target.closest("button[data-accion]");
    if (!boton) return;

    const id = boton.dataset.id;
    const accion = boton.dataset.accion;

    if (accion === "editar") prepararEdicion(id);
    if (accion === "eliminar") eliminarJuego(id);
}

function limpiarFormulario() {
    formulario.reset();
    idEnEdicion = null;
    btnGuardar.textContent = "Agregar videojuego";
    btnCancelar.classList.add("oculto");
    
    buscador.value = "";
    filtroCategoria.value = "";
    renderizar(); 
}

formulario.addEventListener("submit", manejarFormulario);
cuerpoTabla.addEventListener("click", manejarAccionesTabla);
btnCancelar.addEventListener("click", limpiarFormulario);

buscador.addEventListener("input", renderizar);
filtroCategoria.addEventListener("change", renderizar);