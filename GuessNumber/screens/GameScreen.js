//Here we see guesses by phone. It is used for checking if score is less or higher
//This is first screen.

import { Alert, FlatList, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Title from "../components/ui/Title.ios";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initalGuess = generateRandomBetween(1, 100, userNumber);

  const [currentGuess, setCurrentGuess] = useState(initalGuess);
  const [guessRounds, setGuessRounds] = useState([initalGuess]);

  useEffect(() => {
    if(currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);//this works only when component is rendered first time

  const { width, height } = useWindowDimensions();

  function nextGuessHandler(direction) {
    if((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)){
      Alert.alert("Sorry!", "Don't lie!, you know that's wrong...", [{ text: "Cancel", style: 'cancel'}]);
    }
      if(direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRandNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRandNumber);
    setGuessRounds(prevGuessRounds => [newRandNumber, ...prevGuessRounds]);//for showing latest at top
  }
  
  const guessRoundsListLength = guessRounds.length;

  let content = (
  <> 
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card>
      <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" />
          </PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name="md-add" size={24} color="white" />
          </PrimaryButton>
        </View>
      </View>
    </Card>
</>
  );
  
  if(width > 500) {
    content = (
      <>
        <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainerWide}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" />
          </PrimaryButton>
        </View>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name="md-add" size={24} color="white" />
          </PrimaryButton>
        </View>
        </View>
        <NumberContainer>{currentGuess}</NumberContainer>
      </>
    );
  }

  return (
    <View style={styles.screen}>
        <Title style={styles.title}>Opponent's Guess</Title>
       {content}
        <View style={styles.listContainer}>
          <FlatList 
          alwaysBounceVertical={false}
          data={guessRounds}
          renderItem={itemData => 
            <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />
          }
          keyExtractor={item => item}
          />
          {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop: 20,
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1
  },
  instructionText: {
    marginBottom: 12
  },
  listContainer: {
    flex: 1,
    padding: 16
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default GameScreen;