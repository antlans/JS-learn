// Главный объекта
let appData = {
    budget: '',                   //получаем бюджет от пользователя
    expenses: {},                    //обязательные расходы
    optionalExpenses: null,          //необязательные расходы
    income: null,                    //дополнительные доходы
    savings: true,                   //остаток (депозит)
    date: '',                      //получем дату
};

//Функция для уточнения суммы дохода и даты
function start() {
    appData.budget = +prompt ("Ваша зарплата в месяц?", 100000); 
    appData.date = +prompt ("Введите дату в формате: YYYY-MM-DD", ""); 

    while(isNaN(appData.budget) || appData.budget == "" || appData.budget == null) {
        appData.budget = +prompt ("Ваша зарплата в месяц?", 100000); 
    }
}
start();
 
// Функция для получения сумм расходов за месяц
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

// Функция расчета дневного бюджета (без учета затрат)
function detectDayBudget() {
    appData.moneyPerDay = +(appData.budget / 30).toFixed(1); //создаем свойство объекта 
    alert ("Ежедневный бюджет: " + appData.moneyPerDay);
}
detectDayBudget();


// Расчет уровня доходности
if (appData.moneyPerDay < 500) {
    console.log ("Low");
} else if (appData.moneyPerDay >= 500 && appData.moneyPerDay < 2000) {
    console.log ("Middle");
} else if (appData.moneyPerDay >= 2000) {
    console.log ("Rich");
} else {
    console.log ("Error");
};

// Расчет суммы накоплений
function checkSavings() {
    if (appData.savings == true) {
        let save = +prompt("Какова сумма накоплений?");
        let percent = +prompt("Под какой процент?");

        appData.monthIncome = (save/100/12*percent).toFixed(1);

        alert('Доход в месяц: ' + appData.monthIncome);
    }
}
checkSavings();