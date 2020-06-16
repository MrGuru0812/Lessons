'use strict'

let isString = function(n) {
    return (typeof n === "string"  && isNaN(parseFloat(n)) && !isFinite(n));
}; 

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

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
