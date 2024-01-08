// Object containing budget categories and their initial budgets
const categoryWiseBudget = {
    "Groceries": 2000,
    "Entertainment": 500,
    "Rent": 2000,
    "Utilities": 500,
    "Health": 2000,
    "Education": 1500,
    "Miscellaneous": 500
};

// Object to track expenses per category
const categoryWiseExpense = {};

// Initialize income, expense, and transactions
let income = 0, expense = 0;
const transactions = [];

// Function to initialize the page
function initialise() {
    setCategories();
    initialiseCategoryWiseExpense();
    document.getElementById("income").addEventListener("input", (event) => {
        setIncome(event.target.value);
    });
    document.getElementById("add-transaction-btn").addEventListener("click", () => {
        const amount = parseFloat(document.getElementById('amount').value);
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        addTransaction({ amount, description, category });
    });
    displaySummary();
}

// Set expense category options in the dropdown
function setCategories() {
    const selectElement = document.getElementById("category");
    selectElement.innerHTML = `<option disabled selected>Select Expense Category</option>`;
    for (const category in categoryWiseBudget) {
        selectElement.innerHTML += `<option value="${category}">${category}</option>`;
    }
}

// Initialize categoryWiseExpense with zero for each category
function initialiseCategoryWiseExpense() {
    for (const category in categoryWiseBudget) {
        categoryWiseExpense[category] = 0;
    }
}

// Set the income and update the display
function setIncome(value = 0) {
    income = value;
    displayTransactions();
    displaySummary();
}

// Add a new transaction and update expense and categoryWiseExpense
function addTransaction(transaction) {
    const { amount, description, category } = transaction;

    if (amount && description) {
        expense += amount;
        transactions.push(transaction);
        displayTransactions();
        if (category in categoryWiseBudget) {
            categoryWiseExpense[category] += amount;
        }
        displaySummary();
        clearInputFields();
    }
}

// Display the list of transactions
function displayTransactions() {
    const transactionsList = document.getElementById('transactions');
    transactionsList.innerHTML = '';
    for (const transaction of transactions) {
        const listItem = document.createElement('li');
        listItem.innerText = `${transaction.description}: $${transaction.amount.toFixed(2)} (Category: ${transaction.category})`;
        transactionsList.appendChild(listItem);
    }
}

// Display the summary of income, expenses, and category-wise budget details
function displaySummary() {
    document.getElementById("total-income").innerHTML = `<b>Total Income : ${income}</b>`;
    const budgetSummaryElement = document.getElementById("budget-summary");
    let htmlText = "";
    for (category in categoryWiseExpense) {
        const categoryBalance = categoryWiseBudget[category] - categoryWiseExpense[category];
        const categoryBalanceStyle = categoryBalance > 0 ? "black" : "red";
        htmlText += `<ul><b>${category} </b>
                        <li>Budget : ${categoryWiseBudget[category]}</li>
                        <li>Expense : ${categoryWiseExpense[category]}</li>
                        <li style="color:${categoryBalanceStyle};">Balance : ${categoryBalance}</li>
                    </ul>`;
    }
    budgetSummaryElement.innerHTML = htmlText;
    const balance = income - expense;
    const balanceElement = document.getElementById("balance");
    const balanceElementStyle = balance > 0 ? "black" : "red";
    balanceElement.innerHTML = `<b>Balance : ${income - expense}</b>`;
    balanceElement.style.color = balanceElementStyle;
}

// Clear input fields after adding a transaction
function clearInputFields() {
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
}
