// Aviso flotante
const toast = document.getElementById("toast");
let temporizadorToast;
function avisar(texto) {
  toast.textContent = texto;
  toast.classList.add("show");
  clearTimeout(temporizadorToast);
  temporizadorToast = setTimeout(() => toast.classList.remove("show"), 2000);
}

// 1) Carrito de compras (contador)
const contador = document.getElementById("count");
let items = 0;
document.querySelectorAll(".add").forEach((boton) => {
  boton.addEventListener("click", () => {
    contador.textContent = ++items;
    avisar(`${boton.dataset.name} agregada al carrito`);
  });
});

// 2) Carrusel de prendas
const productos = document.getElementById("products");
const botonesCarrusel = document.querySelectorAll(".carousel-arrow");
if (productos && botonesCarrusel.length) {
  const botonAnterior = document.querySelector('[data-carousel-direction="prev"]');
  const botonSiguiente = document.querySelector('[data-carousel-direction="next"]');

  function actualizarControlesCarrusel() {
    const maximo = productos.scrollWidth - productos.clientWidth;
    botonAnterior.disabled = productos.scrollLeft <= 1;
    botonSiguiente.disabled = productos.scrollLeft >= maximo - 1;
  }

  botonesCarrusel.forEach((boton) => {
    boton.addEventListener("click", () => {
      const tarjeta = productos.querySelector(".product");
      const espacio = parseFloat(getComputedStyle(productos).columnGap) || 0;
      const distancia = tarjeta.getBoundingClientRect().width + espacio;
      const direccion = boton.dataset.carouselDirection === "next" ? 1 : -1;

      productos.scrollBy({
        left: direccion * distancia,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    });
  });

  productos.addEventListener("scroll", actualizarControlesCarrusel, { passive: true });
  window.addEventListener("resize", actualizarControlesCarrusel);
  actualizarControlesCarrusel();
}

// 3) Cuenta regresiva de la oferta (2 días y 5 horas desde que se abre la página)
const fin = Date.now() + (2 * 24 + 5) * 3600 * 1000;
const pad = (n) => String(n).padStart(2, "0");
function actualizarReloj() {
  const resto = Math.max(0, fin - Date.now());
  document.getElementById("d").textContent = pad(Math.floor(resto / 86400000));
  document.getElementById("h").textContent = pad(Math.floor(resto / 3600000) % 24);
  document.getElementById("m").textContent = pad(Math.floor(resto / 60000) % 60);
  document.getElementById("s").textContent = pad(Math.floor(resto / 1000) % 60);
}
actualizarReloj();
setInterval(actualizarReloj, 1000);

// 4) Menú móvil
const burger = document.querySelector(".burger");
const menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  burger.setAttribute("aria-expanded", menu.classList.toggle("open"));
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
});

// 5) Suscripción con validación simple
document.getElementById("subscribe").addEventListener("click", () => {
  const correo = document.getElementById("email");
  const msg = document.getElementById("msg");
  if (/^\S+@\S+\.\S+$/.test(correo.value)) {
    msg.textContent = "¡Listo! Revisa tu correo para tu cupón del 10%.";
    correo.value = "";
  } else {
    msg.textContent = "nombre@correo.com.";
  }
});

//comentario de prueba