import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";
import { useLayoutEffect, useEffect } from "react";
import MealsList from "../components/MealsList/MealsList";

const MealsOverviewScreen = ({ route, navigation }) => {
    const catId = route.params.categoryId;
    
    //Alternative:
    // const route = useRoute();
    // const catId = route.params.categoryId;
    const displayedMeals = MEALS.filter(mealItem => mealItem.categoryIds.indexOf(catId) >= 0);

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find(category => category.id === catId).title;
    
        navigation.setOptions({
            title: categoryTitle
        });
    }, [catId, navigation]);

    return <MealsList items={displayedMeals}/>
}

export default MealsOverviewScreen;