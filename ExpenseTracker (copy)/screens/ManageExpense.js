import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenses({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(undefined);
    const expensesCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;//two exclamation marks is for converting anything to boolean
    
    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });

    }, [navigation, isEditing]);

    async function deleteExpenseHandler () {
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError('Error deleting item!');            
            setIsSubmitting(false);
        }
    }

    function cancelHandler () {
        navigation.goBack();//equivalent to back button
    }

    async function confirmHandler (expenseData) {
        setIsSubmitting(true);
        try {
        if(isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({ ...expenseData, id });
        } 
        navigation.goBack();
    } catch (error) {
        setError('Could not save data - please try again later!');
        setIsSubmitting(false);
        }
    }
    
    if(isSubmitting) {
        return <LoadingOverlay />
    }
    
    function errorHandler () {
        setError(null);
    }

    if(error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }
    return <View style={styles.container}>
        <ExpenseForm onSubmit={confirmHandler} onCancel={cancelHandler} submitButtonLabel={isEditing ? 'Update' : 'Add'} defaultValues={selectedExpense} />
     
        {isEditing && 
        <View style={styles.deleteContainer}>
            <IconButton icon="trash" size={36} color={GlobalStyles.colors.error500} onPress={deleteExpenseHandler} />
        </View>
        }
    </View>;
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})

export default ManageExpenses;