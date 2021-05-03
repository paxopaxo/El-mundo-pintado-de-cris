

const popup = document.querySelectorAll('#popup div')
const products = document.querySelectorAll('.products div')


let new_opacity = null

function fade () { // funcion que cada 200ms le suma 0.05 a un numero hasta llegar a 1
	let opacity = 0
	const suma = () => {
		if (opacity >= 1) {
			clearInterval(aburto)
		} else {
			opacity += 0.05
			console.log(String(opacity))
		
}	}
	var aburto = setInterval( suma , 200 )
}


products.forEach( (actual,i) => actual.addEventListener("click", () => {
	popup[i].style.visibility = 'hidden'
	fade()
	// popup[i].style.opacity = new_opacity
}))


// popup[i].style.opacity 
