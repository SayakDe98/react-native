import { StyleSheet, Text } from "react-native"
import Colors from "../../constants/colors";

const Title = ({ children }) => {
  return (
    <Text style={styles.title}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    fontFamily: 'open-sans-bold',
    maxWidth: '80%',
    width: 300
  }
})

export default Title;