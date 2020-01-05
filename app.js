'use strict';

// Input
let incomeItem = document.querySelector(".income__item"); // Зарплата
let optionalIncomeItem = document.querySelector('.optional-income__item'); // Дополнительные доходы
let expensesItem = document.querySelectorAll('.expenses__item');
let expensesBtn = document.querySelector('.expenses__btn');
let optionalExpensesItem = document.querySelectorAll('.optional-expenses__item');
let optionalExpensesBtn = document.querySelector('.optional-expenses__btn');

// Result
let budgetValue = document.querySelector('.budget-value'); // Зарплата
let incomeValue = document.getElementsByClassName('income-value')[0]; // Дополнительные доходы
let expensesValue = document.querySelector('.expenses__value'); // Расходы
let optionalExpensesValue = document.querySelector('.expenses-optional__value'); // Дополнительные расходы
let dayBudgetValue = document.getElementsByClassName('daybudget-value')[0]; //бюджет на 1 день
let levelValue = document.getElementsByClassName('level-value')[0]; //классификация состония доходов
let monthsavingsValue = document.querySelector('.monthsavings__value'); // Накопления (месяц)
let yearsavingsValue = document.querySelector('.yearsavings__value'); // Накопления (год)

// Что-то связанное с датами (год, месяц, день)
let yearValue = document.getElementsByClassName('year-value')[0];
let monthValue = document.getElementsByClassName('month-value')[0];
let dayValue = document.getElementsByClassName('day-value')[0];

// Глобальный запуск расчета
let startButton = document.getElementById('start');

let countBudgetBtn = document.getElementsByTagName('button')[2];

let checkSavings = document.getElementById('savings');
let sumValue = document.getElementById('sum');
let percentValue = document.getElementById('percent');

// Главный объекта
let appData = {
    budget: '',                   // зарплата
    optionalIncome: [],           // массив дополнительных доходов        
    expenses: {},                 // обязательные расходы
    optionalExpenses: {},         // необязательные расходы              
    savings: false,               // остаток (депозит)
    date: '',                     // получем дату
};

// Сумма дохода в месяц с указанием даты
startButton.addEventListener('click', function () {
	appData.date = prompt ("Введите дату в формате: YYYY-MM-DD", "");
  
	yearValue.value = new Date(Date.parse(appData.date)).getFullYear();
	monthValue.value = new Date(Date.parse(appData.date)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(appData.date)).getDate();
});

// Фиксация и выведение основного дохода
incomeItem.addEventListener('input', function() {
    appData.budget = +incomeItem.value; 

	budgetValue.textContent = appData.budget.toFixed();
});

// Подсчет и выведение дополнитеьлных расходов
optionalIncomeItem.addEventListener('input', function() {
    
    let items = optionalIncomeItem.value; // получаю строку через ","
    appData.optionalIncome = items.split(',').map(Number); // преобразование строки в массив из N кол-ва элементов
   
    // Сложение элементов массива
    let sum = 0; 
    for (let i = 0; i < appData.optionalIncome.length; i++) {
        let a = appData.optionalIncome[i];
        sum += a;
    }; 

    // Выведение в DOM суммы элементов массива
    incomeValue.textContent = sum;
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

// Управление отображением элементами интерфейса
document.addEventListener("DOMContentLoaded", function() {
    //styles
    /* let aside = document.getElementsByTagName('aside')[0],
    main = document.getElementsByTagName('main')[0];
    aside.style.top = '60px';
    main.style.top = '60px'; */
    
    // active and deactive navigation panel
    document.getElementById('header__trigger').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.header__trigger').classList.toggle('active'); 
        document.querySelector('.nav').classList.toggle('active');
        document.querySelector('main').classList.toggle('active'); 
    });

    // Tabs
    // Documents - tabs
    document.querySelectorAll('[data-tabs]').forEach(function(element){
        element.addEventListener("click" , function(e) {
            e.preventDefault();

            // tabs
            if(!element.classList.contains('active')) {
                if(document.querySelector('.li-content.active'))
                    document.querySelector(".li-content.active").classList.remove('active');
                element.classList.add('active');
            } 

            //content
            if(document.querySelector('.component.active'))
                document.querySelector(".component.active").classList.remove('active');   
            document.querySelector('.' + this.dataset.tabs).classList.add('active');
        });
    });
});