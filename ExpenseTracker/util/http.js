import axios from "axios";

const BACKEND_URL = 'https://react-native-course-cdcc4-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function storeExpense(expenseData) {
    const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
    const id =response.data.name;//this is firebase id.
    return id;
}

export async function fetchExpenses() {
    const response = await axios.get(BACKEND_URL + '/expenses.json');

    const expenses = [];
    for(const key in response.data) {//keys will be firebase unique id
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expenses.push(expenseObj);
    }
    return expenses;
}

export function updateExpense (id, expenseData) {//expenseData shouldn't have id in it.
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);//not using async because we want to show loading screen.
}

export function deleteExpense (id) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}