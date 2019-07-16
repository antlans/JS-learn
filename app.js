"use strict";

let money = prompt ("Какой ваш бюджет на месяц?", 100000); 
let time = prompt ("Введите дату в формате: YYYY-MM-DD", ""); 
       
let appData = {
budget: money,                       //получаем бюджет
    date: time,                      //получем дату
    expenses: {},                    //обязательные расходы
    optionalExpenses: null,          //необязательные расходы
    income: null,                    //дополнительные доходы
    savings: false,                  //остаток

};
console.log (appData);

for ( let i = 0; i < 2; i++) {
    let expensesName = prompt ("Название статьи расходов в этом месяце", "");  //название обязательной статьи
    let expensesValue = prompt ("Во сколько обойдется?", "");                  //сумма обязательноЙ статьи  

    if ((typeof(expensesName)) === 'string' && 
        (typeof(expensesName)) != null && 
        (typeof(expensesValue)) != null && 
        (typeof(expensesValue)) === 'number' &&
        expensesName != '' &&
        expensesValue != '' ) {
        appData.expenses[expensesName] = expensesValue;
    }
   
}


let result = appData.budget / 30;
console.log (result);
alert (result);


