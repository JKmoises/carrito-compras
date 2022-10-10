document.addEventListener('DOMContentLoaded', iniciarApp);

let productos = [
  {
    nombre: "Funko Pop",
    precio: 25000,
    unidades: 5
  },
  {
    nombre: "Harry Potter DVD",
    precio: 3500,
    unidades: 50
  },
  {
    nombre: "Mouse Gamer Pro",
    precio: 130000,
    unidades: 80
  },
  {
    nombre: "Macbook Air Apple",
    precio: 900000,
    unidades: 3
  },
];

let carrito = [];

function iniciarApp(){
  renderizarProductos();
}

function renderizarProductos() {
  const $productosContainer = document.querySelector('#productos');
  const $template = document.querySelector('#template-producto').content;
  const $fragment = document.createDocumentFragment();

  productos.forEach(({nombre,precio,unidades}) => {
    $template.querySelector('.nombre').textContent = nombre;
    $template.querySelector('.unidades').innerHTML = `<sub>${unidades}</sub> unidades`;
    $template.querySelector('.precio').innerHTML = `<sup>$</sup>${precio}`;
    $template.querySelector('.btn-producto').onclick = agregarEnCarrito;

    let clone = document.importNode($template,true);

    $fragment.appendChild(clone);
  });
  $productosContainer.appendChild($fragment);
}

function agregarEnCarrito(){
  
}