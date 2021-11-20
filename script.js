let minValue, maxValue, answerNumber, orderNumber, gameRun;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

/*Функция превращения числа в тестовое представление*/
function numberToText(requiredNumber) {

    let simpleNumbers = ['Один', 'Два', 'Три', 'Четыре', 'Пять', 'Шесть', 'Семь', 'Восемь', 'Девять', 'Десять', 'Одиннадцать', 'Двенадцать', 'Тринадцать', 'Четырнадцать', 'Пятнадцать', 'Шестнадцать', 'Семнадцать', 'Восемнадцать', 'Девятнадцать'];
    let lessThanHundred = ['Двадцать', 'Тридцать', 'Сорок', 'Пятьдесят', 'Шестьдесят', 'Семьдесят', 'Восемьдесят', 'Девяносто'];
    let lessThanThousand = ['Сто', 'Двести', 'Триста', 'Четыреста', 'Пятьсот', 'Шестьсот', 'Семьсот', 'Восемьсот', 'Девятьсот'];
    
    let textNum;

    Math.sign(requiredNumber) == -1 ? (textNum = "Минус ", requiredNumber = Math.abs(requiredNumber)) : textNum = "";

    function checkIfSimpleNumber(requiredNumber) {
        if (requiredNumber%100 < 20 && requiredNumber%100 != 0) {
            return simpleNumbers[requiredNumber%100 - 1];
        } else if (requiredNumber%100 == 0) {
            return "";
        } else {
            return (Math.floor(requiredNumber/10)%10 == 0 ? "" : lessThanHundred[Math.floor(requiredNumber/10)%10 - 2]) + " " + (requiredNumber%10 == 0 ? "" : simpleNumbers[requiredNumber%10 - 1]);
        }
    }

    if(requiredNumber == 0) {
        textNum += 'Ноль';
    }

    if(requiredNumber > 0 && requiredNumber < 20) {
        textNum += simpleNumbers[requiredNumber-1];
    }

    if(requiredNumber >= 20 && requiredNumber <= 100) {
        if(requiredNumber != 100) {
            textNum += lessThanHundred[Math.floor(requiredNumber/10) - 2] + " " + (requiredNumber%10 == 0 ? "" : simpleNumbers[requiredNumber%10 - 1]);
        } else {
            textNum += lessThanThousand[0];
        }
    }

    if(requiredNumber > 100 && requiredNumber <= 1000) {
        if(requiredNumber != 1000) {
            textNum += lessThanThousand[Math.floor(requiredNumber/100) - 1] + " " + checkIfSimpleNumber(requiredNumber);
        } else {
            textNum += 'Тысяча';
        }
    }

    return '\n' + textNum;
}

/*Функция случайного вопроса*/
function randomAnswer(answerNumber) {
    let randomN = Math.round(Math.random()*3);
    switch (randomN) {
      case 1:
        return `Да это легко! Ты загадал ${answerNumber }?`;
        break;
      case 2:
        return `Наверное, это число ${answerNumber }?`;
        break;
      case 3:
        return `Пфф, да это ${answerNumber }?`;
        break;
      default:
        return `Вы загадали число ${answerNumber }?`;
        break;
    }
}

/*Функция случайного ответа-успеха*/
function randomSuccess() {
    let randomN = Math.round(Math.random()*3);
    switch (randomN) {
      case 1:
        return `Я крут\n\u{1F60E}`;
        break;
      case 2:
        return `Было легко\n\u{1F60E}`;
        break;
      case 3:
        return `Проще простого\n\u{1F60E}`;
        break;
      default:
        return `Я всегда угадываю\n\u{1F60E}`;
        break;
    }
}

function GameStart() {
    minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
    maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));

    /*проверка на NaN*/
    if(Number.isNaN(minValue)) {
        minValue = 0;
    }
    if(Number.isNaN(maxValue)) {
        maxValue = 100;
    }
    /*проверка на NaN*/


    /*округление до ближайшей границы*/
    minValue < -999 ? (minValue = -999) : "";
    maxValue > 999 ? (maxValue = 999) : "";
    /*округление до ближайшей границы*/

    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = orderNumber;

    answerField.innerText = randomAnswer(answerNumber);
    answerField.innerText += numberToText(answerNumber);
}

GameStart();

/*Кнопка Заново*/
document.getElementById('btnRetry').addEventListener('click', function () {
    GameStart();
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;

            answerField.innerText = randomAnswer(answerNumber);
            answerField.innerText += numberToText(answerNumber);
        }
    }
})

/*Кнопка Меньше*/
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.ceil((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;


            answerField.innerText = randomAnswer(answerNumber);
            answerField.innerText += numberToText(answerNumber);
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText = randomSuccess();
        gameRun = false;
    }
})