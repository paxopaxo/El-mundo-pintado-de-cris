const token = JSON.parse( localStorage.getItem('token') )

const buscarBtn = document.querySelector('.buscar-form button')
const input = document.querySelector('.buscar-form input')

const responseGrid = document.getElementById('response')


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


buscarBtn.addEventListener('click', async(e) => {
    e.preventDefault()

    const busqueda = input.value
    const seccion = document.querySelector('.buscar-name-container select').value
    
    if( !seccion || !busqueda ) {
        return console.log('Debes buscar algo')
    }

    const url = `${ location.origin }/api/buscar/${ seccion }/${ busqueda }`

    const response = await makePettition({ url, token })
    const dataRecived = await response.json()
    
    
    console.log(dataRecived)

    responseGrid.classList.remove('categorias','productos','usuarios','error')
    responseGrid.innerHTML = '' 

    let firstFragment
    let arrayAgregar
    let tr
    let fragment

    switch (seccion) {
        case 'categorias':
            responseGrid.classList.add('categorias')
            
            // Agregando correo, username y rol 
            firstFragment = document.createDocumentFragment();
            ['Nombre'].forEach( (text) => {
                const th = document.createElement('th')
                th.innerHTML = text
                firstFragment.appendChild(th)
            })
            tr = document.createElement('tr')
            tr.appendChild(firstFragment)
            responseGrid.appendChild(tr)

            //Mostrando en pantalla posible error 
            if(!response.ok) {
                responseGrid.classList.add('error')

                const errTd = document.createElement('td')
                errTd.innerHTML = dataRecived.errors[0].msg 
                const errTr = document.createElement('tr')
                errTr.appendChild(errTd)
                responseGrid.appendChild(errTr)
                return
            }
            // Agregando respuestas del servidor
            arrayAgregar = dataRecived.map( ({ nombre }) => nombre ) // nombre categorias array
            
            fragment = document.createDocumentFragment()
            arrayAgregar.forEach( (text) => {
                const tr = document.createElement('tr')
                const td = document.createElement('td')
                td.innerHTML = text
                tr.appendChild(td)
                fragment.appendChild(tr)
            })
            responseGrid.appendChild(fragment)
            break;
        case 'productos':
            responseGrid.classList.add('productos')

            // Agregando correo, username y rol 
            firstFragment = document.createDocumentFragment();
            ['Nombre','Categoria','Disponible','img','Descripcion','Creador'].forEach( (text) => {
                const th = document.createElement('th')
                th.innerHTML = text
                firstFragment.appendChild(th)
            })
            tr = document.createElement('tr')
            tr.appendChild(firstFragment)
            responseGrid.appendChild(tr)
            
            //Mostrando en pantalla posible error 
            if(!response.ok) {
                responseGrid.classList.add('error')

                const errTd = document.createElement('td')
                errTd.innerHTML = dataRecived.errors[0].msg 
                const errTr = document.createElement('tr')
                errTr.appendChild(errTd)
                responseGrid.appendChild(errTr)
                return
            }
            // Agregando respuestas del servidor
            arrayAgregar = dataRecived.map( ({ nombre, categoria, disponible, img, descripcion, usuario }) => [
                nombre,
                categoria.nombre,
                disponible ? 'Si' : 'No',
                img ? 'Si' : 'Sin imagen',
                descripcion || 'Sin Imagen',
                usuario.username
            ])
            // nombre categorias array
            
            fragment = document.createDocumentFragment()
            arrayAgregar.forEach( ( arrayTds ) => {
                const trFragment = document.createDocumentFragment()
                arrayTds.forEach( (text) => {
                    const td = document.createElement('td')
                    td.innerHTML = text
                    trFragment.appendChild(td)
                })
                const tr = document.createElement('tr')
                tr.appendChild(trFragment)

                responseGrid.appendChild(tr)
            })
            break;
        case 'usuarios':
            responseGrid.classList.add('usuarios')

            // Agregando correo, username y rol 
            firstFragment = document.createDocumentFragment();
            ['Correo','Username','Rol'].forEach( (text) => {
                const th = document.createElement('th')
                th.innerHTML = text
                firstFragment.appendChild(th)
            })
            tr = document.createElement('tr')
            tr.appendChild(firstFragment)
            responseGrid.appendChild(tr) 

            //Mostrando en pantalla posible error 
            if(!response.ok) {
                responseGrid.classList.add('error')

                const errTd = document.createElement('td')
                errTd.innerHTML = dataRecived.errors[0].msg 
                const errTr = document.createElement('tr')
                errTr.appendChild(errTd)
                responseGrid.appendChild(errTr)
                return
            }

            // Agregando las respuestas del servidor 
            arrayAgregar = dataRecived.map( ({correo, username, rol}) => [correo, username, rol] )
        
            arrayAgregar.forEach( (dataArray) => {
                const fragment = document.createDocumentFragment()
                dataArray.forEach( text => {
                    const td = document.createElement('td')
                    td.innerHTML = text
                    fragment.appendChild(td)
                })
                const tr = document.createElement('tr')
                tr.appendChild(fragment)
                responseGrid.appendChild(tr)
            })


            break;
        default:
            console.log('rer')
            break;
    }
})
