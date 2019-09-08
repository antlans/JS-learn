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
let expensesBtn = document.getElementsByTagName('button')[0];
let optionalExpensesBtn = document.getElementsByTagName('button')[1];
let countBudgetBtn = document.getElementsByTagName('button')[2];
let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');
let incomeItem = document.querySelector('.choose-income'); 
let checkSavings = document.getElementById('savings');
let sumValue = document.getElementById('sum');
let percentValue = document.getElementById('percent');



// Главный объекта
let appData = {
    budget: '',                    // получаем бюджет от пользователя
    expenses: {},                  // обязательные расходы
    optionalExpenses: {},          // необязательные расходы
    income: [],                    // массив дополнительных доходов
    savings: false,                 // остаток (депозит)
    date: '',                      // получем дату
};

// Сумма дохода в месяц с указанием даты
startButton.addEventListener('click', function () {
	appData.date = prompt ("Введите дату в формате: YYYY-MM-DD", "");
    appData.budget = +prompt ("Ваша зарплата в месяц?", 100000); 
     

    while(isNaN(appData.budget) || appData.budget == "" || appData.budget == null) {
        appData.budget = +prompt ("Ваша зарплата в месяц?", 100000); 
	}
	
	budgetValue.textContent = appData.budget.toFixed();
	yearValue.value = new Date(Date.parse(appData.date)).getFullYear();
	monthValue.value = new Date(Date.parse(appData.date)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(appData.date)).getDate();
});


incomeItem.addEventListener('input', function() {
	let items = incomeItem.value;
	appData.income = items.split(', ');
	incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
	if (appData.savings == true) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});


// Накопления
sumValue.addEventListener('input', function() {
	if (appData.savings == true) {

		let sum = +sumValue.value;
		let percent = +percentValue.value;

		appData.monthIncome = (sum/100/12*percent).toFixed(1);
		appData.yearIncome = (sum/100*percent).toFixed(1);

		monthsavingsValue.textContent = appData.monthIncome;
		yearsavingsValue.textContent = appData.yearIncome;



	}
});

percentValue.addEventListener('input', function() {
	if (appData.savings == true) {
		let sum = +sumValue.value;
		let percent = +percentValue.value;

		appData.monthIncome = (sum/100/12*percent).toFixed(1);
		appData.yearIncome = (sum/100*percent).toFixed(1);

		monthsavingsValue.textContent = appData.monthIncome;
		yearsavingsValue.textContent = appData.yearIncome;
		
	}
});

// Обязательные расходы
expensesBtn.addEventListener('click', function() {
	let sum = 0;

	for ( let i = 0; i < expensesItem.length; i++ ) {
		
		if (typeof expensesItem[i+1] !== undefined) {
			let a = expensesItem[i].value, //название обязательной статьи  
				b = +expensesItem[++i].value; //сумма обязательной статьи  
			console.log(a);
			console.log(b);
			if ((typeof(a)) === 'string' && 
				(typeof(a)) != null && 
				(typeof(b)) != null && 
				a != '' && 
				b != '' && 
				a.length < 50 ) {
				appData.expenses[a] = b;
				sum += b;
			} else {
				i = i - 1;
			}
		}

		
	}
	expensesValue.textContent = sum;

});

// Дополнительные расходы
 optionalExpensesBtn.addEventListener('click', function() {

	let sum = 0;

	for ( let i = 0; i < optionalExpensesItem.length; i++ ) {

		let a = +optionalExpensesItem[i].value;  //сумма обязательноЙ статьи  
	
		if ((typeof(a)) != null && (typeof(a)) === 'number' && a != '' ) {
			appData.optionalExpenses[i] = a;
			sum += a;
		} else {
			i = i - 1;
		}
	}
	optionalExpensesValue.textContent = sum;

 });


countBudgetBtn.addEventListener('click', function () {

	appData.moneyPerDay = +(appData.budget / 30).toFixed(); //создаем свойство объекта 

	dayBudgetValue.textContent = appData.moneyPerDay;

	if (appData.moneyPerDay < 500) {
		levelValue.textContent = "Ты бедный";
	} else if (appData.moneyPerDay >= 500 && appData.moneyPerDay <= 2000) {
		levelValue.textContent = "Ты средний класс";
	} else if (appData.moneyPerDay > 2000) {
		levelValue.textContent = "Ты богатый";
	} else {
		levelValue.textContent = "Error";
	};
});
// console.log (appData);
