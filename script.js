'use strict'

let isString = function(n) {
    return (typeof n === "string"  && isNaN(parseFloat(n)) && !isFinite(n));
}; 

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
const calculateButton = document.getElementById('start'),
    buttonPlusIncome = document.getElementsByTagName('button')[0],
    buttonPlusExpenses = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
    incomePeriodValue = document.getElementsByClassName('income_period-value'),
    targetMonthValue = document.getElementsByClassName('target_month-value'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');

console.log(calculateButton);
console.log(buttonPlusIncome);
console.log(buttonPlusExpenses);
console.log(depositCheck);
console.log(additionalIncomeItem);
console.log(budgetDayValue);
console.log(expensesMonthValue);
console.log(additionalIncomeValue);
console.log(additionalExpensesValue);
console.log(incomePeriodValue);
console.log(targetMonthValue);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(additionalExpensesItem);
console.log(depositAmount);
console.log(depositPercent);
console.log(targetAmount);
console.log(periodSelect);



let money,
    itemIncome,
    cashIncome,
    addExpenses,
    expenses = [],
    amount, 
    start = function() {
            do {
                money = prompt('Ваш месячный доход?');
            } while(!isNumber(money));
        };

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: {},
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){
        
        if(confirm('Есть ли  у Вас дополнительный заработок?')){
            do {
            itemIncome = prompt('Какой у Вас дополнительный заработок?');
            } while(!isString(itemIncome))
            do {
            cashIncome = prompt('Сколько в месяц зарабатываете на этом?');
            appData.income[itemIncome] = cashIncome;
            } while(!isNumber(cashIncome));
        };

        do{
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        } while (!isString(addExpenses));
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        addExpenses = appData.addExpenses.map(word => word[0].toUpperCase() + word.substring(1)).join(', ');

        

        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
        for(let i = 0; i < 2; i++) {

            expenses = prompt('Введите обязательную статью расходов?');
            do{
            amount  = prompt('Во сколько это обойдется?');    
            
            } while(!isNumber(amount)){
            
            appData.expenses[expenses] = +amount;
            }
        }
    },
    getExpensesMonth: function () {  
        for( let key in appData.expenses)   appData.expensesMonth += +appData.expenses[key];
    },    
    getBudget: function() { 
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() { 
    
        return  Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function() { //  оценка уровня дохода

        return  (appData.budgetDay < 0) ? 'Что то пошло не так' :
                (appData.budgetDay > 1200) ? 'У вас высокий уровень дохода' :
                (appData.budgetDay >= 600 && appData.budgetDay <= 1200) ? 'У вас средний уровень дохода' :
                'К сожалению у вас уровень дохода ниже среднего';
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do{
            appData.percentDeposit = prompt('Какой годовой процент депозита?');
            } while(!isNumber(appData.percentDeposit));
            do {
            appData.moneyDeposit = prompt('Какая сумма заложена в депозит?');
            } while(!isNumber(appData.moneyDeposit));
        }

    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    },
};
appData.asking();
appData.getInfoDeposit(); //депозит
appData.getExpensesMonth(); //сумма расходов
appData.getBudget();// бюджет на месяц и на день
appData.getTargetMonth();// кол-во месяцев для достижения цели
console.log('Сумма расходов: ' + appData.expensesMonth + ' рублей');  
    
    if(appData.getTargetMonth() < 0) {
            console.log('Цель не будет достигнута!');
    } else {
            console.log('Цель будет достигнута за: ' + appData.getTargetMonth() +' месяцев' );
    }
            console.log(appData.getStatusIncome()); // оценка уровня дохода

/*for(let key in appData) {

console.log(  key + ' ' + appData[key]);


}*/
console.log(addExpenses);
console.log(appData);
