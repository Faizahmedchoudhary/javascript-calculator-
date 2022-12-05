
console.log("Calcultor JS");

let previousoperandata = document.querySelector('.previous-operand');
let currentoperandata = document.querySelector('.current-operand');

let deletevalue = document.getElementById("delete")
let allClear = document.getElementById("allClear")

class Calcultor {

    constructor(previousoperandata, currentoperandata) {
        this.previousoperandata = previousoperandata
        this.currentoperandata = currentoperandata
        this.clear()
    }

    clear() {
        this.previousoperand = ''
        this.currentoperand = '0'
        this.operator = undefined
    }

    delete() {
        this.currentoperand = this.currentoperand.slice(0, -1)
    }

    numbers = (number) => {
        if (number === '.' && this.currentoperand.includes('.')) return alert("cant use . more than once")
        this.currentoperand += number
    }

    operators = (operation) => {
        if (this.currentoperand === '') return
        if (this.previousoperand !== '') {
            this.compute()
        }

        this.operator = operation
        this.previousoperand = this.currentoperand
        this.currentoperand = ''
    }

    getDisplaynumber(number) {
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString("en")
    }

    updateDisplay() {
        currentoperandata.innerText = this.getDisplaynumber(this.currentoperand);
        if (this.operator != null) {
            previousoperandata.innerText = `${this.getDisplaynumber(this.previousoperand)}  ${this.operator}`
        }
        else {
            previousoperandata.innerText = ''
        }

    }

    compute() {
        let computate
        let previous = parseFloat(this.previousoperand);
        let current = parseFloat(this.currentoperand);

        if (isNaN(previous) || isNaN(current)) return

        switch (this.operator) {
            case '+':
                computate = previous + current
                break;

            case '-':
                computate = previous - current
                break;

            case 'x':
                computate = previous * current
                break;

            case '/':
                computate = previous / current
                break;


            case '%':
                computate = previous % current
                break;

            default:
                return
        }
        this.currentoperand = computate;
        this.operator = undefined;
        this.previousoperand = ''
    }

};



const calcultor = new Calcultor();

// taks a No from user
const allNumbers = document.querySelectorAll('[data-numbers]');
allNumbers.forEach((element) => {
    element.addEventListener("click", () => {
        calcultor.numbers(element.value)
        calcultor.updateDisplay()
    })
});

// operation btn 
let Operationbtn = document.querySelectorAll('[data-operator]');
Operationbtn.forEach((element) => {

    element.addEventListener("click", () => {
        calcultor.operators(element.value);
        console.log(element.value);
        calcultor.updateDisplay();
    })
})

// All CLear
allClear.addEventListener("click", () => {
    calcultor.clear();
    calcultor.updateDisplay()
})

// Get the final Answer
document.getElementById("last-btn").addEventListener("click", () => {
    calcultor.compute()
    calcultor.updateDisplay()
})


// delete a single  no
deletevalue.addEventListener("click", () => {
    calcultor.delete()
    calcultor.updateDisplay()
})








