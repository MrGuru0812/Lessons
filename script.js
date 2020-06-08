let money,
    income = 'дипломы на заказ',
    addExpenses,
    deposit,
    mission = 100000,
    period = 6,
    budgetMonth,
    achieve;

money = prompt('Ваш месячный доход?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

expenses1 = prompt('Введите обязательную статью расходов?');

amount1 = +prompt('Во сколько это обойдется?');

expenses2 = prompt('Введите обязательную статью расходов?');

amount2 = +prompt('Во сколько это обойдется?');

budgetMonth = +money - (amount1 + amount2);

budgetDay = Math.floor(budgetMonth / 30);

achieve = Math.ceil(mission / budgetMonth);


    console.log(typeof(money));
    console.log(typeof(income));
    console.log(typeof(deposit));
    console.log(addExpenses.length);
    console.log('Период равен ' + period +' месяцев');
    console.log('Цель заработать ' + mission + ' рублей');
    console.log(addExpenses.toLocaleLowerCase());
    console.log(addExpenses.split(', '));
    console.log('Бюджет на день: ' + budgetDay + ' рублей');
    console.log('Бюджет на месяц: ' + budgetMonth + ' рублей');
    console.log('Цель будет достигнута за: ' + achieve +' месяцев' );
    

let result = (budgetDay < 0) ? 'У вас высокий уровень дохода' :
    (budgetDay > 1200) ? 'У вас высокий уровень дохода' :
    (budgetDay > 600 && budgetDay <= 1200) ? 'У вас средний уровень дохода' :
    'К сожалению у вас уровень дохода ниже среднего';

console.log(result);
