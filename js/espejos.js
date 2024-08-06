let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let elegirTamaño = (tamañoValue) => {
  let costoInicial = 250;
  let costoTamaño = 0;

  switch (tamañoValue) {
    case "chico":
      costoTamaño = 50;
      break;
    case "mediano":
      costoTamaño = 70;
      break;
    case "grande":
      costoTamaño = 100;
      break;
  }
  return costoInicial + costoTamaño;
};

let inicializarEventos = () => {
  let productos = document.querySelectorAll(".product-card");

  productos.forEach((producto, index) => {
    let tamañoSelect = producto.querySelector(".model-select");
    let unidadesInput = producto.querySelector(".quantity-input");
    let botonAgregar = producto.querySelector(".add-cart-btn");
    let tipoDiseno = producto
      .querySelector(".diseño h3")
      .innerText.toLowerCase();

    let costoDiseno = 0;
    if (tipoDiseno.includes("básico")) {
      costoDiseno = 100;
    } else if (tipoDiseno.includes("intermedio")) {
      costoDiseno = 200;
    } else if (tipoDiseno.includes("super")) {
      costoDiseno = 300;
    }

    tamañoSelect.addEventListener("change", () => {
      let costoEspejo = elegirTamaño(tamañoSelect.value);
      producto.dataset.costoEspejo = costoEspejo + costoDiseno;
    });

    botonAgregar.addEventListener("click", () => {
      let cantidad = parseInt(unidadesInput.value, 10);
      let costoEspejo = parseInt(producto.dataset.costoEspejo || 0);
      let tamañoValue = tamañoSelect.value;
      if (!isNaN(cantidad) && cantidad > 0 && tamañoValue !== "tamaño") {
        let productoCarrito = {
          id: index,
          tipoProducto: "espejo",
          tamaño: tamañoValue,
          unidades: cantidad,
          costoTotal: costoEspejo * cantidad,
          diseño: tipoDiseno,
        };
        carrito.push(productoCarrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Espejo agregado al carrito");
      } else {
        alert("Por favor, selecciona un tamaño");
      }
    });
  });
};

inicializarEventos();

//espejos
