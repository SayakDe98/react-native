//This screen is visible when game gets over to check the scores

import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, Platform } from 'react-native'
import Title from '../components/ui/Title.ios'
import Colors from '../constants/colors'
import PrimaryButton from '../components/ui/PrimaryButton'

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
  const { width, height } = useWindowDimensions();
  
  if(width < 380) {//code enters here when potratit mode is on
    imageSize = 150;
  }

  if(height < 400) {//code enters here when landscape mode is on
    imageSize = 80;
  }

  const imageStyle =  {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2
  }

  return (
    <ScrollView style={styles.screen} >
    <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image style={styles.image} source={require('../assets/images/success.png')}/>
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <PrimaryButton>Start New Game</PrimaryButton>
    </View>
    </ScrollView>
  )
}

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    // borderWidth: Platform.OS === 'android' ? 2 : 0,
    borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500
  },
  screen: {
    flex: 1
  }
});

export default GameOverScreen;