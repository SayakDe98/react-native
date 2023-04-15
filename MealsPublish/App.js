import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import { Ionicons } from '@expo/vector-icons';
import FavouritesContextProvider from './store/context/favourites-context';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return <Drawer.Navigator screenOptions={{
    title: "Meals Categories",
    headerStyle: { backgroundColor: '#351401' },
    headerTintColor: 'white',
    sceneContainerStyle: { backgroundColor: '#3f2f25' },//used instead of contentStyle
    drawerContentStyle: { backgroundColor: '#351401' },
    drawerActiveTintColor: '#351401',
    drawerInactiveTintColor: 'white',
    drawerActiveBackgroundColor: '#e4baa1'
  }}>
    <Drawer.Screen name="Categories" component={CategoriesScreen} options={{
      title: 'All Categories',
      drawerIcon: ({ size, color }) => <Ionicons name="list" size={size} color={color} />
    }}/>
    <Drawer.Screen name="Favourites" component={FavouritesScreen} options={{
      title: 'Favourites',
      drawerIcon: ({ size, color }) => <Ionicons name="star" size={size} color={color} />
    }}/>
  </Drawer.Navigator>
}

export default function App() {

  return (
    <>
      <StatusBar style='light'/>
      {/* <FavouritesContextProvider> */}
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          title: "Meals Categories",
          headerStyle: { backgroundColor: '#351401' },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: '#3f2f25' }
        }}
        >
          {/* <Stack.Screen 
            name="MealsCategories" 
            component={CategoriesScreen} 
          /> */}
          <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{
            title: 'All Categories',
            headerShown: false
          }}
          />
          <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
          <Stack.Screen name="MealDetail" component={MealDetailsScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
          </Provider>
    {/* </FavouritesContextProvider> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {}
});
