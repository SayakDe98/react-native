import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm ({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: { 
        value: defaultValues ? defaultValues.amount.toString() : '',
        isValid:true
    },
        date: { 
        value: defaultValues ? getFormattedDate(defaultValues.date) : '', 
        isValid: true
    },
        description: {
        value: defaultValues ? defaultValues.description.toString() : '', 
        isValid:true
    }
    });

    function inputChangeHandler (inputIdentifier,enteredValue) {
        setInputs(currentInputs => {
            return {
                ...currentInputs, 
                [inputIdentifier]: { value: enteredValue, isValid: true }
            };
        });
    }

    function submitHandler () {
        const expenseData = {
            amount: +inputs.amount.value,//+ converts string to number
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values');
            setInputs((currentInputs) => { return {
                amount: { value: currentInputs.amount.value, isValid: amountIsValid },
                date: { value: currentInputs.date.value, isValid: dateIsValid },
                description: { value: currentInputs.description.value, isValid: descriptionIsValid }
            }});
            return; 
        }

        onSubmit(expenseData);
    }   
    
    const formIsInvalid = !inputs.amount.isValid || 
    !inputs.date.isValid || 
    !inputs.description.isValid;

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>

        <Input 
            style={styles.rowInput} 
            label="Amount" 
            invalid={!inputs.amount.isValid}
            textInputConfig={{ 
                keyboardType: "decimal-pad",
                value: inputs.amount.value,
                onChangeText : inputChangeHandler.bind(this, 'amount')
            }} 
        />
        <Input 
            label="Date" 
            invalid={!inputs.date.isValid}
            style={styles.rowInput}
            textInputConfig={{
                placeholder: "YYYY-MM-DD",
                maxLength: 10,
                value: inputs.date.value,
                keyboardType: "number-pad",
                onChangeText : inputChangeHandler.bind(this, 'date')
            }}
        />
        </View>
        <Input 
            label="Description" 
            invalid={!inputs.description.isValid}
            textInputConfig={{
                multiline: true,
                value: inputs.description.value,
                onChangeText: inputChangeHandler.bind(this, 'description') 
                // autoCapitalize: 'none',
                // autoCorrect: false //by default it is true
            }}
        />
        {formIsInvalid && (<Text style={styles.errorText}>Invaid input values - please check your entered data!</Text>)}
           <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
        </View>
    </View>
}

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
        fontSize: 24
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
     flex: 1   
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        color: GlobalStyles.colors.error500,
        textAlign: 'center',
        margin: 8
    }
})

export default ExpenseForm;