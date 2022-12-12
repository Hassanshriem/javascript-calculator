class Calculator
{
  constructor(previousText,currentText)
  {
    this.previousText=previousText;
    this.currentText=currentText;
    this.clear();
  }
  add(num1,num2)
  {
    return num1+num2;
  }
  subtract(num1,num2)
  {
    return num1-num2;
  }
  multiply(num1,num2)
  { 
    return num1*num2;
  }
  divide(num1,num2)
  {
    return num1/num2;
  }
  clear()
  {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  delete()
  {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number)
   {
    if(number==='.'&&this.currentOperand.includes('.')) 
    {
      alert("Two dot is not allowed  mathematically");
      return;
    }
    else
    {  
      this.currentOperand = this.currentOperand.toString()+number.toString();  
    }
  }
  chooseOperation(operation) 
  {
    if (this.currentOperand===''&&this.previousOperand==='')
    {
      alert("Begin with a Number");
      return;
    } 
    if (this.currentOperand === ''&&this.previousOperand!=='')
    {
      alert("2 consecutive operations");
      return;
    } 
    if (this.previousOperand!=='')
    {
      this.operate(this.previousOperand,this.currentOperand,this.operation);
    }
    this.operation=operation;
    this.previousOperand=this.currentOperand;
    this.currentOperand='';
  }
  operate(prev,current,operation) 
  {
    let reuslt;
     prev = parseFloat(this.previousOperand);
     current = parseFloat(this.currentOperand);
    operation=this.operation;
    if (isNaN(prev) || isNaN(current))
    {
      alert("missng part of equation");
      return
    } 
    switch (operation)
    {
      case '+':
        reuslt =this.add(prev,current);
        break
      case '-':
        reuslt =this.subtract(prev,current);
        break
      case '*':
        reuslt = this.multiply(prev,current);
        break
      case '/':
        reuslt = this.divide(prev,current);
        break
      default:
        return
    }
    this.currentOperand = reuslt;
    operation = undefined;
    this.operation = operation;
    this.previousOperand = '';
  }
  getDisplayNumber(number) 
  {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay='';
    if (isNaN(integerDigits)) 
    {
      integerDisplay = '';
    } 
    else 
    {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) 
    {
      return `${integerDisplay}.${decimalDigits}`;
    } 
    else 
    {
      return integerDisplay;
    }
  }
  updateDisplay() 
  {
   this.currentText.innerText =this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) 
    {
      this.previousText.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`; 
    } 
    else 
    {
      this.previousText.innerText = '';
    }
  }
  playClickSound()
{
  var audio = new Audio("https://audio.jukehost.co.uk/2fI5suKTnmMHlEP2tAfdUoNDSO9p2zEs");
  audio.play();
}
}
const deleteButton = document.querySelector('#deleteBtn');
const allClearButton = document.querySelector('#allClearBtn');
const numberValuesIds=['#oneBtn','#twoBtn','#threeBtn','#fourBtn','#fiveBtn','#sixBtn','#sevenBtn','#eightBtn','#nineBtn','#zeroBtn','#dotBtn'];
const numberButtons = document.querySelectorAll(numberValuesIds);
const operationValuesIds=['#divideBtn','#multiplyBtn','#plusBtn','#minusBtn'];
const operationButtons = document.querySelectorAll(operationValuesIds);
const equalsButton=document.querySelector('#equalBtn');
const previousText=document.querySelector('#previousField');
const currentText = document.querySelector('#currentField');
const calculator = new Calculator(previousText, currentText);
numberButtons.forEach(button =>
{
  button.addEventListener('click',() =>
  {
    calculator.playClickSound();
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})
operationButtons.forEach(button => {
  button.addEventListener('click',() => {
    calculator.playClickSound();
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})
equalsButton.addEventListener('click',button => {
  calculator.playClickSound();
  calculator.operate(this.previousOperand,this.currentOperand,this.operation);
  calculator.updateDisplay();
})
allClearButton.addEventListener('click',button => {
  calculator.clear();
  calculator.updateDisplay();
})
deleteButton.addEventListener('click',button => {
  calculator.playClickSound();
  calculator.delete()
  calculator.updateDisplay()
})
document.addEventListener('keydown',function (event) {
  calculator.playClickSound();
  let patternForNumbers = /[0-9]/g;
  let patternForOperators = /[+\-*\/]/g
  if(event.key.match(patternForNumbers)) {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  if(event.key==='.') {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  if(event.key.match(patternForOperators)) {
    event.preventDefault();
    calculator.chooseOperation(event.key)
    calculator.updateDisplay()
  }
  if(event.key ==='Enter'||event.key=== '=') {
    event.preventDefault();
    calculator.operate(this.previousOperand,this.currentOperand,this.operation);
    calculator.updateDisplay()
  }
  if(event.key === "Backspace") {
    event.preventDefault();
    calculator.delete();
    calculator.updateDisplay();
  }
  if(event.key == 'Delete') {
    event.preventDefault();
    calculator.clear();
    calculator.updateDisplay();
  }
});