const listaProductos = document.querySelector('.divProductos');
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#carrito tbody');
const contenedorCarritoSuma = document.querySelector('#carrito .totalSuma');
const vaciarCarritoBtn = document.querySelector('#vaciarCarrito');
let productosCarrito = [];
let totalCompra = document.querySelector('#footerCarrito .textoTotal');