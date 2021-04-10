



/* ------------variables---------------------
creo variables dandoles como valor de documento HTML perteneciente a un id
*/
var carrito = document.querySelector('#carrito'),
   
    contenedorCarrito = document.querySelector('#lista-carrito tbody'),
    vaciarCarritoBtn = document.querySelector('#vaciar-carrito'),
    listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];
//----------------------------------------------------
cargarEventListener();
//-----------funciones-------------------


function cargarEventListener() {
    //cuando agregas un curso precionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);
    //elimina curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    //evento del boton para vaciar el carrito completamente
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })
}
//creo una funcion con espacio de memoria
function agregarCurso(e) {

    //para prevenir el default de un enlace o saltos acia la parte de arriba de una pagina
    e.preventDefault();

    //comparo con metodos si el evento guardado en el espacio de memoria coresponde a una clase en particular
    if (e.target.classList.contains('agregar-carrito')) {
        var cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//eliminar curso del carrito

function eliminarCurso(e) {
    //condicion para saber cual clase contenedora se iso click
    if (e.target.classList.contains('borrar-curso')) {
      //variable con un valor obtenido de determinada clase
        var cursoId = e.target.getAttribute('data-id');
        //elimina del arreglo de articulos carrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}

//----------------------------
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
    }
   //revisa si un elemento ya existe en el carrito
    var existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizar la cantidad
        var cursos = articulosCarrito.map(curso=> {
            //retorna los objetos duplicados
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                //retorna los objetos que no son duplicados
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
         //agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

   
    console.log(articulosCarrito);
    carritoHTML();
    

}
//muestra el carrito de compras en el html
function carritoHTML() {
    //limpiar el HTML
    limpiarHTML();
    //recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        var row = document.createElement('tr');
        row.innerHTML = `
        <td><img src = "${curso.imagen}" width ="100"</td>
          <td> ${curso.titulo}</td>
          <td> ${curso.precio}</td>
          <td> ${curso.cantidad}</td>
          <td> <a  href= "#" class = "borrar-curso" data-id = "${curso.id}"> X </a></td>
        `;
        //agrega el nuevo nodo html del carrito en el tbody
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




