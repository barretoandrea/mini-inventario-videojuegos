# Mini Inventario de Videojuegos

##  Nombre del Proyecto
Mini Inventario de Videojuegos - CRUD Frontend con Persistencia Local.

##  Objetivo
Desarrollar una aplicación web frontend que permita registrar, visualizar, editar y eliminar videojuegos, aplicando la manipulación del DOM, el manejo de eventos, la validación de formularios y la persistencia de datos mediante LocalStorage, sin necesidad de un servidor backend.

## Tecnologías Utilizadas
*   HTML5: Estructura del formulario y la tabla.
*   CSS3: Estilos visuales, diseño responsivo y de tarjetas.
*   JavaScript (ES6+): Lógica del CRUD, validaciones y manipulación de arreglos.
*   DOM API: Selección y creación dinámica de elementos (`querySelector`, `createElement`).
*   LocalStorage: Almacenamiento persistente en el navegador.
*   JSON: Serialización de datos (`JSON.stringify` y `JSON.parse`).

## Estructura de Archivos

mini-inventario-videojuegos/
│
├── index.html          → Estructura de la interfaz.
├── css/
│   └── styles.css      → Hoja de estilos.
└── js/
    ├── app.js          → Coordinador: eventos, validaciones y CRUD.
    ├── storage.js      → Módulo de lectura/escritura en LocalStorage.
    └── ui.js           → Renderizado de la tabla y mensajes.