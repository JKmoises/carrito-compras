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

let objProductoCarrito = {
  id: '',
  nombre: '',
  precio: 0,
  unidades: 0,
  total: 0
}

let carrito = [];


function iniciarApp(){
  renderizarProductos();
  animarCardProducto();
  agregarProductoEnCarrito();
}


function renderizarProductos() {
  const $productosContainer = document.querySelector('#productos');
  const $template = document.querySelector('#template-producto').content;
  const $fragment = document.createDocumentFragment();

  productos.forEach(({ id, nombre,imagen, precio, unidades }) => {
    $template.querySelector('.producto').dataset.productoId = id;
    $template.querySelector('.producto-img > img').src = `assets/${imagen}`;
    $template.querySelector('.nombre').textContent = nombre;
    $template.querySelector('.unidades').innerHTML = /* html */`<sub>${unidades}</sub> unidades`;
    $template.querySelector('.precio').innerHTML = /* html */`<sup>$</sup>${formatPrecio(precio)}`;
    
    let clone = document.importNode($template,true);
    
    $fragment.appendChild(clone);
  });
  $productosContainer.appendChild($fragment);
}

function agregarProductoEnCarrito() {
  const $botonesProductos = document.querySelectorAll('.btn-producto');

  $botonesProductos.forEach($btnProducto => {
    $btnProducto.addEventListener('click', e => {
      let productoId = parseInt(e.target.parentElement.dataset.productoId);
      let producto = productos.filter(producto => producto.id === productoId);
      let [{ id, nombre, precio, unidades }] = producto;
      
      objProductoCarrito.id = id;
      objProductoCarrito.nombre = nombre;
      objProductoCarrito.precio = precio;
      objProductoCarrito.unidades = unidades;

      calcularCompra();

      carrito = [...carrito, {...objProductoCarrito}];
      renderizarCarrito();
    });
  });
}

function calcularCompra(){
  
}

function renderizarCarrito() {
  limpiarHTML();

  const $carritoContainer = document.querySelector('#carrito');
  const $template = document.querySelector('#template-carrito').content;
  const $fragment = document.createDocumentFragment();

  carrito.forEach(({ id,nombre, precio, unidades },index) => {
    $template.querySelector('.producto-carrito').dataset.productoId = id;
    $template.querySelector('.nombre').textContent = nombre;
    $template.querySelector('.nombre').classList.add('text-center');
    $template.querySelector('.unidades').innerHTML = unidades;
    $template.querySelector('.precio').innerHTML = `$${formatPrecio(precio)}`;

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

function animarCardProducto() {
  const $botonesProductos = document.querySelectorAll('.btn-producto');

  $botonesProductos.forEach(($btnProducto,i) => {
    $btnProducto.addEventListener('mouseenter', () => {
      $btnProducto.parentElement.classList.add('animar-producto')
    });

    $btnProducto.addEventListener('mouseout', () => {
      $btnProducto.parentElement.classList.remove('animar-producto')
    });
  });
}

function limpiarHTML(){
  const $carrito = document.querySelector('.carrito');

  while ($carrito.firstElementChild) {
    $carrito.firstElementChild.remove();
  }
}