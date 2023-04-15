import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    // console.log(enteredGoalText);
    // setCourseGoals([...courseGoals, enteredGoalText]);//not a good way since current state depend on prev state
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() }
    ]); //appends new course goal to old course goals
    // setEnteredGoalText('');
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    // console.log("delete");
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter(goal => goal.id !== id);
    });
  }
  console.log("App component rendered.");
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
      <Button title='Add New Goal' color='#bb96eb' onPress={startAddGoalHandler} />
      {modalIsVisible && <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} onCancel={endAddGoalHandler} />}
        <View style={styles.goalsContainer}>

        <FlatList style={styles.goalsContainer} 
        alwaysBounceVertical="false"
        data={courseGoals}
        renderItem={itemData => { 
          return(
            <GoalItem text={itemData.item.text} onDeleteItem={deleteGoalHandler} id={itemData.item.id} />
            )
          }}
          keyExtractor={item => {
            return item.id
          }}
          />
          {/* {courseGoals.map((goal, i) => (
            <View key={i} style={styles.goalItem}>
            <Text style={styles.goalItem} key={i}>
            {goal}
            </Text>
            </View>
          ))} */}
            {/* </FlatList> */}
          </View>
      </View>
  </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5
  }
});
