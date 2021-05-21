const socket = io()

const selectCategorias = document.querySelector('.select-categorias')
const productosForm = document.querySelector('.productos-form button')
const categoriasForm = document.querySelector('.categoria-form button')

const mainPageURL = location.href.split('/').slice(0,-2).join('/')
const categoriasid = new Map()

// Obtener el token almacenado
const token = JSON.parse( localStorage.getItem('token') )

// NOTA = JSON.parse evalúa en null si el valor es null, localStorage si no encuentra nada, evalúa en null


// Global Functions
const makePettition = ({url, data, method = 'GET', token = '' }) => {
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Connection':'keep-alive',
            'token': token
        },
        body: JSON.stringify(data)
    }) 
}
// Sockets 

socket.on('connect', () => {
    console.log('Conectado') 
} ) 

socket.on('disconnect', () => {
    console.log('mi compare se desconecto')
} )

socket.on('categoria', (payload) => {
    // Definiendo Objeto Clave/valor 
    payload.forEach( categoria => {
        categoriasid.set(categoria.nombre, categoria._id)
    })
    
    const fragment = document.createDocumentFragment()
    const nombresCategoriasArr = payload.map( categorias => categorias.nombre )

    console.log(nombresCategoriasArr)

    nombresCategoriasArr.forEach( nombre => {
        const selection = document.createElement('OPTION')
        selection.classList.add( nombre.replace(' ', '-') )
        selection.innerHTML = nombre
        fragment.appendChild(selection)
    })

    selectCategorias.appendChild(fragment)
})

// Event Listeners

productosForm.addEventListener('click', async(e) => {
    e.preventDefault()
    // Definir URL petición 
    const url = mainPageURL + '/api/productos'

    // Definir data a enviar
    const inputs = document.querySelectorAll('.productos-form > input,select')

    const values = Array.from(inputs).map( element => element.value)
    const keys = ['nombre','categoria','disponible','descripcion']

    const data = Object.fromEntries( keys.map( (key, i) => [ key, values[i] ] ) )

    if (data.disponible === 'true') data.disponible = true 
    else data.disponible = false

    if (data.categoria) data.categoria = categoriasid.get(data.categoria)

    const response = await makePettition({url, data, method:'POST', token: token })
    const dataResponse = await response.json()

    if (response.ok) {
        console.log(dataResponse)
    } else {        
        const errors = dataResponse.errors.map( objError => objError.msg ) 
        console.log(errors)
    }
    // Limpiar inputs 
    inputs.forEach( input => input.value = '' )
})

categoriasForm.addEventListener( 'click', async(e) => {
    e.preventDefault()
    // Definir URL
    const url = mainPageURL + '/api/categorias'
    // Definir data
    const input = document.querySelector('.categoria-form input[type="text"]')
    const data = {
        nombre: input.value
    }

    const response = await makePettition({url, data, method:'POST', token: token })
    const dataResponse = await response.json()

    if (response.ok) {
        console.log(dataResponse)
    } else {        
        const errors = dataResponse.errors.map( objError => objError.msg ) 
        console.log(errors)
    }
    // Limpiar input 
    input.value = '' 

})