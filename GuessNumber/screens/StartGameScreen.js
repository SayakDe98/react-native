//acts as a start screen where we input number for computer to guess
import React, { useState } from 'react'
import { Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';
import Title from '../components/ui/Title.ios';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

const StartGameScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState('');
  const { width, height } = useWindowDimensions();

  const resetInputHandler = () => {
    setEnteredNumber('');
  }

  const confirmInputHandler = () => {
    const choosenNumber = parseInt(enteredNumber);

    if(isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      //show alert
      Alert.alert(
        'Invalid number', 
        'Number has to be a number between 1 and 99.', 
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
      return;//to cancel this functions execution
    }
    onPickNumber(choosenNumber);
  }

  const numberInputHandler = (enteredText) => {
    setEnteredNumber(enteredText);
  }

  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
    <KeyboardAvoidingView style={styles.screen} behavior='position'>
      <View style={[styles.rootConatiner, { marginTop: marginTopDistance }]}>
        <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter a Number</InstructionText>
          <TextInput style={styles.numberInput} maxLength={2} keyboardType="number-pad" value={enteredNumber}  onChangeText={numberInputHandler} />
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
            {/* <Pressable onPress={resetClickHandler}> */}
              <PrimaryButton onPress={resetInputHandler} >Reset</PrimaryButton>
          {/* </Pressable> */}
            </View>
            <View style={styles.buttonContainer}>
            {/* <Pressable onPress={confirmClickHandler}> */}
              <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
            {/* </Pressable> */}
            </View>
          </View>
      </Card>
    </View>
    </KeyboardAvoidingView>
    </ScrollView>
  );
}

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  rootConatiner: {
    flex: 1,
    marginTop: deviceHeight < 400 ? 30 : 100,
    alignItems: 'center'
  },
  inputContainer: {
      // flex: 1,//element takes as much space as possible in the scrren, if there are sibling element then it will get distributed accordingly
      padding: 16,
      marginTop: 36,//to add extra white space on top
      // backgroundColor: '#4e0329',//gives background color
      backgroundColor: Colors.primary800,//gives background color
      marginHorizontal: 24,//spaing toleft and right
      marginBottom: 24,//so that bottom also has margin and it looks good
      borderRadius: 8,//rounded corners to input area
      elevation: 4,//for shadow in android
      //shadowColor, shadowOffset, shadowRadius is for ios
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 0.25,
      // flexDirection: 'row',
      // justifyContent: 'center',
      alignItems: 'center'
    },
  
    numberInput: {
      height: 50,
      fontSize: 32,//gives us big numbers
      // borderBottomColor: '#ddb52f',
      borderBottomColor: Colors.accent500,
      borderBottomWidth: 2,//to see bottom border
      color: Colors.accent500,//for the text inputted
      marginVertical: 8,//for adding exact same space in top and bottom
      fontWeight: 'bold',//for adding weight to font
      width: 35,//for setting the length of the underline below the number
      textAlign: 'center'// used for centering the number
    },
    buttonsContainer: {
      flexDirection: 'row'
    },
    buttonContainer: {
      flex: 1
    }
})

export default StartGameScreen;