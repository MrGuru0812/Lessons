'use strict'

const isString = (n) => {
    return (typeof n === "string"  && isNaN(parseFloat(n)) && !isFinite(n));
}; 

const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const   additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
        start = document.getElementById('start'),
        cancel = document.getElementById('cancel'),
        depositCheck = document.querySelector('#deposit-check'),
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
        additionalExpensesItem = document.querySelector('.additional_expenses-item'),
        depositAmount = document.querySelector('.deposit-amount'),
        depositPercent = document.querySelector('.deposit-percent'),
        targetAmount = document.querySelector('.target-amount'),
        periodSelect = document.querySelector('.period-select'),
        periodAmount = document.querySelector('.period-amount'),
        calc = document.querySelector('.calc'),
        data = document.querySelector('.data'),
        control = document.querySelector('.control');
    
let incomeItem = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1];
    
class AppData {
    
    constructor() {

        this.income = {}; //доход
        this.incomeMonth = 0; // месячный доход
        this.addIncome = []; // добавление дохода
        this.expenses = {}; // расходы
        this.addExpenses = []; // добавление расходов
        this.deposit = false; // депозит
        this.percentDeposit = 0; // процент депозита
        this.moneyDeposit = 0; // деньги на депозите
        this.budget = 0; // бюджет
        this.budgetDay = 0; // бюджет в день
        this.budgetMonth = 0; // бюджет в месяц
        this.expensesMonth = 0; // расходы в месяц
    

        AppData.prototype.start = function() {   //запускает программу

            if(salaryAmount.value === '') {
                start.removeEventListener('click', start);
            
            } else {
                start.style.display = 'none';
                cancel.style.display = 'block';
        
                const elem = data.querySelectorAll('input[type=text]');
                
                elem.forEach((item) => {
            
                    item.setAttribute('readonly', true);
            
                });
                this.budget = +salaryAmount.value;
                this.getExpenses();
                this.getIncome();
                this.getExpensesMonth(); //сумма расходов
                this.getAddExpenses();
                this.getAddIncome();
                this.getBudget();
                
                this.showResult();
            }
        };
    }
        showResult() { // показывает результаты
            const _this = this;
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            incomePeriodValue.value = _this.calcPeriod();
    
            let dinamicCalcValue = () => { //динамическое изменеие накоплений за период
            incomePeriodValue.value =  this.calcPeriod();

            }

            periodSelect.addEventListener('input', dinamicCalcValue);


        };

        addExpensesBlock() { // блок добавления расходов
            let cloneExpensesItem  = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
    
            if(expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
        };

        addIncomeBlock () { // блок добавления доходов
            let  cloneIncomeItems = incomeItem[0].cloneNode(true);
            incomeItem[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
            incomeItem = document.querySelectorAll('.income-items');
    
            if(incomeItem.length === 3) {
                incomePlus.style.display = 'none';
            }
        };

        getExpenses() {  //получаем расходы 
            expensesItems.forEach((item) => {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
        
                if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
                }
            });
        };
        getIncome() { //получаем доходы
            incomeItem.forEach((item) => {
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
                }
            });
            for(let key in this.income) {
                this.incomeMonth += +this.income[key];
            }
        };

        getAddExpenses() { //добавляем расходы
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach((item) => {
            item = item.trim();
                if(item !== '') {
                    this.addExpenses.push(item);
                }
            });
        };

        getAddIncome () { //добавляем доходы

            additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
                if(itemValue !== '') {
                    this.addIncome.push(itemValue);
                }
            });
        };

        getExpensesMonth () {  //считаем расходы в месяц
            for( let key in this.expenses)   this.expensesMonth += +this.expenses[key];
        };   

        getBudget () { //получаем бюджет в месяц и в день
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
        };

        getTargetMonth () { //вычисление времени(в месяцах) достижения цели

            return  Math.ceil(targetAmount.value / this.budgetMonth);
        };

        getStatusIncome = () => { //  оценка уровня дохода

        return  (this.budgetDay < 0) ? 'Что то пошло не так' :
                (this.budgetDay > 1200) ? 'У вас высокий уровень дохода' :
                (this.budgetDay >= 600 && this.budgetDay <= 1200) ? 'У вас средний уровень дохода' :
                'К сожалению у вас уровень дохода ниже среднего';
        };

        getInfoDeposit() { //получение информации по депозиту
            if(this.deposit){
                do{
                    this.percentDeposit = prompt('Какой годовой процент депозита?');
                } while(!isNumber(this.percentDeposit));
                do {
                    this.moneyDeposit = prompt('Какая сумма заложена в депозит?');
                } while(!isNumber(this.moneyDeposit));
            }

        };

        dinamicCalc () { //вычисление при передвижении ползунка

            return periodAmount.innerHTML = periodSelect.value;

        };

        calcPeriod () { // вычисляем период
            return this.budgetMonth * periodSelect.value;
        };
        cancel () { // возвращает программу в исходное состояние
            start.style.display = 'block';
            cancel.style.display = 'none';
    
            this.income = {}; //доход
            this.incomeMonth = 0; // месячный доход
            this.addIncome = []; // добавление дохода
            this.expenses = {}; // расходы
            this.addExpenses = []; // добавление расходов
            this.deposit = false; // депозит
            this.percentDeposit = 0; // процент депозита
            this.moneyDeposit = 0; // деньги на депозите
            this.budget = 0; // бюджет
            this.budgetDay = 0; // бюджет в день
            this.budgetMonth = 0; // бюджет в месяц
            this.expensesMonth = 0; // расходы в месяц
    
            const elem = document.querySelectorAll('input');

            elem.forEach((item) => {
            if (item.classList.contains('period-select') ) {
                item.value = 1;
                periodAmount.textContent = 1;
            } else {
                item.removeAttribute('readonly', true);
                item.value = '';
            }
        
            });

            for(let i = 1; i < incomeItem.length; i++ ) {
                if(incomeItem.length > 1){
                    incomeItem[i].remove();
                    incomePlus.style.display ='block';
                }
                for(let i = 1; i < expensesItems.length; i++ ) {
                    if(expensesItems.length > 1){
                        expensesItems[i].remove();
                        expensesPlus.style.display ='block';
                    }
                }
    
            }

        };

            eventListeners () { // слушатели
            start.addEventListener('click', this.start.bind(this));
            cancel.addEventListener('click', this.cancel.bind(this));
            expensesPlus.addEventListener('click', this.addExpensesBlock);
            incomePlus.addEventListener('click', this.addIncomeBlock);
            periodSelect.addEventListener('input', this.dinamicCalc);
        };
    
}
const appData = new AppData();
appData.eventListeners();


