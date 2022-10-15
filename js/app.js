document.addEventListener('DOMContentLoaded', iniciarApp);

let productos = [
  {
    id: 1,
    nombre: "Funko Pop",
    imagen: 'funkopop.jpg',
    precio: 25000,
    unidades: 5
  },
  {
    id: 2,
    nombre: "Harry Potter DVD",
    imagen: 'harrypotter.jpg',
    precio: 3500,
    unidades: 50
  },
  {
    id: 3,
    nombre: "Mouse Gamer Pro",
    imagen: 'mouse.jpg',
    precio: 130000,
    unidades: 80
  },
  {
    id: 4,
    nombre: "Macbook Air Apple",
    imagen: 'macbook.jpg',
    precio: 900000,
    unidades: 3
  },
];

const objProductoCarrito = {
  id: '',
  nombre: '',
  precio: 0,
  unidades: 0
}

let carrito = [];

function iniciarApp(){
  renderizarProductos();
  animarCardProducto();
}

function renderizarProductos() {
  const $productosContainer = document.querySelector('#productos');
  const $template = document.querySelector('#template-producto').content;
  const $fragment = document.createDocumentFragment();

  productos.forEach(({ id, nombre,imagen, precio, unidades }) => {
    $template.querySelector('.producto').dataset.productoId = id;
    $template.querySelector('.producto-img > img').src = `assets/${imagen}`;
    $template.querySelector('.nombre').textContent = nombre;
    $template.querySelector('.unidades').innerHTML = `<sub>${unidades}</sub> unidades`;
    $template.querySelector('.precio').innerHTML = `<sup>$</sup>${formatPrecio(precio)}`;
    
    let clone = document.importNode($template,true);
    
    $fragment.appendChild(clone);
  });
  $productosContainer.appendChild($fragment);
}

function agregarEnCarrito(e) {
  let producto = e.target.parentElement;
  // renderizarCarrito();
}

function renderizarCarrito(){
  const $carritoContainer = document.querySelector('#carrito');
  const $template = document.querySelector('#template-carrito').content;
  const $fragment = document.createDocumentFragment();

  carrito.forEach(({ id, nombre, precio, unidades }) => {
    $template.querySelector('.producto-carrito').dataset.productoId = id;
    $template.querySelector('.producto-img > img').src = `assets/${imagen}`;
    $template.querySelector('.nombre').textContent = nombre;
    $template.querySelector('.unidades').innerHTML = `<sub>${unidades}</sub> unidades`;
    $template.querySelector('.precio').innerHTML = `<sup>$</sup>${formatPrecio(precio)}`;
    $template.querySelector('.btn-producto').onclick = agregarEnCarrito;

    let clone = document.importNode($template, true);

    $fragment.appendChild(clone);
  });
  $carritoContainer.appendChild($fragment);
}

function formatPrecio(precio) {
  const options = {
    style: 'currency',
    currency: 'CLP'
  }

  return precio.toLocaleString('es-ES',options);
}

function animarCardProducto(){
  const $botonesCarrito = document.querySelectorAll('.btn-producto');

  $botonesCarrito.forEach(($botonCarrito,i) => {
    $botonCarrito.addEventListener('mouseenter', () => {
      $botonCarrito.parentElement.classList.add('animar-producto')
    });

    $botonCarrito.addEventListener('mouseout', () => {
      $botonCarrito.parentElement.classList.remove('animar-producto')
    });
  });
}