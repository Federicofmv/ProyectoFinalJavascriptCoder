cargarEventlisteners();

function cargarEventlisteners() {
  listaProductos.addEventListener("click", agregarProducto);

  // mostrar elementos del localStorage
  document.addEventListener("DOMContentLoaded", () => {
    productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoHTML();
  });
  document.addEventListener("DOMContentLoaded", () => {
    totalCompra = JSON.parse(localStorage.getItem("total"));
    sumarTotal();
  });

  //elimina productos del carrito
  carrito.addEventListener("click", eliminarProducto);

  // vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    productosCarrito = [];
    contenedorCarritoSuma.innerHTML = "";
    limpiarHTML();
  });
}

//funciones

//elimina producto del carrito

function eliminarProducto(e) {
  e.preventDefault();
  if (e.target.classList.contains("botonEliminarImg")) {
    const productoId = e.target.getAttribute("data-id");
    console.log(productoId);
    // elimina del arreglo productosCarrito mediante el data-id
    productosCarrito = productosCarrito.filter(
      (producto) => producto.id !== productoId
    );
    carritoHTML();
    sumarTotal();
  }
}

function agregarProducto(e) {
  e.preventDefault();
  if (e.target.classList.contains("divProductos__boton")) {
    const productoSeleccionado = e.target.parentElement;
    leerDatosProductos(productoSeleccionado);
  }
}

function leerDatosProductos(productoSeleccionado) {
  const infoProducto = {
    imagen: productoSeleccionado.querySelector("img").src,
    nombre: productoSeleccionado.querySelector(".divProductos__texto")
      .textContent,
    precio: productoSeleccionado
      .querySelector(".divProductos__precio")
      .textContent.replace("$", ""),
    cantidad: 1,
    id: productoSeleccionado
      .querySelector(".divProductos__boton")
      .getAttribute("data-id"),
  };
  swal.fire({
    title: `Agregaste a tu compra`,
    text: `${infoProducto.nombre}`,
    imageUrl: `${infoProducto.imagen}`,
    timer: 1000,
    imageWidth: 125,
    showConfirmButton: false,
  });

  // Revisa si un elemento ya existe en el carrito
  const existe = productosCarrito.some(
    (producto) => producto.id === infoProducto.id
  );

  if (existe) {
    //actualiza cantidad
    const productos = productosCarrito.map((productoSeleccionado) => {
      if (productoSeleccionado.id === infoProducto.id) {
        productoSeleccionado.cantidad++;
        return productoSeleccionado;
      } else {
        return productoSeleccionado;
      }
    });
    productosCarrito = [...productos];
  } else {
    //agregamos nuevo producto al carrito html
    productosCarrito = [...productosCarrito, infoProducto];
  }
  sumarTotal();

  carritoHTML();
}

//Muestra el carrito de compras en el html

function carritoHTML() {
  //limpia html
  limpiarHTML();

  productosCarrito.forEach((productoSeleccionado) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
      <img class="carritoImagen" src="${productoSeleccionado.imagen}">
      </td>
      <td>
        ${productoSeleccionado.nombre}
      </td>
      <td>
        $${productoSeleccionado.precio}
      </td>
      <td>
      ${productoSeleccionado.cantidad}
      </td>          
      <td>      
        <a class="botonEliminar" href="#" ><img class="botonEliminarImg" data-id="${productoSeleccionado.id}"   src="img/borrar.png"></a>
      </td>      
    `;
    contenedorCarrito.appendChild(row);
  });
  // localStorage
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(productosCarrito));
}

function limpiarHTML() {
  contenedorCarrito.innerHTML = "";
}

function sumarTotal() {
  contenedorCarritoSuma.innerHTML = "";
  let total = 0;

  productosCarrito.forEach((producto) => {
    total += parseInt(producto.precio) * producto.cantidad;
    contenedorCarritoSuma.innerHTML = "";
    const sumaTabla = document.createElement("div");
    sumaTabla.innerHTML = `  
    <div id="footerCarrito">  
     <p class="textoTotal">TOTAL COMPRA: $${total}</p> 
     <a class="botonComprar" href="#" >Iniciar Compra</a>
    </div> 
         
    `;
    contenedorCarritoSuma.append(sumaTabla);
    const totalString = JSON.stringify(total);
    localStorage.setItem("total", totalString);

    // mensaje boton compra
    const compraCarritoBtn = document.querySelector(
      "#footerCarrito .botonComprar"
    );
    compraCarritoBtn.addEventListener("click", mensajeCompra);

    function mensajeCompra(e) {
      if (e.target.classList.contains("botonComprar")) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Muchas gracias por tu compra!",
          text: `El total de tu compra es $${total}`,
          showConfirmButton: false,
          timer: 3000,
        });
      }
      limpiarHTML();
      contenedorCarritoSuma.innerHTML = "";
    }
  });
}
