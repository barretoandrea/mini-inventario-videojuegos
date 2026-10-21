const CLAVE = "inventarioVideojuegos";

function cargarJuegos() {
    const datos = localStorage.getItem(CLAVE);
    if (!datos) {
        return [];
    }
    try {
        return JSON.parse(datos);
    } catch (error) {
        console.error("No fue posible leer los datos:", error);
        return [];
    }
}

function guardarJuegos(juegos) {
    const datosJSON = JSON.stringify(juegos);
    localStorage.setItem(CLAVE, datosJSON);
}