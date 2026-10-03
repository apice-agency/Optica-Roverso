// STOCK RAY-BAN
// Fotos en: img/rayban/1.png, 2.png, 3.png...
window.STOCK = window.STOCK || {};

window.STOCK["Ray-Ban"] = {
  carpeta: "img/rayban",
  cantidad: 28,            // cuántas fotos hay (1 hasta este número)
  extension: "webp",
  digitos: 1,             // 1 -> 1.png | 3 -> 001.png

  destacados: [1, 2, 3, 4, 5],   // números que salen en el carrusel

  // OPCIONAL: cambiar datos de un lente puntual
  // especiales: { 3: { description: "Texto distinto para el lente 3" } }
};