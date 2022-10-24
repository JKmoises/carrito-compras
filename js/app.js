document.addEventListener("DOMContentLoaded", iniciarApp);

let productos = [
  {
    id: 1,
    nombre: "Funko Pop",
    imagen: "funkopop.jpg",
    precio: 25000,
    unidades: 5,
  },
  {
    id: 2,
    nombre: "Harry Potter DVD",
    imagen: "harrypotter.jpg",
    precio: 3500,
    unidades: 50,
  },
  {
    id: 3,
    nombre: "Mouse Gamer Pro",
    imagen: "mouse.jpg",
    precio: 130000,
    unidades: 8,
  },
  {
    id: 4,
    nombre: "Macbook Air Apple",
    imagen: "macbook.png",
    precio: 900000,
    unidades: 3,
  },
  {
    id: 5,
    nombre: "Libro Clean Javascript",
    imagen: "librojs.jpg",
    precio: 50000,
    unidades: 10,
  },
];

let objProductoCarrito = {
  id: "",
  nombre: "",
  imagen: "",
  precio: 0,
  subtotal: 0,
  unidades: 1,
  stock: 0,
};

let carrito = [];
let totalCarrito = 0;

function iniciarApp() {
  renderizarProductos();
  animarCardProducto();
  agregarProductoEnCarrito();
  renderizarCarrito();
  calcularSubtotalCompra();
  limpiarCarrito();
  terminarCompra();
}

function terminarCompra() {
  const $btnComprar = document.querySelector('#btn-comprar');

  $btnComprar.addEventListener('click', () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: 'Agrega un producto',
        text: `Debes agregar al menos un producto al carrito`,
        icon: 'warning'
      });
      return;
    }
    carrito = [];
    total = 0;

    limpiarHTML();
    calcularTotalCompra();
    renderizarProductos();
    agregarProductoEnCarrito();

  });
}

function renderizarProductos() {
  const $productosContainer = document.querySelector("#productos");
  const $template = document.querySelector("#template-producto").content;
  const $fragment = document.createDocumentFragment();
  limpiarHTML($productosContainer);

  productos.forEach(({ id, nombre, imagen, precio, unidades }) => {
    $template.querySelector(".producto").dataset.productoId = id;
    $template.querySelector(".producto-img > img").src = `assets/${imagen}`;
    $template.querySelector(".producto-img > img").alt = nombre;
    $template.querySelector(".nombre").textContent = nombre;
    $template.querySelector(".unidades").dataset.productoUnidades = unidades;
    $template.querySelector(".unidades").innerHTML = /* html */ `<sub>${unidades}</sub> unidades`;
    $template.querySelector(".precio").innerHTML = /* html */ `<sup>$</sup>${formatValor(precio)}`;

    mostrarProductoSinStock(unidades,$template);

    let clone = document.importNode($template, true);

    $fragment.appendChild(clone);
  });
  $productosContainer.appendChild($fragment);
}

function mostrarProductoSinStock(stock,$template){
  if (stock === 0) {
      $template.querySelector(".btn-producto").disabled = true;
      $template.querySelector(".btn-producto").style.backgroundColor = 'var(--first-alpha-color)';
      $template.querySelector(".btn-producto").style.pointerEvents = 'none';
      $template.querySelector(".unidades").innerHTML = 'Sin stock';
      $template.querySelector(".unidades").classList.add('no-stock');
    } else {
      $template.querySelector(".btn-producto").disabled = false;
      $template.querySelector(".btn-producto").style.backgroundColor = 'var(--first-color)';
      $template.querySelector(".btn-producto").style.pointerEvents = 'auto';
      $template.querySelector(".unidades").classList.remove('no-stock');
      
    }
}

function agregarProductoEnCarrito() {

  const $botonesProductos = document.querySelectorAll(".btn-producto");

  $botonesProductos.forEach(($btnProducto) => $btnProducto.addEventListener("click",agregarProducto));
}

function agregarProducto(e) {
  let productoId = parseInt(e.target.parentElement.dataset.productoId);
  let producto = productos.filter((producto) => producto.id === productoId);

  let [{ id, nombre, precio, imagen,unidades }] = producto;

  objProductoCarrito.id = id;
  objProductoCarrito.nombre = nombre;
  objProductoCarrito.precio = precio;
  objProductoCarrito.subtotal = precio;
  objProductoCarrito.imagen = imagen;
  objProductoCarrito.stock = unidades;

  
  let existeProducto = carrito.find(producto => producto.id === objProductoCarrito.id);
  if (existeProducto) return;

  productos = productos.map(producto => {
    if (producto.id === productoId) {
      if (producto.unidades > 0) {
        producto.unidades--;
      }
    }
    return producto;
  });

  carrito = [...carrito, { ...objProductoCarrito }];
  renderizarCarrito();




}


function calcularSubtotalCompra() {
  document.addEventListener('click', e => {
    if (!(e.target.matches('.btn-agregar') || e.target.matches('.btn-quitar'))) return;
    
    let productoCarritoId = parseInt(e.target.parentElement.parentElement.dataset.productoId);
  
    if (e.target.matches('.btn-agregar')) {
      agregarUnidadesProducto(productoCarritoId);
    }
    
    if (e.target.matches('.btn-quitar')) {
      quitarUnidadesProducto(productoCarritoId);
    }

    renderizarCarrito();
  });
}

function agregarUnidadesProducto(productoId) {  
  carrito = carrito.map(producto => {
    if (producto.id  === productoId) {
      if (producto.unidades === producto.stock) {
        Swal.fire({
          title: 'Sin stock',
          html: `El producto <b>${producto.nombre}</b> no tiene stock`,
          icon: 'warning'
        });
      } else {
        producto.unidades += 1;
        producto.subtotal = producto.precio * producto.unidades;
        descontarStockProducto(productoId);
      }
      console.log(producto.unidades, producto.stock);
    }
    return producto;
    
  });
}

function descontarStockProducto(productoId) {
  productos = productos.map(producto => {
    if (producto.id  === productoId) {
      producto.unidades--;
      // console.log(producto.unidades);
    }
    return producto;

  });
}

function aumentarStockProducto(productoId) {
  productos = productos.map(producto => {
    if (producto.id === productoId) {
      producto.unidades++;
      console.log(producto.unidades);
    }
    return producto;

  });
}

function quitarUnidadesProducto(productoId){
  carrito = carrito
    .map(producto => {
      if (producto.id === productoId) {
        producto.unidades -= 1;
        producto.subtotal -= producto.precio;
      }

      return producto;
    })
    .filter(producto => producto.unidades >= 1);
  
  aumentarStockProducto(productoId);

}

function calcularTotalCompra() {
  const $totalCarrito = document.querySelector(".total");

  totalCarrito = carrito.reduce((acc,producto) => acc + producto.subtotal, 0);


  $totalCarrito.textContent = `$${totalCarrito === 0 ? totalCarrito : formatValor(totalCarrito) }`;
}

function renderizarCarrito() {
  limpiarHTML();

  const $carritoContainer = document.querySelector("#carrito");
  const $template = document.querySelector("#template-carrito").content;
  const $fragment = document.createDocumentFragment();

  carrito.forEach(({ id, nombre, precio, subtotal, unidades,imagen }) => {
    $template.querySelector(".producto-carrito").dataset.productoId = id;
    $template.querySelector(".nombre").textContent = nombre;
    $template.querySelector(".nombre").classList.add("text-center");
    $template.querySelector(".producto-img > img").src = `assets/${imagen}`;
    $template.querySelector(".producto-img > img").alt = nombre;
    $template.querySelector(".unidades").innerHTML = unidades;
    $template.querySelector(".precio").innerHTML = `$${formatValor(precio)}`;
    $template.querySelector(".subtotal").innerHTML = `$${formatValor(subtotal)}`;

    let clone = document.importNode($template, true);

    $fragment.appendChild(clone);
  });
  $carritoContainer.appendChild($fragment);

  calcularTotalCompra();
}

function limpiarCarrito() {
  const $btnLimpiar = document.querySelector('#btn-limpiar');

  $btnLimpiar.addEventListener('click', () => {
    carrito = [];
    renderizarCarrito();
  });
}


function formatValor(precio) {
  const options = {
    style: "currency",
    currency: "CLP",
  };

  return precio.toLocaleString("es-ES", options);
}

function animarCardProducto() {
  const $botonesProductos = document.querySelectorAll(".btn-producto");

  $botonesProductos.forEach(($btnProducto, i) => {
    $btnProducto.addEventListener("mouseenter", () => {
      $btnProducto.parentElement.classList.add("animar-producto");
    });

    $btnProducto.addEventListener("mouseout", () => {
      $btnProducto.parentElement.classList.remove("animar-producto");
    });
  });
}

function limpiarHTML($container = document.querySelector("#carrito")) {

  while ($container.firstElementChild) {
    $container.firstElementChild.remove();
  }
}
