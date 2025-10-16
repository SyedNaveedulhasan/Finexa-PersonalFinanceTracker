import { useEffect, useState } from 'react';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import IncomeCard from '../components/IncomeCard';
import ExpenseCard from '../components/ExpenseCard';
import FinancialChart from '../components/FinancialChart';
import SpendingChart from '../components/SpendingChart';
import NoTransactions from '../components/NoTransactions';
import TransactionsTable from '../components/TransactionsTable';
import IncomeModal from '../components/IncomeModal';
import ExpenseModal from '../components/ExpenseModal';
import { addDoc, collection, getDocs, query, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { parse, unparse } from 'papaparse';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: '',
    tag: ''
  });

  // Add validation error states
  const [incomeErrors, setIncomeErrors] = useState({});
  const [expenseErrors, setExpenseErrors] = useState({});

  // Animation state for card positions
  const [expenseCardRect, setExpenseCardRect] = useState(null);
  const [incomeCardRect, setIncomeCardRect] = useState(null);

  // Validation function
  const validateForm = (formData, type) => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = true;
    }

    if (!formData.amount.trim() || parseFloat(formData.amount) <= 0) {
      errors.amount = true;
    }

    if (!formData.date.trim()) {
      errors.date = true;
    }

    if (!formData.tag.trim()) {
      errors.tag = true;
    }

    return errors;
  };

  // Calculate spending by category
  const getSpendingData = () => {
    const categoryData = {};
    transactions.filter(t => t.type === 'expense').forEach(transaction => {
      if (categoryData[transaction.tag]) {
        categoryData[transaction.tag] += transaction.amount;
      } else {
        categoryData[transaction.tag] = transaction.amount;
      }
    });

    return Object.entries(categoryData).map(([name, value]) => ({ name, value }));
  };

  // Generate chart data for financial statistics
  const getChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    return months.map((month, index) => ({
      month,
      income: Math.floor(Math.random() * 40000) + 30000,
      expenses: Math.floor(Math.random() * 20000) + 10000,
      balance: Math.floor(Math.random() * 30000) + 20000
    }));
  };

  const chartData = getChartData();
  const spendingData = getSpendingData();

  // Updated handleAddIncome with validation
  const handleAddIncome = (e) => {
    e.preventDefault();
    console.log("AddIncome:", formData);
    const errors = validateForm(formData, 'income');

    if (Object.keys(errors).length > 0) {
      setIncomeErrors(errors);
      return;
    }

    // Clear errors and proceed with adding income
    setIncomeErrors({});

    const newTransaction = {
      id: Date.now(),
      name: formData.name,
      type: 'income',
      date: formData.date,
      amount: parseFloat(formData.amount),
      tag: formData.tag || 'income'
    };

    setTransactions([...transactions, newTransaction]);
    setTotalIncome(totalIncome + parseFloat(formData.amount));
    setBalance(balance + parseFloat(formData.amount));
    setFormData({ name: '', amount: '', date: '', tag: '' });
    setShowIncomeModal(false);
    addTransaction(newTransaction);
  };

  const addTransaction = async (transaction, many) => {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID:", docRef.id);
      if(!many) toast.success("Transaction Added!");

    } catch (e) {
      console.error("Error Adding Document:", e);
      if(!many) toast.error("Could'nt add transaction");
    }
  };

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log("Transactions Array", transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setTotalIncome(incomeTotal);
    setTotalExpenses(expensesTotal);
    setBalance(incomeTotal - expensesTotal);
  };



  // Updated handleAddExpense with validation
  const handleAddExpense = (e) => {
    e.preventDefault();
    const errors = validateForm(formData, 'expense');

    if (Object.keys(errors).length > 0) {
      setExpenseErrors(errors);
      return;
    }

    // Clear errors and proceed with adding expense
    setExpenseErrors({});

    const newTransaction = {
      id: Date.now(),
      name: formData.name,
      type: 'expense',
      date: formData.date,
      amount: parseFloat(formData.amount),
      tag: formData.tag || 'expense'
    };

    setTransactions([...transactions, newTransaction]);
    setTotalExpenses(totalExpenses + parseFloat(formData.amount));
    setBalance(balance - parseFloat(formData.amount));
    setFormData({ name: '', amount: '', date: '', tag: '' });
    setShowExpenseModal(false);
    addTransaction(newTransaction);
  };

  // Function to handle form data changes and clear errors
  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);

    // Clear specific field errors when user starts typing
    Object.keys(newFormData).forEach(field => {
      if (newFormData[field] && incomeErrors[field]) {
        setIncomeErrors(prev => ({ ...prev, [field]: false }));
      }
      if (newFormData[field] && expenseErrors[field]) {
        setExpenseErrors(prev => ({ ...prev, [field]: false }));
      }
    });
  };

  // Function to handle modal close and clear errors
  const handleCloseIncomeModal = () => {
    setShowIncomeModal(false);
    setIncomeErrors({});
  };

  const handleCloseExpenseModal = () => {
    setShowExpenseModal(false);
    setExpenseErrors({});
  };

const resetBalance = async () => {
  try {
    setLoading(true);
    
    // Delete all transactions from Firestore
    const q = query(collection(db, `users/${user.uid}/transactions`));
    const querySnapshot = await getDocs(q);
    
    // Delete each document
    const deletePromises = [];
    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });
    
    await Promise.all(deletePromises);
    
    // Reset local state
    setBalance(0);
    setTotalIncome(0);
    setTotalExpenses(0);
    setTransactions([]);
    
    toast.success("All transactions deleted!");
    setLoading(false);
  } catch (error) {
    console.error("Error deleting transactions:", error);
    toast.error("Failed to delete transactions");
    setLoading(false);
  }
};

  const filteredTransactions = transactions
    .filter(transaction =>
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.tag.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'amount') return b.amount - a.amount;
      return a.name.localeCompare(b.name);
    });


  function exportCSV(){
    // Specifying fields and data explicitly
    var csv = unparse({
      fields: ["name", "type", "tag", "date", "amount"],
      data: transactions,
    });
    const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

   function importFromCSV(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }


  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />
      {loading ? (
        <Loader/>
      ) : (
        <>
          <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-17 py-4 sm:py-8">
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <BalanceCard balance={balance} resetBalance={resetBalance} />
              <IncomeCard
                totalIncome={totalIncome}
                setShowIncomeModal={setShowIncomeModal}
                setIncomeCardRect={setIncomeCardRect}
              />
              <ExpenseCard
                totalExpenses={totalExpenses}
                setShowExpenseModal={setShowExpenseModal}
                setExpenseCardRect={setExpenseCardRect}
              />
            </div>

            {/* Charts Section */}
            {transactions.length > 0 && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <FinancialChart  transactions={transactions}  />
                <SpendingChart transactions={transactions} />
              </div>
            )}

            {/* No Transactions State */}
            {transactions.length === 0 && <NoTransactions />}

            {/* Transactions Table */}
            <TransactionsTable
              transactions={transactions}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              filteredTransactions={filteredTransactions}
              exportCSV={exportCSV}
              importFromCSV={importFromCSV}
            />

            {/* Modals with validation */}
            <IncomeModal
              show={showIncomeModal}
              onClose={handleCloseIncomeModal}
              formData={formData}
              setFormData={handleFormDataChange}
              handleAddIncome={handleAddIncome}
              errors={incomeErrors}
              incomeCardRect={incomeCardRect}
            />
            <ExpenseModal
              show={showExpenseModal}
              onClose={handleCloseExpenseModal}
              formData={formData}
              setFormData={handleFormDataChange}
              handleAddExpense={handleAddExpense}
              errors={expenseErrors}
              expenseCardRect={expenseCardRect}
            />
          </div>
        </>
      )}

    </div>
  );
};

export default Dashboard;