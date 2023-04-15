import { useState } from "react";
import { Button, StyleSheet, TextInput, View, Modal, Image } from "react-native";

const GoalInput = (props) => {

  const [enteredGoalText, setEnteredGoalText] = useState("");

  function goalInputHandler(enteredText) {
    // console.log(enteredText);//we get the entered text in terminal.
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText("");
  }

  console.log("Goal Input component rendered.");
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image source={require('../assets/images/goal.png')} style={styles.image} />
      <TextInput
        style={styles.textInput}
        placeholder="Your course goal!"
        placeholderTextColor="#302b3d"
        value={enteredGoalText}
        onChangeText={goalInputHandler}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button color='green' title="Add Goal" onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" color='red' onPress={props.onCancel} />
          </View>
        </View>
    </View>
  </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: '#5e0acc'
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    width: "100%",
    padding: 16,
    color: '#120438',
    borderRadius: 6,
    backgroundColor: '#e4d0ff',
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row'
  },
  button: {
    width: 100,
    marginHorizontal: 8,

  },
  image: {
    height: 100,
    width: 100,
    margin: 20
  }
})
export default GoalInput;