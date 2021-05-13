"strict mode"
const mainPageURL = location.href.split('/').slice(0,-1).join('/')

const btn = document.querySelector('.mundo-pintado')

const loginSubmit = document.querySelector('.login-submit')
const loginPassword = document.querySelector('.login-password')
const loginEmail = document.querySelector('.login-email')

btn.addEventListener('click', () => {
    
    document.querySelector('.logeo').style.display = 'none'
    document.querySelector('.registro').style.display = 'grid'
})

loginSubmit.addEventListener("click", (e) => {
    e.preventDefault()
    const url = mainPageURL + '/api/login'
    const data = {
        pass: loginPassword.value,
        correo: loginEmail.value
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive'
        },
        body: JSON.stringify(data)
        })
        .then(resp => {
            console.log(resp.status)
        })
        .then((data) => {
            localStorage.setItem('mytoken', data.JWT )
            console.log(data.msg)
        })


    })

