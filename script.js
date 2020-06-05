let money = 60000,
    income = 'дипломы на заказ',
    addExpenses = 'интернет, кварплата, продукты, учеба, телефон',
    deposit = true,
    mission = 100000,
    period = 9,
    budgetDay = money / 30;


    console.log(typeof(money));
    console.log(typeof(income));
    console.log(typeof(deposit));
    console.log(addExpenses.length);
    console.log('Период равен ' + period +' месяцев');
    console.log('Цель заработать ' + mission + ' рублей');
    console.log(addExpenses.toLocaleLowerCase());
    console.log(addExpenses.split(', '));
    console.log(budgetDay);
