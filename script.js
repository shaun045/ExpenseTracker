
/* ------------------>THIS IS FOR TRANSACTION SECTION<--------------------- */

/* THIS IS FOR THE GRAPH */
const radius = 100;
const circumference = 2 * Math.PI * radius;

const savingsCircle = document.querySelector(".savings");
const expenseCircle = document.querySelector(".expense");
const investmentCircle = document.querySelector(".investment");


[savingsCircle, expenseCircle, investmentCircle].forEach(circle => {
  circle.style.strokeDasharray = circumference;
});




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



/* THIS IS FOR MAKE TRANSACTION */
let transactions = [];

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

  console.log(transactions);
  updateChart();
})


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
  // const gapSize = 15;
  // const gapAngle = (gapSize / circumference) * 360;
  // const halfGap = gapAngle / 2;

  const savingsPercentage = calculateCategoryPercentage("savings");
  const investmentPercentage = calculateCategoryPercentage("investment");
  const expensePercentage = calculateCategoryPercentage("expense");

  // const savingsLength = Math.max(
  //   0, 
  //   (savingsPercentage / 100) * circumference - gapSize
  // );

  // const expenseLength = Math.max(
  //   0, 
  //   (expensePercentage / 100) * circumference - gapSize
  // );

  // const investmentLength = Math.max(
  //   0, 
  //   (investmentPercentage / 100) * circumference - gapSize
  // );

  // savingsCircle.style.strokeDasharray = `
  //   ${savingsLength} ${circumference}`;

  // expenseCircle.style.strokeDasharray = `
  //   ${expenseLength} ${circumference}`;

  // investmentCircle.style.strokeDasharray = `
  //   ${investmentLength} ${circumference}`;

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




  // const savingsDegrees = (savingsLength / circumference) * 360;
  // const expenseDegrees = (expenseLength / circumference) * 360;

  // expenseCircle.style.transform = `rotate(${halfGap}deg)`;
  // expenseCircle.style.transform = `rotate(${savingsDegrees + halfGap * 2}deg)`;
  // investmentCircle.style.transform = `rotate(${savingsDegrees + expenseDegrees + halfGap * 3}deg`;


}