import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Signup } from "../utils/http";

const SignupScreen = ({ navigation }) => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

    const signupHandler = async () => {
        if(!enteredName || !enteredEmail || !enteredUsername || !enteredPassword || !enteredConfirmPassword) {
            Alert.alert('Please fill all the fields.');
            return;
        }
        if(!enteredEmail.includes('@') || !enteredEmail.includes('.')) {
            Alert.alert('Invalid Email!');
            return;
        }
        if(enteredPassword !== enteredConfirmPassword) {
            Alert.alert("Password's don't match!");
            return;
        }
        const res = await Signup(enteredName, enteredUsername, enteredEmail, enteredPassword, enteredConfirmPassword); 
        console.log(res);
        Alert.alert('Sign up successful!', 'User created successfully!');
        console.log(enteredName, enteredEmail, enteredConfirmPassword, enteredPassword, enteredUsername)
        navigation.navigate('LoginScreen');
    }
    
      function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
          case 'name':
            setEnteredName(enteredValue);
            break;
          case 'username':
            setEnteredUsername(enteredValue);
            break;
          case 'email':
            setEnteredEmail(enteredValue);
            break;
          case 'password':
            setEnteredPassword(enteredValue);
            break;
          case 'confirmPassword':
            setEnteredConfirmPassword(enteredValue);
            break;
        }
      }

    const navigateLoginHandler = () => navigation.navigate('LoginScreen');

    return <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
        <View style={styles.formContainer}>
            <Text style={styles.text}>
                Name
            </Text>
            <TextInput onChangeText={updateInputValueHandler.bind(this, 'name')} value={enteredName} placeholder="Please enter your name here"  />
            <Text style={styles.text}>
                Username
            </Text>
            <TextInput onChangeText={updateInputValueHandler.bind(this, 'username')} value={enteredUsername} placeholder="Please enter your username here" />
            <Text style={styles.text}>
                Email
            </Text>
            <TextInput onChangeText={updateInputValueHandler.bind(this, 'email')} value={enteredEmail} placeholder="Please enter your email here" textContentType="emailAddress" />
            <Text style={styles.text}>
                Password
            </Text>
            <TextInput onChangeText={updateInputValueHandler.bind(this, 'password')} value={enteredPassword} placeholder="Please enter your password here" textContentType="password" secureTextEntry={true} />
            <Text style={styles.text}>
                Confirm Password
            </Text>
            <TextInput onChangeText={updateInputValueHandler.bind(this, 'confirmPassword')} value={enteredConfirmPassword} placeholder="Please re enter your password here" textContentType="password" secureTextEntry={true} />
        </View>
        <View>
          
            <Pressable style={styles.button} onPress={signupHandler}>
            <View >
            <Text style={styles.buttonText}>Sign up</Text>
            </View>
            </Pressable>
            <Pressable onPress={navigateLoginHandler}>
                <Text style={styles.text}>Already have an account?</Text>
            </Pressable>
        </View>
        </View>
    </View>
}

export default SignupScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#815ed9',
    },
    innerContainer: {
        padding: 40,
        borderWidth: 1,
        borderColor: '#f6f6f6',
        backgroundColor: '#d4cfe1',
        borderRadius: 30,
        elevation: 6,
    },
    text: {
        fontSize: 18
    },
    formContainer: {
    },
    textInput: {
    
    },
    button: {
        backgroundColor: '#815ed9',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 6
    },
    buttonText: {
        fontSize: 16
    }
})