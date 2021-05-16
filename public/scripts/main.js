const product1 = document.querySelector('.product1')
const header = document.querySelector('.header')
const aboutMe = document.querySelector('.about-me')

// product1.style.display = 'none'

function disableScroll(bool) {
    if (bool) {
        document.querySelector('body').classList.add('remove-scrolling')
    } else {
        document.querySelector('body').classList.remove('remove-scrolling')
    }
} 
 
document.querySelector('.login').addEventListener('click', () => {
    window.location.pathname = '/register'
})

document.querySelector('.mundo-pintado').addEventListener('click', () => {
    window.location.pathname = '/'
})


if (screen.width <= 768) {
    const responsiveMenu = document.querySelector('.responsive-menu')
    const divClose = document.querySelector('.close')

    aboutMe.addEventListener('touchend', () => {

        const { left } = responsiveMenu.style

        if (!left) {
            responsiveMenu.style.left = '0'
            disableScroll(true)
        } else {  
            responsiveMenu.style.left = ''  
            disableScroll(false)
        }
    })

    divClose.addEventListener('touchend', () => {
        responsiveMenu.style.left = ''
        disableScroll(false)   
    })
    
} else {         

    aboutMe.style.display = 'none'
          
    setInterval(() => {    
        if (window.scrollY > 85) {  
            header.style.height = '125px'
        } else { 
            header.style.height = ''
        } 
    }, 200)   
}  