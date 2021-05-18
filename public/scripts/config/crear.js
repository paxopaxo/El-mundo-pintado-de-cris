
const socket = io()

const selectCategorias = document.querySelector('.select-categorias')

// Global Functions
const makePettition = (url, data, method = 'GET') => {
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Connection':'keep-alive'
        },
        body: JSON.stringify(data)
    }) 
}

socket.on('connect', () => {
    console.log('agurto') 
} ) 

socket.on('disconnect', () => {
    console.log('mi compare se desconecto')
} )

socket.on('categoria', (payload) => {
    const fragment = document.createDocumentFragment()
    const nombresCategoriasArr = payload.map( categorias => categorias.nombre )
    nombresCategoriasArr.forEach( nombre => {
        const selection = document.createElement('OPTION')
        selection.classList.add(nombre)
        selection.innerHTML = nombre
        fragment.appendChild(selection)
    })
    selectCategorias.appendChild(fragment)
})