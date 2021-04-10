"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* ------------variables---------------------
creo variables dandoles como valor de documento HTML perteneciente a un id
*/
var carrito = document.querySelector('#carrito'),
    contenedorCarrito = document.querySelector('#lista-carrito tbody'),
    vaciarCarritoBtn = document.querySelector('#vaciar-carrito'),
    listaCursos = document.querySelector('#lista-cursos');
var articulosCarrito = []; //----------------------------------------------------

cargarEventListener(); //-----------funciones-------------------

function cargarEventListener() {
  //cuando agregas un curso precionando agregar al carrito
  listaCursos.addEventListener('click', agregarCurso); //elimina curso del carrito

  carrito.addEventListener('click', eliminarCurso); //evento del boton para vaciar el carrito completamente

  vaciarCarritoBtn.addEventListener('click', function () {
    articulosCarrito = [];
    limpiarHTML();
  });
} //creo una funcion con espacio de memoria


function agregarCurso(e) {
  //para prevenir el default de un enlace o saltos acia la parte de arriba de una pagina
  e.preventDefault(); //comparo con metodos si el evento guardado en el espacio de memoria coresponde a una clase en particular

  if (e.target.classList.contains('agregar-carrito')) {
    var cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
} //eliminar curso del carrito


function eliminarCurso(e) {
  //condicion para saber cual clase contenedora se iso click
  if (e.target.classList.contains('borrar-curso')) {
    //variable con un valor obtenido de determinada clase
    var cursoId = e.target.getAttribute('data-id'); //elimina del arreglo de articulos carrito por el data-id

    articulosCarrito = articulosCarrito.filter(function (curso) {
      return curso.id !== cursoId;
    });
    carritoHTML();
  }
} //----------------------------
//lee el contenido del html al que le damos click y extrae la informacion


function leerDatosCurso(curso) {
  //crear un objeto con el contenido del curso actual
  var infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    //para seleccionar el id
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }; //revisa si un elemento ya existe en el carrito

  var existe = articulosCarrito.some(function (curso) {
    return curso.id === infoCurso.id;
  });

  if (existe) {
    //actualizar la cantidad
    var cursos = articulosCarrito.map(function (curso) {
      //retorna los objetos duplicados
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        //retorna los objetos que no son duplicados
        return curso;
      }
    });
    articulosCarrito = _toConsumableArray(cursos);
  } else {
    //agrega elementos al arreglo de carrito
    articulosCarrito = [].concat(_toConsumableArray(articulosCarrito), [infoCurso]);
  }

  console.log(articulosCarrito);
  carritoHTML();
} //muestra el carrito de compras en el html


function carritoHTML() {
  //limpiar el HTML
  limpiarHTML(); //recorre el carrito y genera el HTML

  articulosCarrito.forEach(function (curso) {
    var row = document.createElement('tr');
    row.innerHTML = "\n        <td><img src = \"".concat(curso.imagen, "\" width =\"100\"</td>\n          <td> ").concat(curso.titulo, "</td>\n          <td> ").concat(curso.precio, "</td>\n          <td> ").concat(curso.cantidad, "</td>\n          <td> <a  href= \"#\" class = \"borrar-curso\" data-id = \"").concat(curso.id, "\"> X </a></td>\n        "); //agrega el nuevo nodo html del carrito en el tbody

    contenedorCarrito.appendChild(row);
  });
}

function limpiarHTML() {
  /*forma lenta 
    contenedorCarrito.innerHTML = '';
  */
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}