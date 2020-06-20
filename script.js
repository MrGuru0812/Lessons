'use strict'

let isString = function(n) {
    return (typeof n === "string"  && isNaN(parseFloat(n)) && !isFinite(n));
}; 

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let start = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItem = document.querySelectorAll('.income-items');




let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function() {
        if(salaryAmount.value === ''){
            start.removeEventListener('click', start);
        } else{
appData.budget = +salaryAmount.value;

appData.getExpenses();
appData.getIncome();
appData.getExpensesMonth(); //сумма расходов
appData.getAddExpenses();
appData.getAddIncome();
appData.getBudget();

appData.showResult();
        }
    },
    showResult: function(){

budgetMonthValue.value = appData.budgetMonth;
budgetDayValue.value = appData.budgetDay;
expensesMonthValue.value = appData.expensesMonth;
additionalExpensesValue.value = appData.addExpenses.join(', ');
additionalIncomeValue.value = appData.addIncome.join(', ');
targetMonthValue.value = appData.getTargetMonth();
incomePeriodValue.value = appData.calcPeriod();

let dinamicCalcValue = function() {

    incomePeriodValue.value = appData.calcPeriod();

}

periodSelect.addEventListener('input', dinamicCalcValue);


},

    addExpensesBlock: function(){
        
        let cloneExpensesItem  = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        let  cloneIncomeItems = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');
        
        if(incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function(){

        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            
            if(itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = cashExpenses;
            }
        });

    },
    getIncome: function(){
        
        incomeItem.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for(let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
        item = item.trim();
        
            if(item !== '') {
            appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){

        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function () {  
        for( let key in appData.expenses)   appData.expensesMonth += +appData.expenses[key];
    },    
    getBudget: function() { 
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() { 
    
        return  Math.ceil(targetAmount.value / appData.budgetMonth);
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
    dinamicCalc: function(){

return periodAmount.innerHTML = periodSelect.value;

    },
    calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value;
    },
};

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.dinamicCalc);



    
    /*if(appData.getTargetMonth() < 0) {
            console.log('Цель не будет достигнута!');
    } else {
            console.log('Цель будет достигнута за: ' + appData.getTargetMonth() +' месяцев' );
    }
            console.log(appData.getStatusIncome()); // оценка уровня дохода

for(let key in appData) {

console.log(  key + ' ' + appData[key]);


}*/
