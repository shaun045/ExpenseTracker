
/* ------------------>THIS IS FOR TRANSACTION SECTION<--------------------- */

/* THIS IS FOR THE GRAPH */
const radius = 100;
const circumference = 2 * Math.PI * radius;

const savingsCircle = document.querySelector(".savings");
const expenseCircle = document.querySelector(".expense");
const investmentCircle = document.querySelector(".investment");


[savingsCircle, expenseCircle, investmentCircle].forEach(circle => {
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;
});

const overallTotalAmount = document.querySelector(".overall-total-amount");


/* THIS IS FOR THE DATA PERCENTAGES BELOW THE GRAPH! */
const dataPercentage = document.querySelector(".data-percentage");




/* THIS IS FOR THE DROPDOWN */
const transactionDropdown = document.getElementById("categoryDropdown");
const dropDownHeader = document.querySelector(".dropdown-header");
const dropDownOptions = document.querySelector(".dropdown-list");

const selectedHeader = document.querySelector(".dropdown-header .selected")
selectedHeader.dataset.value = "savings";

const arrowIcon = document.querySelector(".arrow-icon");

dropDownHeader.addEventListener('click', () => {

  dropDownOptions.classList.toggle("open");
  arrowIcon.classList.toggle("rotate");


})

dropDownOptions.addEventListener('click', (e) => {
  const option = e.target.closest("li");

  if (!option) return;

  selectedHeader.textContent = option.textContent;
  selectedHeader.dataset.value = option.dataset.value;

  dropDownOptions.classList.remove("open");
  arrowIcon.classList.remove("rotate");
})


/* THIS IS FOR TRANSACTION DATA STORAGE */
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

/* THIS FOR ADDING THE TRANSACTIONS TO STORAGE */
function addToLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}


/* THIS IS FOR MAKING TRANSACTION FUNCTION */
const title = document.getElementById("titleInput");
const amount = document.getElementById("amountInput");

const makeTransaction = document.getElementById("transaction-btn");

makeTransaction.addEventListener('click', () => {
  const transaction = getTransaction();

  if (!transaction.title || !transaction.amount) {
    alert("Please provide input.");
    return;
  }

  transactions.push(transaction);

  addToLocalStorage();
  addToTransactionHistory(transaction);
  render();
})

/* --------------> THIS IS FOR UI RENDER FUNCTION <---------------- */
function render() {
  calculateTotalAmount();
  updateChart();
}


/* THIS IS FOR GETTING TRANSACTIONS */
function getTransaction() {
  return {
    title: title.value.trim(),
    amount: Number(amount.value),
    category: selectedHeader.dataset.value,
    id: Date.now()
  };
}

/* THIS IS FOR FILTERING TRANSACTIONS */
function calculateCategoryTotal(category) {
  return transactions
      .filter(tx => tx.category === category)
      .reduce((sum, tx) => sum + tx.amount, 0);
}

/* THIS IS FOR THE CALCULATIONS */
function calculateCategoryPercentage(category) {
  const savingsTotal = calculateCategoryTotal("savings");
  const investmentsTotal = calculateCategoryTotal("investment");
  const expensesTotal = calculateCategoryTotal("expense");

  const overAllTotal = savingsTotal + investmentsTotal + expensesTotal;

  const selectedTotal = calculateCategoryTotal(category);

  if (overAllTotal === 0) return 0;

  return (selectedTotal / overAllTotal) * 100;
}


/*THIS IS FOR UI UPDATE FUNCTION */
function updateChart() {
  const gap = 5;

  const savingsPercentage = calculateCategoryPercentage("savings");
  const investmentPercentage = calculateCategoryPercentage("investment");
  const expensePercentage = calculateCategoryPercentage("expense");

  const savingsAdjusted = Math.max(0, savingsPercentage - gap);
  const expenseAdjusted = Math.max(0, expensePercentage - gap);
  const investmentAdjusted = Math.max(0, investmentPercentage - gap);

  const savingsOffset = circumference - (savingsAdjusted / 100) * circumference;
  const expenseOffset = circumference - (expenseAdjusted / 100) * circumference;
  const investmentOffset = circumference - (investmentAdjusted / 100) * circumference;

  savingsCircle.style.strokeDashoffset = savingsOffset;
  expenseCircle.style.strokeDashoffset = expenseOffset;
  investmentCircle.style.strokeDashoffset = investmentOffset;

  expenseCircle.style.transform = `rotate(${savingsPercentage * 3.6}deg)`;
  investmentCircle.style.transform = `rotate(${(savingsPercentage + expensePercentage) * 3.6}deg)`;
}

function calculateTotalAmount() {
  const savingsTotal = calculateCategoryTotal("savings");
  const expenseTotal = calculateCategoryTotal("expense");
  const investmentTotal = calculateCategoryTotal("investment");

  const totalAmount = savingsTotal + investmentTotal + expenseTotal;

  // overallTotalAmount.innerHTML = totalAmount;

  const currentValue = parseInt(overallTotalAmount.textContent) || 0;
  animateValue(overallTotalAmount, currentValue, totalAmount, 800);
}

/* THIS IS FOR TOTAL UI ANIMATION */
function animateValue(element, start, end, duration = 800) {
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;

    const progress = currentTime - startTime;
    const percentage = Math.min(progress / duration, 1);
    
    const value = Math.floor(start + (end - start) * percentage);

    element.textContent = "₱ " + value.toLocaleString();

    if (percentage < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

/* THIS IS FOR DATA PERCENTAGE UI DISPLAY */
function dataPercentageDisplay() {
  dataPercentage.innerHTML = `
  
  `
}


/* THIS IS FOR THE HISTORY LIST */
const historyList = document.querySelector(".history-list");
const historyTransaction = document.querySelector(".history-list li");


function addToTransactionHistory(transaction) {
  const newTransactionList = document.createElement("li");

  newTransactionList.innerHTML = `
    <span class="title">${transaction.title}</span>
    <span class="icon"><i class="fa-solid fa-trash"></i></span>
  `;

  newTransactionList.classList.add("animate-in");
  historyList.prepend(newTransactionList);
}

function renderHistoryList() {
  historyList.innerHTML = "";

  transactions.forEach(transaction => {
    addToTransactionHistory(transaction);
  })

  render();
}


renderHistoryList();
