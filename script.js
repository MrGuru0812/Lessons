'use strict'
let money = +prompt('Ваш месячный доход?'),
    income = 'дипломы на заказ',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 6,
    budgetDay,
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = +prompt('Во сколько это обойдется?'),
    accumulatedMonth;

let getExpensesMonth = function () { // cумма расходов
    
    return amount1 + amount2;

};
getExpensesMonth();


 function getAccumulatedMonth() { // накопления за месяц

    return money - getExpensesMonth();

};
    accumulatedMonth = getAccumulatedMonth();
    
function getTargetMonth() { // кол-во месяцев для достижения цели

return  Math.ceil(mission / accumulatedMonth);

};
getTargetMonth();


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
    console.log('Сумма расходов: ' + getExpensesMonth() + ' рублей');
    console.log('Период равен ' + period +' месяцев');
    console.log('Цель заработать ' + mission + ' рублей');
    console.log(addExpenses.toLocaleLowerCase()); // список возможных расходов
    console.log(addExpenses.split(', '));
    console.log('Бюджет на день: ' + budgetDay + ' рублей');
    console.log('Бюджет на месяц: ' + accumulatedMonth + ' рублей');
    console.log('Цель будет достигнута за: ' + getTargetMonth() +' месяцев' );
    console.log(getStatusIncome()); // оценка уровня дохода
