let image = document.querySelectorAll('img');
let btn = document.querySelectorAll('.btn');
let current = document.querySelectorAll('.number');
let displayNumber = document.getElementById('text');
let clear = document.getElementById('clear');
let operationButton = document.querySelectorAll('.function')
let simpleExpression = [];

let math_it_up = {
    'root': function (x) { return Math.sqrt(x) },
    'square': function (x) { return Math.pow(x, 2) },
}

let functions = {
    'divide': function (x) { return displayNumber.textContent = (x + '/')},
    'multiply': function (x) {return displayNumber.textContent = (x + '*')},
    'minus': function (x) {return displayNumber.textContent = (x + '-')},
    'plus': function (x) {return displayNumber.textContent = (x + '+')},
    'equals': function (x) {return displayNumber.textContent = (x)}
}

let lastSymbol = {
    'divide': '/',
    'multiply': '*',
    'minus': '-',
    'plus': '+'
}


//cancel dragging for images
image.forEach((attr) => {
    attr.setAttribute("draggable", "false");
})

//styling buttons when mouse click, unclick and leaves it
btn.forEach((button) => {
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

function number () {
    current.forEach((currentNumber) => {
        currentNumber.addEventListener('click', () => {
            if (displayNumber.textContent == '0') {
                displayNumber.textContent = ('');
            }
            if (!(displayNumber.textContent.includes('.') && currentNumber.textContent == '.')) {
                displayNumber.textContent += (currentNumber.textContent);
            }
        })
    })
}

clear.addEventListener ('click', () => {
    displayNumber.textContent = ('0');
    simpleExpression = []
})



function operation () {
    operationButton.forEach((mathFunction) => {
        mathFunction.addEventListener('click', () => {
            if (Object.values(lastSymbol).includes(displayNumber.textContent.charAt(displayNumber.textContent.length - 1))) {
                displayNumber.textContent = displayNumber.textContent.slice(0, displayNumber.textContent.length - 1);
            } else if (mathFunction.id == 'equals') {
                displayNumber.textContent = operate(displayNumber.textContent);

            } else if (mathFunction.id == 'minus' && displayNumber.textContent == '0'){
                displayNumber.textContent = '-';
            } else if (mathFunction.id == 'root' || mathFunction.id == 'square'){
                displayNumber.textContent = operate(displayNumber.textContent);
                displayNumber.textContent = math_it_up[mathFunction.id](displayNumber.textContent)
            } else {
            functions[mathFunction.id](displayNumber.textContent);
            }
        })
    })

}
function operate (expression){
    if (expression.includes('+')) {
        result = expression.split('+').map(part => operate(part))
        return result.reduce((sum, x) => sum + x, 0)
    } else if (expression.includes('-')) {
        result = expression.split('-').map(part => operate(part))
        return result.slice(1).reduce((sum, x) => sum - x, result[0])
    } else if (expression.includes('*')) {
        result = expression.split('*').map(part => operate(part))
        return result.reduce((sum, x) => sum * x, 1)
    } else if (expression.includes('/')) {
        result = expression.split('/').map(part => operate(part))
        return result.slice(1).reduce((sum, x) => sum / x, result[0])
    }
    return parseFloat(expression);
}

function execute () {
        simpleExpression[0] = displayNumber.textContent;
        operate(simpleExpression) 
    }

number();
operation ();

