import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { NavigationContainer } from '@react-navigation/native';
import ChatScreen from './screens/ChatScreen';
import MessagingScreen from './screens/MessagingScreen';

const Stack = createStackNavigator();

export default function App() {
  
  return <>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            title: 'Chat App',
            headerStyle: { backgroundColor: '#6948ed'},
            headerTintColor: 'white'
          }}>
          
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
              title: 'Login'
            }}/>
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{
              title: 'Create new user'
            }}/>
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{
              title: 'Chats',
              headerShown: false
            }}
            />
              <Stack.Screen name="MessagingScreen" component={MessagingScreen} options={{
              title: 'Mesages',
            }}
            />
          </Stack.Navigator>
        </NavigationContainer>
  </>
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
