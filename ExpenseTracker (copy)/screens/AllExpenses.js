import { useContext } from "react";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { DUMMY_EXPENSES, ExpensesContext, ExpensesContextProvider } from "../store/expenses-context";

function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="No registered expenses found!" />
}

export default AllExpenses;