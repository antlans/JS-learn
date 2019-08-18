'use strict'
let startButton = document.getElementById('start');
let budgetValue = document.getElementsByClassName('budget-value')[0];
let dayBudgetValue = document.getElementsByClassName('daybudget-value')[0];
let levelValue = document.getElementsByClassName('level-value')[0];
let expensesValue = document.getElementsByClassName('expenses-value')[0];
let optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0];
let incomeValue = document.getElementsByClassName('income-value')[0];
let monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0];
let yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0];
let yearValue = document.getElementsByClassName('year-value')[0];
let monthValue = document.getElementsByClassName('month-value')[0];
let dayValue = document.getElementsByClassName('day-value')[0];
let expensesItem = document.getElementsByClassName('expenses-item');
let buttonExpensesItemBtn = document.getElementsByTagName('button')[0];
let buttonOptionalExpensesBtn = document.getElementsByTagName('button')[1];
let buttonCountBudgetBtn = document.getElementsByTagName('button')[2];
let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');

console.log(optionalExpensesItem);

// Главный объекта
let appData = {
    budget: '',                    // получаем бюджет от пользователя
    expenses: {},                  // обязательные расходы
    optionalExpenses: {},          // необязательные расходы
    income: [],                    // массив дополнительных доходов
    savings: true,                 // остаток (депозит)
    date: '',                      // получем дату
    // Функция расчета дневного бюджета (без учета затрат)
    detectDayBudget: function() {
        appData.moneyPerDay = +(appData.budget / 30).toFixed(1); //создаем свойство объекта 
        alert ("Ежедневный бюджет: " + appData.moneyPerDay);
    },
    // Основные расходы за месяц
    chooseExpenses: function() {
        for ( let i = 0; i < 1; i++ ) {

            let expensesName = prompt ("Название статьи расходов в этом месяце", "");    //название обязательной статьи
            let expensesValue = +prompt ("Каковы затраты на эту статью расходов?", "");  //сумма обязательной статьи  
        
            if ((typeof(expensesName)) === 'string' && (typeof(expensesName)) != null && (typeof(expensesValue)) != null && (typeof(expensesValue)) === 'number' && expensesName != '' && expensesValue != '' && expensesName.length < 50 ) {
                appData.expenses[expensesName] = expensesValue;
            } else {
                i = i - 1;
            }
        }
    },

    // Дополнительные расходы замесяц 
    chooseOptExpenses: function() {
        for ( let i = 0; i < 3; i++ ) {

            let expensesValueOpt = +prompt ("Укажите дополнительные расходы", "");  //сумма обязательноЙ статьи  
        
            if ((typeof(expensesValueOpt)) != null && (typeof(expensesValueOpt)) === 'number' && expensesValueOpt != '' ) {
                appData.optionalExpenses[i + 1] = expensesValueOpt;
            } else {
                i = i - 1;
            }
        }
    },
    // Расчет уровня состояния
    detectLevel: function () { 
        if (appData.moneyPerDay < 500) {
            console.log ("Ты бедный");
        } else if (appData.moneyPerDay >= 500 && appData.moneyPerDay <= 2000) {
            console.log ("Ты средний класс");
        } else if (appData.moneyPerDay > 2000) {
            console.log ("Ты богатый");
        } else {
            console.log ("Error");
        };
    },
    // Расчет суммы накоплений
    checkSavings: function() {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?");
            let percent = +prompt("Под какой процент?");
    
            appData.monthIncome = +(save/100/12*percent).toFixed(1);
    
            alert('Доход в месяц: ' + appData.monthIncome);
        }
    },

    // Дополнительный доход
    chooseIncome: function() {
        
        for ( let i = 0; i < 1; i++ ) {
            let items = prompt('Что принесет дополнительным доход? (Необходимо перечилсить через запятую)', "");
            if (items != '') {
               
                appData.income = items.split(', ');
                appData.income.push(prompt('Что-то еще?'));
                appData.income.sort();

                console.log("Способы дополнительного заработка:");
                appData.income.forEach(myFunc);
                function myFunc(item, index) {
                    console.log((index+1) + ': ' + item);
                };
            } else {
                i = i - 1;
            }
        }
    }

    /* && (typeof(items)) != null && (typeof(items)) === 'sting' */
};

// Сумма дохода в месяц с указанием даты
function start() {
    appData.budget = +prompt ("Ваша зарплата в месяц?", 100000); 
    appData.date = prompt ("Введите дату в формате: YYYY-MM-DD", ""); 

    while(isNaN(appData.budget) || appData.budget == "" || appData.budget == null) {
        appData.budget = +prompt ("Ваша зарплата в месяц?", 100000); 
    }
}
start();

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log(key + ': ' + appData[key]);
};
 
console.log (appData);
