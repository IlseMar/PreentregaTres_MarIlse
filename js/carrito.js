document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let carritoContainer = document.querySelector(".carrito-container");
  let totalElement = document.getElementById("total");
  let eliminarTodoBtn = document.getElementById("eliminar-todo");

  let mostrarProductosCarrito = () => {
    carritoContainer.innerHTML = "";
    let total = 0;
    carrito.forEach((producto, index) => {
      let productCard = document.createElement("article");
      productCard.className = "productCardFinal";

      let productImage = document.createElement("img");
      let imagePath = "";

      if (producto.tipoProducto === "funda") {
        if (producto.diseño === "básico") {
          imagePath = "../assets/fundas/funda-1.png";
        } else if (producto.diseño === "intermedio") {
          imagePath = "../assets/fundas/funda-5.png";
        } else if (producto.diseño === "super") {
          imagePath = "../assets/fundas/funda-3.png";
        }
        productImage.alt = "Imagen de la funda";
      } else if (producto.tipoProducto === "espejo") {
        if (producto.diseño === "básico") {
          imagePath = "../assets/espejos/espejo-7.jpeg";
        } else if (producto.diseño === "intermedio") {
          imagePath = "../assets/espejos/espejo-4.jpeg";
        } else if (producto.diseño === "super") {
          imagePath = "../assets/espejos/espejo-5.jpeg";
        }
        productImage.alt = "Imagen del espejo";
      }

      productImage.src = imagePath;
      productImage.className = "productImageFinal";

      let productInfo = document.createElement("div");
      productInfo.className = "productInfoFinal";

      let productType = document.createElement("h4");
      productType.textContent = "Producto: " + producto.tipoProducto;

      let productTitle = document.createElement("p");
      if (producto.tipoProducto === "funda") {
        productTitle.textContent = "Modelo: " + producto.modelo;
      } else if (producto.tipoProducto === "espejo") {
        productTitle.textContent = "Tamaño: " + producto.tamaño;
      }

      let productDesign = document.createElement("p");
      productDesign.textContent = producto.diseño;

      let productQuantity = document.createElement("p");
      productQuantity.textContent = producto.unidades + " Unidades";

      let productCost = document.createElement("h4");
      productCost.textContent = "Costo Total: $" + producto.costoTotal;

      let deletProduct = document.createElement("button");
      deletProduct.className = "boton-borrar";
      deletProduct.innerHTML = `<button>Borrar</button>`;
      deletProduct.addEventListener("click", () => {
        borrarProducto(index, productCard);
      });

      productInfo.appendChild(productType);
      productInfo.appendChild(productTitle);
      productInfo.appendChild(productDesign);
      productInfo.appendChild(productQuantity);
      productInfo.appendChild(productCost);
      productInfo.appendChild(deletProduct);
      productCard.appendChild(productImage);
      productCard.appendChild(productInfo);

      carritoContainer.appendChild(productCard);

      total += producto.costoTotal;
    });
    totalElement.textContent = "Total: $" + total;
  };

  const borrarProducto = (index, productCard) => {
    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    productCard.remove();

    mostrarProductosCarrito();
  };

  const borrarTodo = () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carritoContainer.innerHTML = "";
    totalElement.textContent = "Total: $0";
  };

  eliminarTodoBtn.addEventListener("click", borrarTodo);

  mostrarProductosCarrito();
});

//carrito
