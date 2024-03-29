import { FlatList } from "react-native"
import { CATEGORIES } from "../data/dummy-data"
import CateogoryGridTile from "../components/CategoryGridTile"



function CategoriesScreen ({ navigation }) {
    function renderCategoryItem (itemData) {
        function pressHandler () {
            navigation.navigate('MealsOverview', { 
                categoryId: itemData.item.id
            });
        } 
        
        return (
            <CateogoryGridTile 
                title={itemData.item.title} 
                color={itemData.item.color} 
                onPress={pressHandler} 
            />
        );
    }

    return (
        <>
            <FlatList 
                data={CATEGORIES}
                renderItem={renderCategoryItem}
                keyExtractor={item => item.id}
                numColumns={2}
            /> 
        </>
    )
}

export default CategoriesScreen;
