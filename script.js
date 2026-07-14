// Guardamos el filtro de estado que está activo (por defecto "todas")
var filtroActual = "todas";

// ---------- CONTAR CASAS AL CARGAR LA PAGINA ----------
// Cuando la página carga, contamos cuántas casas hay y lo mostramos en las estadísticas

window.onload = function(){
  var casas = document.getElementById("contenedor").getElementsByClassName("casa");
  document.getElementById("numCasas").innerText = casas.length;
};

// ---------- BUSCADOR ----------
// Esta función se ejecuta cada vez que el usuario escribe en el input.
// Recorre todas las casas y esconde las que no coincidan con el texto Y con el filtro activo.

function buscarCasas(){
  aplicarFiltros();
}

// ---------- FILTRO POR ESTADO (SOLA / RENTADA / PRESTADA) ----------

function filtrarPorEstado(estado, boton){
  filtroActual = estado;

  // Le quitamos la clase "activo" a todos los botones de filtro
  var botones = document.getElementsByClassName("filtro-btn");
  for (var i = 0; i < botones.length; i++){
    botones[i].classList.remove("activo");
  }
  // Y se la ponemos solo al botón que le dieron clic
  boton.classList.add("activo");

  aplicarFiltros();
}

// Esta función junta el texto buscado + el filtro de estado
// y decide qué casas se muestran y cuáles no

function aplicarFiltros(){
  var texto = document.getElementById("inputBuscar").value.toLowerCase();
  var casas = document.getElementById("contenedor").getElementsByClassName("casa");
  var contadorVisibles = 0;

  for (var i = 0; i < casas.length; i++){
    var contenidoCasa = casas[i].innerText.toLowerCase();
    var estadoCasa = casas[i].getAttribute("data-estado");

    var coincideTexto = contenidoCasa.indexOf(texto) > -1;
    var coincideFiltro = (filtroActual === "todas") || (estadoCasa === filtroActual);

    if (coincideTexto && coincideFiltro){
      casas[i].style.display = "block";
      contadorVisibles++;
    } else {
      casas[i].style.display = "none";
    }
  }

  // Mostramos el mensaje de "sin resultados" solo si no hay ninguna casa visible
  var mensaje = document.getElementById("sinResultados");
  if (contadorVisibles === 0){
    mensaje.style.display = "block";
  } else {
    mensaje.style.display = "none";
  }

  // Actualizamos el contador de arriba
  document.getElementById("contador").innerText = contadorVisibles + " casa(s) encontrada(s)";
}

// ---------- VENTANA EMERGENTE (MODAL) ----------
// Cuando le dan clic a "Ver Información", tomamos los datos
// de la tarjeta de esa casa y los mostramos en el modal.

function verInformacion(boton){
  var casa = boton.closest(".casa");

  var imagen = casa.querySelector("img").src;
  var estado = casa.querySelector(".estado").innerText;
  var claseEstado = casa.querySelector(".estado").className;
  var nombre = casa.querySelector("h2").innerText;
  var colonia = casa.querySelector("p b").parentElement.innerText;
  var ciudad = casa.querySelector(".ciudad").innerText;

  document.getElementById("modalImagen").src = imagen;
  document.getElementById("modalEstado").innerText = estado;
  document.getElementById("modalEstado").className = claseEstado;
  document.getElementById("modalNombre").innerText = nombre;
  document.getElementById("modalColonia").innerText = colonia;
  document.getElementById("modalCiudad").innerText = "Ciudad: " + ciudad;

  document.getElementById("fondoModal").style.display = "flex";
}

function cerrarModal(){
  document.getElementById("fondoModal").style.display = "none";
}

// Si le dan clic afuera de la cajita, también se cierra
document.getElementById("fondoModal").addEventListener("click", function(evento){
  if (evento.target === this){
    cerrarModal();
  }
});

// ---------- FORMULARIO DE CONTACTO ----------
// Validamos que los campos no estén vacíos y mostramos un mensaje de éxito

function enviarFormulario(){
  var nombre = document.getElementById("nombre").value;
  var telefono = document.getElementById("telefono").value;

  if (nombre === "" || telefono === ""){
    alert("Por favor llena tu nombre y teléfono antes de enviar 🙂");
    return;
  }

  // Aquí en un caso real se enviaría la información a un servidor.
  // Por ahora solo mostramos el mensaje de confirmación.

  document.getElementById("mensajeEnviado").style.display = "block";

  // Limpiamos el formulario
  document.getElementById("nombre").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("mensaje").value = "";
}

// ---------- BOTON DE SUBIR ARRIBA ----------
// Aparece solo cuando el usuario ha bajado un poco en la página

window.addEventListener("scroll", function(){
  var boton = document.getElementById("btnSubir");
  if (window.scrollY > 400){
    boton.style.display = "block";
  } else {
    boton.style.display = "none";
  }
});

function subirArriba(){
  window.scrollTo({ top: 0, behavior: "smooth" });
}
