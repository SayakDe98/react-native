import { StyleSheet, Text, View, Pressable } from "react-native";

const GoalItem = (props) => {
  console.log("Goal Item component rendered.");
  
  return (
    <View key={props.index} style={styles.goalItem}>
        <Pressable android_ripple={{ color: '#210644' }} onPress={props.onDeleteItem.bind(this, props.id)} style={({ pressed }) => pressed && styles.pressedItem } >
          <Text style={styles.goalText}>{props.text}</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: "#5e0acc",
        color: "white",
      }, 
      goalText: {
        color: 'white',
        padding: 8
    },
    pressedItem: {
      opacity: 0.5
    }
});

export default GoalItem;