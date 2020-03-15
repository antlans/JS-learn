// Главный объекта
let appData = {
    income: '',                   // зарплата
    optionalIncome: [],           // массив дополнительных доходов        
    expenses: [],                 // обязательные расходы        // необязательные расходы              
    savings: false,               // остаток (депозит)
    date: '',                     // получем дату
};

// Input
let incomeItem              = document.querySelector(".income__item"), // Зарплата
    optionalIncomeList      = document.querySelector('.optional-income__list'), // Дополнительные доходы: Список
    optionalIncomeBtn       = document.querySelector('.optional-income__form-btn'); // Дополнительные доходы: Кнопка добавления элемента 

let expensesList            = document.querySelector('.expenses__list'); // Получаем список для добавляемых элементов
let expensesFormBtn         = document.querySelector(".expenses__form-btn"); // Кнопка создания элементов

// Result
let budgetValue             = document.querySelector('.budget-value'); // Зарплата
let incomeValue             = document.querySelector('.income-value'); // Дополнительные доходы
let expensesValue           = document.querySelector('.expenses__value'); // Расходы

let dayBudgetValue          = document.getElementsByClassName('daybudget-value')[0]; //бюджет на 1 день
let levelValue              = document.getElementsByClassName('level-value')[0]; //классификация состония доходов
let monthsavingsValue       = document.querySelector('.monthsavings__value'); // Накопления (месяц)
let yearsavingsValue        = document.querySelector('.yearsavings__value'); // Накопления (год)

// Что-то связанное с датами (год, месяц, день)
let yearValue               = document.getElementsByClassName('year-value')[0];
let monthValue              = document.getElementsByClassName('month-value')[0];
let dayValue                = document.getElementsByClassName('day-value')[0];
let checkSavings            = document.getElementById('savings');
let sumValue                = document.getElementById('sum');
let percentValue            = document.getElementById('percent');

// Глобальный запуск расчета
let startButton             = document.getElementById('start');

// Сумма дохода в месяц с указанием даты
startButton.addEventListener('click', function () {
	appData.date = prompt ("Введите дату в формате: YYYY-MM-DD", "");
  
	yearValue.value = new Date(Date.parse(appData.date)).getFullYear();
	monthValue.value = new Date(Date.parse(appData.date)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(appData.date)).getDate();
    
    appData.moneyPerDay = +(appData.income / 30).toFixed(); //создаем свойство объекта 

	dayBudgetValue.textContent = appData.moneyPerDay;

	if (appData.moneyPerDay < 500) {
		levelValue.textContent = "Ты бедный";
	} else if (appData.moneyPerDay >= 500 && appData.moneyPerDay <= 2000) {
		levelValue.textContent = "Ты средний класс";
	} else if (appData.moneyPerDay > 2000) {
		levelValue.textContent = "Ты богатый";
	} else {
		levelValue.textContent = "Error";
	}
});

// Фиксация и выведение основного дохода
incomeItem.addEventListener('input', function() {
    appData.income = +incomeItem.value; // записываем полученное значение в параметр объекта

	budgetValue.textContent = appData.income.toFixed(); // выводим значение в блоке result
});

// Создание элементов дополнительного дохода
function createElements(optionalIncomeList, name, value) {
    let newRow      = document.createElement('div'),
        inputText   = document.createElement('input'),
        inputValue  = document.createElement('input');

    newRow.className = 'optional-income__row row';

    inputText.className = "optional-income__item col-1";
    inputText.value = name;
    inputText.type = 'text';
    inputText.disabled = 'disabled';

    inputValue.className = "optional-income__item col-2";
    inputValue.value = value;
    inputValue.type = 'text';
    inputValue.disabled = 'disabled';

    newRow.appendChild(inputText);
    newRow.appendChild(inputValue);

    optionalIncomeList.appendChild(newRow);
}

// Запуск процесса создания элемента для дополнительных доходов
optionalIncomeBtn.addEventListener('click', function(e){
    e.preventDefault();
    let incomeFormText      = document.querySelector(".optional-income__form-input__text").value,
        incomeFormValue     = +document.querySelector('.optional-income__form-input__value').value;
 
    createElements(optionalIncomeList, incomeFormText, incomeFormValue);
 
    // Запись нового элемента в объект
    let optionalIncomeItem = {
        name:   document.querySelector(".optional-income__form-input__text").value,
        value: +document.querySelector('.optional-income__form-input__value').value
    };
    // Добавление эксземпляра в массив
    appData.optionalIncome.push(optionalIncomeItem);

    // Сложение элементов массива
    function calcIncome(arr, key) {
        let sum = 0; 
        arr.map(item => sum += parseFloat(item[key]));

        return sum;
    };

    //Получаю значние, которое получается в результате выполнения функции calcIncome
    let optionalIncomeSum = calcIncome(appData.optionalIncome, 'value');

    // Выведение в DOM суммы элементов массива
    incomeValue.textContent = optionalIncomeSum;

    // Сбрасываю значения для инпутов ввода
    document.querySelector(".optional-income__form-input__text").value = '';
    document.querySelector('.optional-income__form-input__value').value = '';   
});

// Создание элементов расхода
function createElementsExpenses(expensesList, name, value) {
    let newRow      = document.createElement('div'),
        inputText   = document.createElement('input'),
        inputValue  = document.createElement('input');

    newRow.className = 'expenses__row row';

    inputText.className = "expenses__item col-1";
    inputText.value = name;
    inputText.type = 'text';
    inputText.disabled = 'disabled';

    inputValue.className = "expenses__item col-2";
    inputValue.value = value;
    inputValue.type = 'text';
    inputValue.disabled = 'disabled';

   
    newRow.appendChild(inputText);
    newRow.appendChild(inputValue);

   expensesList.appendChild(newRow);
};

// Запуск процесса создания элементов для расходов
expensesFormBtn.addEventListener('click', function(e){
    e.preventDefault();
    let incomeFormText      = document.querySelector(".expenses__form-input__text").value,
        incomeFormValue     = +document.querySelector('.expenses__form-input__value').value;
 
    createElements(expensesList, incomeFormText, incomeFormValue);
 
    // Запись нового элемента в объект
    let expensesRealItem = {
        name:   document.querySelector(".expenses__form-input__text").value,
        value: +document.querySelector('.expenses__form-input__value').value
    };

    // Добавление эксземпляра в массив
    appData.expenses.push(expensesRealItem);

    // Сложение элементов массива
    function calcIncome(arr, key) {
        let sum = 0; 
        arr.map(item => sum += parseFloat(item[key]));

        return sum;
    };

    //Получаю значние, которое получается в результате выполнения функции calcIncome
    let sumValue = calcIncome(appData.expenses, 'value');

    // Выведение в DOM суммы элементов массива
    expensesValue.textContent = sumValue;

    // Сбрасываю значения для инпутов ввода
    document.querySelector(".expenses__form-input__text").value = '';
    document.querySelector('.expenses__form-input__value').value = '';   
});

// Накопления
checkSavings.addEventListener('click', function(){
	if (appData.savings == true) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});

// Накопления
sumValue.addEventListener('input', function(){
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


