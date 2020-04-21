class Calculator {
    // where to place text
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
        }
 
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined // no operation selected

    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1); // removing last character of the string

    }

    appendNumber(number){

        if (number === '.' &&this.currentOperand.includes('.')) return // only one point can be used as input
        this.currentOperand = this.currentOperand.toString() + number.toString(); // makes possible to put in various numbers
    }

    chooseOperation(operation){
        if (this.currentOperand ==='') return // no execution when current is empty
        if (this.previousOperand !== '') { // if there is something in the previous do a computation with the current
            this.compute()
        } 
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute() {
        let computation
        const prev= parseFloat(this.previousOperand) // number for previous
        const current= parseFloat(this.currentOperand) // number for current
        if(isNaN(prev) || isNaN(current)) return // if number ==> do following operations
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev*current
                break
            case '/':
                computation = prev/current
                break
            case '%':
                computation =prev%current
                break
            default: 
            return
        }
    this.currentOperand = computation // current operand becomes the result 
    this.operation = undefined // make selecting a new one possible
    this.previousOperand = '' // cleared
    }
    getDisplayNumber (number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat (stringNumber.split('.')[0]) // take numbers before point and make it a number
        const decimalDigits = stringNumber.split('.')[1] // takes numbers behind point
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay =''
        }
        else {
            integerDisplay= integerDigits.toLocaleString('en',{
                maximumFractionDigits: 0
            }) // no decimal places 
        }
        if (decimalDigits!= null){
            return `${integerDisplay}.${decimalDigits}`

        }
        else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)// updates screen so numbers can be seen in the output container and are displayed the right way
        if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText =''
        }
    }

}



// link to html elements
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//hooking up all variables (html elements) to calculator
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })

  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})