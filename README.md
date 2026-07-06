# Nala's Treats Repostería

Landing page para Nala's Treats, repostería artesanal por encargo en Costa Rica.
Construida con **HTML, CSS y JavaScript puro** (sin frameworks ni librerías).

## Cómo verla

No necesita instalación ni build. Solo abre `index.html` en tu navegador
(doble clic, o clic derecho → "Abrir con" tu navegador).

También puedes usar la extensión **Live Server** de VS Code para recargar
automáticamente mientras editas.

## Estructura del proyecto

```
nala-treats/
├── index.html          Estructura y contenido de la página
├── styles/
│   └── styles.css      Todo el diseño (colores, layout, responsive)
├── scripts/
│   └── main.js         Lógica: menú, año, WhatsApp, productos, galería
├── images/              Logo e imágenes (ver sección de abajo)
└── README.md
```

## Reemplazar las imágenes placeholder

Las imágenes actuales en `images/` son **placeholders en SVG** (gráficos
simples con los colores de la marca), no fotos reales. Cuando tengas fotos
de tus postres:

1. Guarda tus fotos en `images/` (ej. `.jpg` o `.webp`, optimizadas para web).
2. Reemplaza la ruta correspondiente:
   - **Logo**: cambia `src="images/logo.svg"` en `index.html` (2 lugares: el
     `<link rel="icon">` y el `<img>` del header).
   - **Imagen del hero**: `src="images/hero-cake.svg"` en `index.html`.
   - **Productos**: cambia el campo `imagen` de cada objeto en el array
     `productos` dentro de `scripts/main.js` (ver siguiente sección).
   - **Galería**: cambia las rutas en el array `fotosGaleria`, también en
     `scripts/main.js`.

No es necesario que el nombre del archivo sea igual; solo que la ruta en el
código apunte al archivo correcto.

## Cómo funciona el array de productos (`scripts/main.js`)

En vez de escribir 7 cards de producto a mano en el HTML, hay un array de
objetos en JavaScript:

```js
const productos = [
  {
    nombre: "Queques personalizados",
    descripcion: "Diseñados a tu gusto para cumpleaños y celebraciones.",
    imagen: "images/product-queques.svg",
  },
  // ...más productos
];
```

La función `renderProducts()` recorre ese array con `.map()`, y por cada
objeto arma un pedazo de HTML (una card) usando template strings. Al final
junta todos los pedazos con `.join("")` y los inserta de una vez en
`#productsGrid` con `innerHTML`.

**Ventaja para ti:** si quieres agregar, quitar o editar un postre, solo
tocas este array — no tienes que copiar y pegar HTML. Lo mismo aplica para
la galería con el array `fotosGaleria`.

Cada card genera automáticamente su propio link de WhatsApp con el nombre
del producto ya escrito en el mensaje, usando `encodeURIComponent()` para
que el texto se vea bien en la URL.

## Números de WhatsApp

- 6215-6879 (número principal, usado en botones del Hero y productos)
- 6337-3639 (disponible en la sección de Contacto)

Si necesitas cambiar el número principal, edita la constante
`NUMERO_WHATSAPP_PRINCIPAL` en `scripts/main.js`.

## Próximos pasos posibles

- Reemplazar los SVG placeholder por fotos reales.
- Agregar enlaces a Instagram/Facebook en la sección de Contacto.
- Agregar filtros de categoría en Productos (por ejemplo: individuales / para eventos).
