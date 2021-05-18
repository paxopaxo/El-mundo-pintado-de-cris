"strict mode"

// DOM Elements definition

const mainPageURL = location.href.split('/').slice(0,-1).join('/')

const loginContainer = document.querySelector('.logeo')

const loginSubmit = document.querySelector('.login-submit')
const loginPassword = document.querySelector('.login-password')
const loginEmail = document.querySelector('.login-email')
const btnCreateAccount = document.querySelector('.btn-create-account')

const registerContainer = document.querySelector('.registro')

const registerEmail = document.querySelector('.register-email')
const registerUsername = document.querySelector('.register-username')
const registerPassword = document.querySelector('.register-password')
const registerSubmit = document.querySelector('.register-submit')

const btnLoginAccount = document.querySelector('.btn-login-account')



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
// addEventListener defined Callbacks

const loginSubmitClick = async(e) => {
    e.preventDefault()

    const url = mainPageURL + '/api/login'
    
    const div = document.querySelector('.logeo-server-response')
    div.style.opacity = ''
    div.innerHTML = ''

    const exist = [ Boolean(loginEmail.value), Boolean(loginPassword.value)]
    if( exist.includes(false) ) {
        return 
    }

    const data = {
        correo: loginEmail.value,
        pass: loginPassword.value
        
    }
    loginPassword.value = ''
    loginEmail.value = ''
    
    const response = await makePettition(url,data,'POST')
    const dataRecived = await response.json()
    
 
    if(response.ok) {
        const divInside = document.createElement('DIV')
        divInside.innerHTML = dataRecived.msg
        div.appendChild(divInside)

        localStorage.setItem('token', JSON.stringify(dataRecived.JWT) )

        if(dataRecived.isAdmin) {
            setTimeout( () => {
                window.location.pathname = '/config'
            }, 1200)
        } else {
            setTimeout( () => {
                window.location.pathname = '/'
            }, 1200)
        }
        
    } else {
        if(dataRecived.errors) {
            const fragment = document.createDocumentFragment()
            const arrayErrors = dataRecived.errors.map( (element) => element.msg )
            arrayErrors.forEach( msg => {
                const divInside = document.createElement('DIV')
                divInside.innerHTML = msg
                fragment.appendChild(divInside)
            })

            div.appendChild(fragment)
        }
    }
    div.style.opacity = '1'
}

const registerSubmitClick = async(e) => {
    e.preventDefault()
    const div = document.querySelector('.register-server-response')
    const url = mainPageURL + '/api/usuarios'
    
    div.innerHTML = ''
    div.style.opacity = ''

    const exist = [ Boolean(registerUsername.value), Boolean(registerEmail.value), Boolean(registerPassword.value)]
    if( exist.includes(false) ) {
        return 
    }

    const data = {
        username: registerUsername.value,
        correo: registerEmail.value,
        pass: registerPassword.value
    }
    
    registerUsername.value = ''
    registerEmail.value = ''
    registerPassword.value = ''
    
    const response = await makePettition(url,data,'POST')
    const dataRecived = await response.json()

    if(response.ok) {
        const divInside = document.createElement('DIV')
        divInside.innerHTML = dataRecived.msg
        div.appendChild(divInside)
        
        setTimeout( () => {
            window.location.reload()
        }, 1500)
        
    } else {
        if(dataRecived.errors) {
            const fragment = document.createDocumentFragment()
            const arrayErrors = dataRecived.errors.map( element => element.msg )

            arrayErrors.forEach( text => {
                const newDiv = document.createElement('DIV')
                newDiv.innerHTML = text
                fragment.appendChild(newDiv)
            })
            div.appendChild(fragment)
        }
    }
    div.style.opacity = '1'
    
}

// AddEventListeners

btnCreateAccount.addEventListener('click', () => {
    loginContainer.style.display = 'none'
    registerContainer.style.display = 'grid'
})

btnLoginAccount.addEventListener('click', () => {
    loginContainer.style.display = ''
    registerContainer.style.display = ''
})

registerSubmit.addEventListener('click', registerSubmitClick)

loginSubmit.addEventListener("click", loginSubmitClick) 