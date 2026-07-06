/* =========================================================
   NALA'S TREATS — main.js
   Todo el JavaScript de la página vive aquí, dividido por
   responsabilidad. Cada bloque hace UNA cosa.
   ========================================================= */

/* ---------------------------------------------------------
   1) DATOS DE PRODUCTOS
   Un array de objetos: cada objeto es un postre con la
   información que necesitamos para dibujar su card.
   Si mañana agregas o quitas un postre, solo tocas ESTE array;
   el HTML se genera solo (ver renderProducts()).
   --------------------------------------------------------- */
const productos = [
  {
    nombre: "Queques personalizados",
    descripcion: "Diseñados a tu gusto para cumpleaños y celebraciones.",
    imagen: "images/product-queques.svg",
  },
  {
    nombre: "Cupcakes",
    descripcion: "Individuales, suaves y decorados con detalle.",
    imagen: "images/product-cupcakes.svg",
  },
  {
    nombre: "Brownies",
    descripcion: "Densos, achocolatados y hechos con amor.",
    imagen: "images/product-brownies.svg",
  },
  {
    nombre: "Cheesecakes",
    descripcion: "Cremosos, en versión clásica o con frutas.",
    imagen: "images/product-cheesecakes.svg",
  },
  {
    nombre: "Tres leches",
    descripcion: "Húmedo y suave, el favorito de siempre.",
    imagen: "images/product-tresleches.svg",
  },
  {
    nombre: "Galletas decoradas",
    descripcion: "Ideales para regalar o compartir en cualquier evento.",
    imagen: "images/product-galletas.svg",
  },
  {
    nombre: "Postres para eventos",
    descripcion: "Mesas dulces y cantidades grandes para tu celebración.",
    imagen: "images/product-eventos.svg",
  },
];

const NUMERO_WHATSAPP_PRINCIPAL = "50662156879";

/* ---------------------------------------------------------
   2) RENDERIZAR PRODUCTOS
   Recorremos el array "productos" y por cada uno construimos
   una card de HTML con template strings. Al final insertamos
   todo de una sola vez en #productsGrid (más eficiente que
   insertar de a uno).
   --------------------------------------------------------- */
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const tarjetasHTML = productos
    .map((producto) => {
      const mensaje = encodeURIComponent(
        `Hola Nala's Treats, quiero consultar por: ${producto.nombre}`
      );
      const linkWhatsapp = `https://wa.me/${NUMERO_WHATSAPP_PRINCIPAL}?text=${mensaje}`;

      return `
        <article class="product-card">
          <img
            src="${producto.imagen}"
            alt="${producto.nombre}"
            loading="lazy"
            width="400"
            height="300"
          >
          <div class="product-card-body">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <a
              href="${linkWhatsapp}"
              class="btn-outline-small"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </article>
      `;
    })
    .join("");

  grid.innerHTML = tarjetasHTML;
}

/* ---------------------------------------------------------
   3) RENDERIZAR GALERÍA
   Lo mismo que arriba pero para las fotos de la galería.
   Aquí solo usamos un array simple de rutas de imagen.
   --------------------------------------------------------- */
const fotosGaleria = [
  "images/gallery-1.svg",
  "images/gallery-2.svg",
  "images/gallery-3.svg",
  "images/gallery-4.svg",
  "images/gallery-5.svg",
  "images/gallery-6.svg",
];

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  const imagenesHTML = fotosGaleria
    .map(
      (ruta, index) => `
        <img
          src="${ruta}"
          alt="Postre artesanal de Nala's Treats, foto ${index + 1}"
          loading="lazy"
          width="300"
          height="300"
        >
      `
    )
    .join("");

  grid.innerHTML = imagenesHTML;
}

/* ---------------------------------------------------------
   4) MENÚ HAMBURGUESA (accesible)
   - Alterna la clase "is-open" en el <nav>.
   - Actualiza aria-expanded para lectores de pantalla.
   - Cierra el menú con la tecla Escape.
   - Cierra el menú al hacer clic en un link (mobile).
   --------------------------------------------------------- */
function initNavToggle() {
  const toggleBtn = document.getElementById("navToggle");
  const nav = document.getElementById("primaryNav");
  if (!toggleBtn || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    const estaAbierto = nav.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(estaAbierto));
  };

  toggleBtn.addEventListener("click", toggleMenu);

  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") closeMenu();
  });
}

/* ---------------------------------------------------------
   5) AÑO ACTUAL EN EL FOOTER
   --------------------------------------------------------- */
function renderCurrentYear() {
  const anioSpan = document.getElementById("currentYear");
  if (!anioSpan) return;
  anioSpan.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   6) ANIMACIÓN SUAVE AL HACER SCROLL
   Usamos IntersectionObserver: el navegador nos avisa cuando
   una card entra en pantalla y ahí le agregamos la clase
   "is-visible" (la transición está definida en el CSS).
   --------------------------------------------------------- */
function initScrollReveal() {
  const tarjetas = document.querySelectorAll(".product-card");
  if (!tarjetas.length) return;

  const observer = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");
          obs.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  tarjetas.forEach((tarjeta) => observer.observe(tarjeta));
}

/* ---------------------------------------------------------
   INICIALIZACIÓN
   Esperamos a que el DOM esté listo y ejecutamos todo.
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderGallery();
  initNavToggle();
  renderCurrentYear();
  initScrollReveal();
});
