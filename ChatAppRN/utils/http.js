import axios from "axios"

export const Signup =async (name , username, email, password, confirmPassword) => {
    const payload = {
        "name": name, 
        "username": username, 
        "email":email, 
        "password": password
    }
    
    try {
        // const xhr = new XMLHttpRequest();
        // xhr.open('POST', 'http://localhost:8000/api/user/signup');
        // xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.send(JSON.stringify(payload));
        // let responseData;
        // xhr.onload = () => {
        //     responseData = JSON.parse(xhr.responseText);
        // }
        // const instance = axios.create({
            
        //     adapter: http.request // Use the Node.js HTTP adapter
        //   });
        // const instance = axios.create({
        //     httpAgent: new http.Agent({keepAlive: true})
        // })
        
        // const result = await instance.post('http://localhost:8000/api/user/signup',payload);
        // const result = fetch('https://jsonplaceholder.typicode.com/todos/1')
        // .then(response => console.log(response.json()))
        // .then(json => console.log(json))
        // return result;
        let result;   
        try {
            result = await axios.post('http://192.168.10.33:8000/api/user/signup', {
                name,
                email,
                password,
                username,
                confirmPassword
            });
            
        } catch (error) {
            console.log(error);
        }
        console.log(result);
        return result;   
    } catch (error) {
        console.log(error)   
    }
}

export const Login = async (username, password) => {
    try {
        const payload = {
            username,
            password
        }
        const result = await axios.post('http://192.168.10.33:8000/api/user/login', {
            username,
            password
        });
        console.log('res',result);
        return result;
    } catch (error) {
        console.log(error);
    }
}