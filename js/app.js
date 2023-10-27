const carrito = document.querySelector("#carrito")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const listaCursos = document.querySelector("#lista-cursos")
const vaciarCarritoBTN = document.querySelector("#vaciar-carrito")

var articulosCarrito = []



carritoHTML()


cargarEventsListeners()
function cargarEventsListeners() {
    listaCursos.addEventListener("click", (e) => {
        e.preventDefault()
        if ( e.target.classList.contains("agregar-carrito") ) {
            const curso = e.target.parentElement.parentElement
            leerDatosCurso(curso)
        }
    })
    
    carrito.addEventListener("click", (e) => {
        e.preventDefault()
        if ( e.target.classList.contains("borrar-curso") ) {
            const cursoID = e.target.getAttribute("data-id")
            
            
            articulosCarrito = articulosCarrito.filter((curso) => 
            curso.id !== cursoID
            )
            localStorage.setItem("carrito", JSON.stringify(articulosCarrito))
            carritoHTML()
        }
    })

    vaciarCarritoBTN.addEventListener("click", (e) => {
        articulosCarrito = []
        limpiarHTML()
    })
}


function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id)

    if ( existe ) {
        const cursos = articulosCarrito.map((curso) => {
            if ( curso.id === infoCurso.id ) {
                curso.cantidad++
            }
        })
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    localStorage.setItem("carrito", JSON.stringify(articulosCarrito))
    carritoHTML()
}

function carritoHTML() {
    limpiarHTML()
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || []
    
    articulosCarrito.forEach((curso) => {
        
        const {imagen, titulo, precio, cantidad, id} = curso

        const row = document.createElement("tr")
        row.innerHTML = `
            <td><img src="${imagen}" width="150"></img></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `
        contenedorCarrito.appendChild(row)
    })
}


function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.firstChild.remove()
    }
}