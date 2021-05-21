const socket = io()

const productoBtn = document.querySelector('.productos-form button')
const categoriaBtn = document.querySelector('.categoria-form button')

const selectProductos = document.querySelector('.select-productos')
const selectCategoria = document.querySelector('.select-categoria')

const token = JSON.parse( localStorage.getItem('token') )

const productosID = new Map()
const categoriasID = new Map()

// Global Functions
const makePettition = ({url, data = undefined, method = 'GET', token = '' }) => {
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Connection':'keep-alive',
            'token': token
        },
        body: data ? JSON.parse( data ) : undefined
    }) 
}

socket.on('connect', () => {
    console.log('Conectado') 
} ) 

socket.on('disconnect', () => {
    console.log('mi compare se desconecto')
} )

socket.on('categoria', (payload) => {
    const fragment = document.createDocumentFragment()

    payload.forEach( categoria => {
        // Definiendo Objeto Clave/valor 
        categoriasID.set( categoria.nombre, categoria._id)

        const option = document.createElement('OPTION')
        option.classList.add( categoria.nombre.split(' ').join('-') )
        option.innerHTML = categoria.nombre
        fragment.appendChild(option)
    })
    selectCategoria.appendChild(fragment)
})

socket.on('producto', (payload) => {
    const fragment = document.createDocumentFragment()

    payload.forEach( producto => {
        // Definiendo Objeto Clave/valor 
        productosID.set( producto.nombre, producto._id)

        const option = document.createElement('OPTION')
        option.classList.add( producto.nombre.split(' ').join('-') )
        option.innerHTML = producto.nombre
        fragment.appendChild(option)
    })

    selectProductos.appendChild(fragment)
})

productoBtn.addEventListener('click', async(e) => {
    e.preventDefault()
    const option = selectProductos.value
    const id = productosID.get( option )
    
    const url = location.origin + '/api/productos/' + id

    const response = await makePettition({ url, method: 'DELETE', token })
    const dataRecived = await response.json()

    if (response.ok) {
        console.log(dataRecived)
    } else {
        console.log(dataRecived)
    }

})
categoriaBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const option = selectCategoria.value
    
})