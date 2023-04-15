import { Dimensions, StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

const Card = ({ children }) => {
  return (
    <View style={styles.inputContainer}>
        {children}
    </View>
  )
}
const deviceWidth = Dimensions.get('window').width;

const styles= StyleSheet.create({
    inputContainer: {
        // flex: 1,//element takes as much space as possible in the scrren, if there are sibling element then it will get distributed accordingly
        padding: 16,
        marginTop: deviceWidth < 380? 18 : 36,//to add extra white space on top
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
      }
})
export default Card;