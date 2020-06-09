'use strict'
let money,
    income = 'дипломы на заказ',
    addExpenses,
    deposit,
    mission = 100000,
    period = 6,
    budgetDay,
    expenses1,
    expenses2,
    amount1,
    amount2;

money = +prompt('Ваш месячный доход?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

expenses1 = prompt('Введите обязательную статью расходов?');

amount1 = +prompt('Во сколько это обойдется?');

expenses2 = prompt('Введите обязательную статью расходов?');

amount2 = +prompt('Во сколько это обойдется?');


let getExpensesMonth = function(amount1, amount2) { // cумма расходов
    
    return amount1 + amount2;

};
let sum = getExpensesMonth(amount1, amount2);


let getAccumulatedMonth = function(money, sum) { // накопления за месяц

    return money - getExpensesMonth(amount1, amount2);

};
let accumulatedMonth = getAccumulatedMonth(money, sum);
    


let getTargetMonth = function(mission, accumulatedMonth) { // кол-во месяцев для достижения цели

return  mission / accumulatedMonth;

};
let goalIsAchieved= getTargetMonth(mission, accumulatedMonth);


budgetDay = Math.floor(accumulatedMonth / 30); // бюджет на один день

let getStatusIncome = function() { //  оценка уровня дохода

    return  (budgetDay < 0) ? 'Что то пошло не так' :
            (budgetDay > 1200) ? 'У вас высокий уровень дохода' :
            (budgetDay >= 600 && budgetDay <= 1200) ? 'У вас средний уровень дохода' :
            'К сожалению у вас уровень дохода ниже среднего';
    
    };

let showTypeOf = function(data) {

console.log(data, typeof(data));

};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
    console.log('Сумма расходов: ' + sum + ' рублей');
    console.log('Период равен ' + period +' месяцев');
    console.log('Цель заработать ' + mission + ' рублей');
    console.log(addExpenses.toLocaleLowerCase()); // список возможных расходов
    console.log(addExpenses.split(', '));
    console.log('Бюджет на день: ' + budgetDay + ' рублей');
    console.log('Бюджет на месяц: ' + accumulatedMonth + ' рублей');
    console.log('Цель будет достигнута за: ' + Math.ceil(goalIsAchieved) +' месяцев' );
    console.log(getStatusIncome()); // оценка уровня дохода
