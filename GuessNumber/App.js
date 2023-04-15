import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if(!fontsLoaded) {
    return <AppLoading />;
  }

  const pickedNumberHandler = pickedNumber => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);//new game starts so rounds = 0
  }

  if(userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if(gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
  }


  return (
    <>
    <StatusBar style='light' />
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground source={require('./assets/images/background.png')} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backgroundImage}>
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>  
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,//flex 1 means takes as much space as available
  },
  backgroundImage: {
    opacity: 0.15
  }
});
