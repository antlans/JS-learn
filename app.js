let money,
    time;

let appData = {
    budget: money,                   //получаем бюджет от пользователя
    expenses: {},                    //обязательные расходы
    optionalExpenses: null,          //необязательные расходы
    income: null,                    //дополнительные доходы
    savings: true,                  //остаток
    date: time,                      //получем дату
};

function start() {
    money = +prompt ("Ваша зарплата в месяц?", 100000); 
    time = prompt ("Введите дату в формате: YYYY-MM-DD", ""); 

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваша зарплата в месяц?", 100000); 
    }
}
start();
       


function chooseExpenses() {
    for ( let i = 0; i < 1; i++ ) {

        let expensesName = prompt ("Название статьи расходов в этом месяце", "");    //название обязательной статьи
        let expensesValue = +prompt ("Каковы затраты на эту статью расходов?", "");  //сумма обязательноЙ статьи  
    
        if ((typeof(expensesName)) === 'string' && (typeof(expensesName)) != null && (typeof(expensesValue)) != null && (typeof(expensesValue)) === 'number' && expensesName != '' && expensesValue != '' && expensesName.length < 50 ) {
            appData.expenses[expensesName] = expensesValue;
        } else {
            i = i - 1;
        }
    }
}
chooseExpenses();


appData.moneyPerDay = (appData.budget / 30).toFixed(1);
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


function checkSavings() {
    if (appData.savings == true) {
        let save = +prompt("Какова сумма накоплений?");
        let percent = +prompt("Под какой процент?");

        appData.monthIncome = save/100/12*percent;

        alert('Доход в месяц:' + appData.monthIncome);
    }
}
checkSavings();