//initialization
let numField = document.getElementById('numField');
numField.value = 0;
let fromScreenValue = 0;
let firstArg = 0;
let secondArg = 0;
let mathAction;
let currentIsNegative = false;
let endOfOperation = false;
let result;
let formatter = new Intl.NumberFormat('ru', { maximumFractionDigits: 8 });

let initialization = function () {
    numField.value = 0;
    fromScreenValue = 0;
    firstArg = 0;
    secondArg = 0;
    mathAction = undefined;
    currentIsNegative = false;
    endOfOperation = false;
    result = undefined;
}

let next = function (mathLogicFunc) {
    numField.value = 0;
    if (endOfOperation) {
        firstArg = result;
        endOfOperation = false;
    }
    else {
        firstArg = fromScreenValue;
    }
    fromScreenValue = 0;
    mathAction = mathLogicFunc;

}

//math logic
let addition = () => {
    return +firstArg + +secondArg;
}

let subtraction = function () {
    return +firstArg - +secondArg;
}

let division = function () {
    if (+secondArg == 0) {
        alert('Chuck! Is it you?');
        initialization();
        return 0;
    }

    return +firstArg / +secondArg;
}

let multiply = function () {
    return +firstArg * +secondArg;
}


//commands
//clear field
let clear_Key = document.getElementById('clear_Key');
clear_Key.onclick = () => initialization();


//change math sign
let changeSign_Key = document.getElementById('changeSign_Key');
changeSign_Key.onclick = () => {
    if (endOfOperation) {
        fromScreenValue = result;
    }

    if (currentIsNegative) {
        fromScreenValue = Math.abs(fromScreenValue);
        numField.value = formatter.format(fromScreenValue);;
    }
    else {
        fromScreenValue = fromScreenValue * (-1);
        numField.value = formatter.format(fromScreenValue);;
    }
}



let cents_Key = document.getElementById('cents_Key');

//division
let division_Key = document.getElementById('division_Key');
division_Key.onclick = () => next(division);

//multiply
let multiply_Key = document.getElementById('multiply_Key');
multiply_Key.onclick = () => next(multiply);

//subtraction
let subtraction_Key = document.getElementById('subtraction_Key');
subtraction_Key.onclick = () => next(subtraction);

//addition
let addition_Key = document.getElementById('addition_Key');
addition_Key.onclick = () => next(addition);

//get result
let result_Key = document.getElementById('result_Key');
result_Key.onclick = () => {
    if (mathAction === undefined) {
        return
    }
    endOfOperation = true;
    secondArg = fromScreenValue;
    firstArg = mathAction();

    numField.value = formatter.format(firstArg)
    result = firstArg;
}


//numbers
//add decimal fraction
let decimal_Key = document.getElementById('decimal_Key');
decimal_Key.onclick = () => {
    if (endOfOperation) {
        initialization();
    }
    fromScreenValue += '.';
    numField.value += ',';
}

//write numbers
let numKey = document.getElementsByClassName('numKeys');

for (let i = 0; i < numKey.length; i++) {
    let currentValue = numKey[i].innerText;
    numKey[i].onclick = () => {

        if (endOfOperation) {
            initialization();
        }

        let cast = String(+fromScreenValue);

        let clearedNumbers = cast.replace(new RegExp("-", 'g'), "");
        clearedNumbers = clearedNumbers.replace(new RegExp(",", 'g'), "");

        if (clearedNumbers.length > 9) {
            return;
        }

        fromScreenValue += currentValue;

        // console.log(fromScreenValue);
        // console.log(+fromScreenValue);

        numField.value = formatter.format(+fromScreenValue);
    }
}



