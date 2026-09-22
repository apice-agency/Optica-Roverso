
const WHATSAPP_NUMBER = "5491100000000";

// LISTADO DE MARCAS DISPONIBLES
const BRANDS = ["Ray-Ban", "Oakley", "Prada", "Vogue", "Gucci", "Tom Ford"];

// FOTOS DE MUESTRA PARA LOS PRODUCTOS
const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=80"
];

// GENERAR MÁS DE 100 MODELOS
const products = [
    {
    id: 1,
    brand: "Ray-Ban",
    image: "img/rayban/1.webp", // O ruta local: "img/rayban-aviator.jpg"
    description: "Marco metálico en tono dorado con cristales verdes G-15 de alta protección UV.",
    featured: true // true para que salga en el carrusel de destacados, false si solo va al catálogo
  }
];
let idCounter = 1;

BRANDS.forEach(brand => {
  for (let i = 1; i <= 18; i++) {
    const randomImg = SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)];
    const isFeatured = (idCounter % 7 === 0);

    products.push({
      id: idCounter,
      brand: brand,
      image: randomImg,
      featured: isFeatured,
      description: `Armazón de alta resistencia y precisión de la firma ${brand}. Diseño liviano y ergonómico, apto para cristales graduados o multifocales.`
    });
    idCounter++;
  }
});

// EVENTO DE CARGA INICIAL
document.addEventListener('DOMContentLoaded', () => {
  renderDropdownMenu();
  renderFilterButtons();
  renderCarousel();
  renderProducts('TODAS');
});

// MANEJO DE SECCIONES (INICIO / CATÁLOGO)
function showSection(sectionId) {
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// MENÚ RESPONSIVE HAMBURGUESA
function toggleMobileMenu() {
  const navLinks = document.getElementById('nav-links');
  const icon = document.getElementById('toggle-icon');
  
  navLinks.classList.toggle('mobile-active');
  
  if (navLinks.classList.contains('mobile-active')) {
    icon.className = 'ri-close-line';
  } else {
    icon.className = 'ri-menu-line';
  }
}

function closeMobileMenu() {
  const navLinks = document.getElementById('nav-links');
  const icon = document.getElementById('toggle-icon');
  navLinks.classList.remove('mobile-active');
  if (icon) icon.className = 'ri-menu-line';
}

function toggleMobileDropdown(e) {
  if (window.innerWidth <= 850) {
    e.preventDefault();
    const dropdown = document.getElementById('brands-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }
}

// DESPLEGABLE NAVBAR
function renderDropdownMenu() {
  const dropdown = document.getElementById('brands-dropdown');
  let html = `<a href="#" onclick="filterByBrand('TODAS'); closeMobileMenu();">TODAS LAS MARCAS</a>`;
  
  BRANDS.forEach(brand => {
    html += `<a href="#" onclick="filterByBrand('${brand}'); closeMobileMenu();">${brand.toUpperCase()}</a>`;
  });
  
  dropdown.innerHTML = html;
}

// FILTROS CATÁLOGO
function renderFilterButtons() {
  const container = document.getElementById('filter-buttons');
  let html = `<button class="filter-btn active" onclick="filterByBrand('TODAS', this)">TODAS</button>`;
  
  BRANDS.forEach(brand => {
    html += `<button class="filter-btn" onclick="filterByBrand('${brand}', this)">${brand.toUpperCase()}</button>`;
  });

  container.innerHTML = html;
}

function filterByBrand(brand, btnElement = null) {
  showSection('catalog');

  const title = document.getElementById('catalog-heading');
  title.innerText = brand === 'TODAS' ? 'CATÁLOGO COMPLETO' : `COLECCIÓN ${brand.toUpperCase()}`;

  if (btnElement) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
  }

  renderProducts(brand);
}

// RENDERIZAR PRODUCTOS Y CARRUSEL
function renderProducts(brandFilter) {
  const grid = document.getElementById('products-grid');
  const filtered = brandFilter === 'TODAS' 
    ? products 
    : products.filter(p => p.brand === brandFilter);

  grid.innerHTML = filtered.map(product => `
    <div class="product-card" onclick="openModal(${product.id})">
      <img class="product-img" src="${product.image}" loading="lazy">
      <div class="product-brand">${product.brand}</div>
    </div>
  `).join('');
}

function renderCarousel() {
  const carouselTrack = document.getElementById('featured-carousel');
  const featured = products.filter(p => p.featured);

  carouselTrack.innerHTML = featured.map(product => `
    <div class="carousel-card" onclick="openModal(${product.id})">
      <img class="product-img" src="${product.image}"  loading="lazy">
      <div class="product-brand">${product.brand}</div>
    </div>
  `).join('');
}

function scrollCarousel(direction) {
  const track = document.getElementById('featured-carousel');
  const scrollAmount = 280;
  track.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// MODAL DE DETALLE
function openModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  document.getElementById('modal-img').src = product.image;
  document.getElementById('modal-brand').innerText = product.brand;
  document.getElementById('modal-desc').innerText = product.description;

  const wsBtn = document.getElementById('modal-ws-btn');
  const message = `Hola Óptica Roverso, quisiera información y consultar el valor de un modelo (${product.brand}).`;
  wsBtn.onclick = () => openWhatsApp(message);

  const modal = document.getElementById('product-modal');
  modal.classList.add('active');
}
//CERRAR MODAL CON ANIMACION DE SALIDA
function closeModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.remove('active');
}
//CERRAR MODAL AL HACER CLICK FUERA DE LA TARJETA
document.addEventListener('click', (e) => {
    const modal = document.getElementById('product-modal');
    if (e.target === modal){
        closeModal();
    }
});


// ENLACE DIRECTO A WHATSAPP
function openWhatsApp(message) {
  const encodedMsg = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
  window.open(url, '_blank');
}