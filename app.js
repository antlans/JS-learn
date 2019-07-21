"use strict";

let money = +prompt ("Ваша зарплата в месяц?", 100000); 
let time = prompt ("Введите дату в формате: YYYY-MM-DD", ""); 
       
let appData = {
    budget: money,                   //получаем бюджет от пользователя
    expenses: {},                    //обязательные расходы
    optionalExpenses: null,          //необязательные расходы
    income: null,                    //дополнительные доходы
    savings: false,                  //остаток
    date: time,                      //получем дату
};
console.log (appData);

for ( let i = 0; i < 1; i++ ) {

    let expensesName = prompt ("Название статьи расходов в этом месяце", "");    //название обязательной статьи
    let expensesValue = +prompt ("Каковы затраты на эту статью расходов?", "");  //сумма обязательноЙ статьи  

    if ((typeof(expensesName)) === 'string' && (typeof(expensesName)) != null && (typeof(expensesValue)) != null && (typeof(expensesValue)) === 'number' && expensesName != '' && expensesValue != '' && expensesName.length < 50 ) {
        appData.expenses[expensesName] = expensesValue;
    } else {
        i = i - 1;
    }
}

appData.moneyPerDay = appData.budget / 30;
console.log (appData.moneyPerDay);
alert ("Ежедневный бюджет:" + appData.moneyPerDay);

if (appData.moneyPerDay < 500) {
    console.log ("Low");
} else if (appData.moneyPerDay >= 500 && appData.moneyPerDay < 2000) {
    console.log ("Middle");
} else if (appData.moneyPerDay >= 2000) {
    console.log ("Rich");
} else {
    console.log ("Error");
};
