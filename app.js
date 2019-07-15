"use strict";

let money = prompt ("Какой ваш бюджет на месяц?", 100000); 
let time = prompt ("Введите дату в формате: YYYY-MM-DD", ""); 
let expensesName = prompt ("Название статьи расходов в этом месяце", ""); //название обязательной статьи
let expensesValue = prompt ("Во сколько обойдется?", "");                  //сумма обязательноЙ статьи         

let appData = {

    budget: money,                  //получаем бюджет
    date: time,                      //получем дату
    expenses: {
        [expensesName] : expensesValue
    },                                  //обязательные расходы
    optionalExpenses: null,          //необязательные расходы
    income: null,                    //дополнительные доходы
    savings: false,                  //остаток

};

console.log (appData);

let result = (appData.budget - appData.expenses[expensesName])/30;
console.log (result);
alert (result);