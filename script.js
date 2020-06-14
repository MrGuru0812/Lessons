'use strict'

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
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
    mission: 50000,
    period: 3,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
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
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

};
appData.asking();

appData.getExpensesMonth = function () {  
    let sum = 0;
    for(  let key in appData.expenses){
        
        sum += appData.expenses[key];
}
        return sum;
};
appData.expensesMonth = appData.getExpensesMonth(); 
//сумма расходов

appData.getBudget = function() { 
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    return [appData.budgetMonth, appData.budgetDay];
};

appData.getBudget();

    
    appData.getTargetMonth = function() { 
        return  Math.ceil(appData.mission / appData.budgetMonth);

};
appData.getTargetMonth();
// кол-во месяцев для достижения цели

appData.getStatusIncome = function() { //  оценка уровня дохода

    return  (appData.budgetDay < 0) ? 'Что то пошло не так' :
            (appData.budgetDay > 1200) ? 'У вас высокий уровень дохода' :
            (appData.budgetDay >= 600 && appData.budgetDay <= 1200) ? 'У вас средний уровень дохода' :
            'К сожалению у вас уровень дохода ниже среднего';
    
    };

            console.log('Сумма расходов: ' + appData.expensesMonth + ' рублей');
            
    if(appData.getTargetMonth() < 0) {
        
            console.log('Цель не будет достигнута!');
        
    } else {
    
            console.log('Цель будет достигнута за: ' + appData.getTargetMonth() +' месяцев' );
    }
    
            console.log(appData.getStatusIncome()); // оценка уровня дохода

for(let key in appData) {

console.log(  key + ' ' + appData[key]);


}

// console.log(appData);