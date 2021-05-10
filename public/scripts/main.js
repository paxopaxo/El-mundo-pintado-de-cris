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
       
    document.querySelector('.userimg').style.display = 'none'
    document.querySelector('.login').style.display = 'none'
    aboutMe.style.display = 'none'
          
    setInterval(() => {    
        if (window.scrollY > 85) {  
            header.style.height = '125px'
        } else { 
            header.style.height = ''
        } 
    }, 200)   
}  