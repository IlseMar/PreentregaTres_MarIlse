let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para seleccionar la marca y calcular el costo de la funda
let elegirMarca = (marcaValue) => {
  let costoInicial = 250;
  let costoModelo = 0;

  switch (marcaValue) {
    case "samsung":
      costoModelo = 45;
      break;
    case "huawei":
      costoModelo = 55;
      break;
    case "xiaomi":
      costoModelo = 55;
      break;
    case "iphone":
      costoModelo = 50;
      break;
    case "motorola":
      costoModelo = 40;
      break;
  }
  return costoInicial + costoModelo;
};

// Función para inicializar los eventos de cada producto
let inicializarEventos = () => {
  let productos = document.querySelectorAll(".product-card");

  productos.forEach((producto, index) => {
    let marcaSelect = producto.querySelector(".model-select");
    let unidadesInput = producto.querySelector(".quantity-input");
    let botonAgregar = producto.querySelector(".add-cart-btn");
    let tipoDiseño = producto
      .querySelector(".diseño h3")
      .innerText.toLowerCase();

    // Determinar el costo adicional basado en el diseño
    let costoDiseño = 0;
    if (tipoDiseño.includes("básico")) {
      costoDiseño = 100;
    } else if (tipoDiseño.includes("intermedio")) {
      costoDiseño = 200;
    } else if (tipoDiseño.includes("super")) {
      costoDiseño = 300;
    }

    // Actualizar el costo de la funda cuando cambie la selección de la marca
    marcaSelect.addEventListener("change", () => {
      let costoFunda = elegirMarca(marcaSelect.value);
      producto.dataset.costoFunda = costoFunda + costoDiseño;
    });

    // Agregar al carrito cuando se hace clic en el botón
    botonAgregar.addEventListener("click", () => {
      let cantidad = parseInt(unidadesInput.value, 10);
      let costoFunda = parseInt(producto.dataset.costoFunda || 0);
      let marcaValue = marcaSelect.value;
      if (!isNaN(cantidad) && cantidad > 0 && marcaValue !== "marca") {
        let productoCarrito = {
          id: index,
          tipoProducto: "funda",
          modelo: marcaValue,
          unidades: cantidad,
          costoTotal: costoFunda * cantidad,
          diseño: tipoDiseño,
        };
        carrito.push(productoCarrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Funda agregada al carrito");
      } else {
        alert("Por favor, selecciona un modelo");
      }
    });
  });
};

inicializarEventos();

//fundas
