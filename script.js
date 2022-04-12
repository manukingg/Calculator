let image = document.querySelectorAll('img');
let btn = document.querySelectorAll('.btn');
let current = document.querySelectorAll('.number');
let displayNumber = document.getElementById('text')

//cancel dragging for images
image.forEach((attr) => {
    attr.setAttribute("draggable", "false");
})

//styling buttons when mouse click, unclick and leaves it
btn.forEach((button) =>{
    button.addEventListener('mousedown', () =>{
        button.classList.add('click');
        button.addEventListener('mouseup', () => {
            button.classList.remove('click');
        })
        button.addEventListener('mouseleave', () => {
            button.classList.remove('click');
        })
    })

})

current.forEach((currentNumber) => {
    currentNumber.addEventListener('click', () => {
        if (displayNumber.textContent == '0') {
            displayNumber.textContent = ('');
        }
        displayNumber.textContent += (currentNumber.textContent)
    })
})