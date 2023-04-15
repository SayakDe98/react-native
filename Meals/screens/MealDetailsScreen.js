import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/IconButton";
import { FavouritesContext } from "../store/context/favourites-context";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from '../store/redux/favourites';

const MealDetailsScreen = ({ route, navigation }) => {
    // const favouriteMealsCtx = useContext(FavouritesContext);
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find(meal => meal.id === mealId);
    // const mealIsFavourite = favouriteMealsCtx.ids.includes(mealId);

    const  dispatch = useDispatch();

    const favouriteMealIds = useSelector(state => state.favouriteMeals.ids);
    const mealIsFavourite = favouriteMealIds.includes(mealId);
    
    function changeFavouritesStatusHandler() {
        if(mealIsFavourite) {
            // favouriteMealsCtx.removeFavourite(mealId);
            dispatch(removeFavourite({ id: mealId }));
        } else {
            // favouriteMealsCtx.addFavourite(mealId);
            dispatch(addFavourite({ id: mealId }));
        }
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton 
                    icon={mealIsFavourite ? 'star' : 'star-outline'}
                    color="white" 
                    onPress={changeFavouritesStatusHandler} 
                />
            }
        })
    }, [navigation, changeFavouritesStatusHandler]);

    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }}/>
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <View>
                <MealDetails textStyle={styles.detailText} duration={selectedMeal.duration} complexity={selectedMeal.complexity} affordability={selectedMeal.affordability}/>
            </View>
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>

            </View>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },  
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    listOuterContainer: {
      alignItems: 'center'  
    },  
    listContainer: {
        width: '80%'
    }
})

export default MealDetailsScreen;