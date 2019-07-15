var budget = prompt ("Какой ваш бюджет на месяц?", 100000); 
var date = prompt ("Введите дату в формате: YYYY-MM-DD", ""); 
var expenses1 = prompt ("Введите обязательную статью расходов в этом месяце", ""); //название обязательной статьи
var expenses2 = prompt ("Во сколько обойдется?", "");                              //сумма обязательноЙ статьи         

var appData = {

    appBudget: budget,                  //получаем бюджет
    appDate: date,                      //получем дату
    appExpenses: {
        [expenses1] : expenses2
    },                                  //обязательные расходы
    appOptionalExpenses: null,          //необязательные расходы
    appIncome: null,                    //дополнительные доходы
    appSavings: false,                   //остаток

};

console.log (appData);

var result = (appData.appBudget - appData.appExpenses[expenses1])/30;
console.log (result);
alert (result);