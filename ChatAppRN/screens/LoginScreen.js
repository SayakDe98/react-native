import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Login } from "../utils/http";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    // const storeUsername = async () => {
    //     try {
    //         await AsyncStorage.setItem('username', enteredUsername);
    //         navigation.replace("ChatScreen");
    //     } catch (error) {
    //         Alert.alert("Error while saving username!");
    //     }
    // }

    const loginHandler = async () => {
        console.log(enteredUsername, enteredPassword);
        const res = await Login(enteredUsername, enteredPassword);
        console.log(res)
        // await storeUsername();
        navigation.navigate('ChatScreen')
        Alert.alert('Login successful', 'You have logged in successfully!')
    }
    
    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
          case 'username':
            setEnteredUsername(enteredValue);
            break;
          case 'password':
            setEnteredPassword(enteredValue);
            break;
        }
      }

    const navigateSignupHandler = () => navigation.navigate('SignupScreen');

    return <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
        <View style={styles.formContainer}>
            <Text style={styles.text}>
                Username
            </Text>
            <TextInput onChangeText={updateInputValueHandler.bind(this, 'username')} value={enteredUsername} placeholder="Please enter your username here" />
            <Text style={styles.text}>
                Password
            </Text>
            <TextInput onChangeText={updateInputValueHandler.bind(this, 'password')} value={enteredPassword} placeholder="Please enter your password here" textContentType="password" secureTextEntry={true}/>
        </View>
        
            <Pressable style={styles.button} onPress={loginHandler}>
            <View >
            <Text style={styles.buttonText}>Log in</Text>
            </View>
            </Pressable>
            <Pressable onPress={navigateSignupHandler}>
                <Text style={styles.text}>Don't have an account?</Text>
            </Pressable>
        </View>
    </View>
}

export default LoginScreen;

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