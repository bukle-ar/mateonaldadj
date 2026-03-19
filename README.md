# Mateo Nalda — DJ Website

## Estructura del proyecto

```
mateo-nalda/
├── index.html              ← Página principal
├── css/
│   └── styles.css          ← Todos los estilos
├── js/
│   └── main.js             ← Toda la lógica (carrusel, modal, venues, etc.)
├── img/
│   ├── slide-01.jpg        ← Fotos del carrusel hero (1600x900px recomendado)
│   ├── slide-02.jpg
│   ├── slide-03.jpg
│   ├── slide-04.jpg
│   ├── slide-05.jpg
│   └── gallery/
│       ├── gallery-01.jpg  ← Fotos de la galería en Trayectoria (600x450px)
│       ├── gallery-02.jpg
│       ├── gallery-03.jpg
│       ├── gallery-04.jpg
│       ├── gallery-05.jpg
│       └── gallery-06.jpg
└── README.md
```

## Configuración rápida

### 1. Imágenes
Colocar las fotos en la carpeta `img/` respetando los nombres que ya están
referenciados en el HTML. Si faltan fotos, se muestra un placeholder automático.

### 2. Links de redes y WhatsApp
Editar en dos lugares:
- **`index.html`** — Los `href` de los links de Instagram y WhatsApp
- **`js/main.js`** — El objeto `CONFIG` al inicio del archivo (para venues y datos futuros)

### 3. Venues / Cabinas
Editar el array `CONFIG.venues` en `js/main.js`. Cada venue tiene `name` y `location`.

### 4. Textos del Presskit
Editar directamente en el HTML dentro de la sección `<div class="presskit">`.

## Seguridad implementada
- `escapeHTML()` para sanitizar contenido dinámico (prevención de XSS)
- `rel="noopener noreferrer"` en todos los links externos
- Meta headers de seguridad (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)
- Sin dependencias externas de JS (solo Google Fonts para tipografía)
- Datos centralizados en `CONFIG` para facilitar futura conexión a panel admin / API

## Stack
- HTML5 semántico
- CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (ES6+, IIFE, Intersection Observer)
- Google Fonts: Cormorant Garamond + Outfit
- Zero dependencias JS
