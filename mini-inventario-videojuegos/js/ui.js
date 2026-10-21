function crearCelda(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function renderizarJuegos(juegos, cuerpoTabla) {
    cuerpoTabla.textContent = ""; 

    if (juegos.length === 0) {
        const fila = document.createElement("tr");
        const celda = document.createElement("td");
        celda.colSpan = 6;
        celda.textContent = "No se encontraron videojuegos.";
        fila.appendChild(celda);
        cuerpoTabla.appendChild(fila);
        return;
    }

    juegos.forEach((juego) => {
        const fila = document.createElement("tr");
        
        fila.appendChild(crearCelda(juego.nombre));
        fila.appendChild(crearCelda(juego.categoria));
        
        const precioFormateado = new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP"
        }).format(juego.precio);
        
        fila.appendChild(crearCelda(precioFormateado));
        fila.appendChild(crearCelda(juego.stock));
        fila.appendChild(crearCelda(juego.calificacion));

        const celdaAcciones = document.createElement("td");
        const contenedor = document.createElement("div");
        contenedor.classList.add("acciones");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("editar");
        btnEditar.dataset.accion = "editar";
        btnEditar.dataset.id = juego.id;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("eliminar");
        btnEliminar.dataset.accion = "eliminar";
        btnEliminar.dataset.id = juego.id;

        contenedor.append(btnEditar, btnEliminar);
        celdaAcciones.appendChild(contenedor);
        fila.appendChild(celdaAcciones);

        cuerpoTabla.appendChild(fila);
    });
}

function mostrarMensaje(elemento, texto, tipo = "ok") {
    elemento.textContent = texto;
    elemento.className = tipo === "error" ? "mensaje-error" : "mensaje-ok";
    
    setTimeout(() => {
        elemento.textContent = "";
        elemento.className = "";
    }, 3000);
}