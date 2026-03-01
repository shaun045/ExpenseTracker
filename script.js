
/* ------------------>THIS IS FOR TRANSACTION SECTION<--------------------- */

/* THIS IS FOR THE GRAPH */
const graph = document.querySelector(".graph");

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
function udpateChart() {
  const savingsPercentage = calculateCategoryPercentage("savings");
  const investmentPercentage = calculateCategoryPercentage("investment");
  const expensePercentage = calculateCategoryPercentage("expense");

  const expenseStart = savingsPercentage;
  const investmentStart = savingsPercentage + expensePercentage;

  graph.style.background = `
    conic-gradient (
    green 0% ${savingsPercentage}%,
    red ${expenseStart}% ${investmentStart}%,
    blue ${investmentStart}% 100%)
  `;
}