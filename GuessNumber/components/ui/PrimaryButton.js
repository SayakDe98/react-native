import { StyleSheet, Text, View, Pressable } from "react-native"
import Colors from "../../constants/colors";

const PrimaryButton = ({ children, onPress }) => {
    // const resetClickHandler = () => {
    //     console.log("reset");
    //   }
    
    //   const confirmClickHandler = () => {
    //     console.log("confirm");
    //   }
    //   const onPressHandler = () => {
    //     console.log("pressed");
    //   }
  return (
      <View style={styles.buttonOuterContainer}>
            <Pressable 
                onPress={onPress} 
                android_ripple={{ 
                    // color: '#640233'
                    color: Colors.primary600
                    }} 
                style={({ pressed }) => pressed ? 
                [styles.buttonInnerContainer, styles.pressed] 
                : 
                styles.buttonInnerContainer}>
            <Text style={styles.buttonText}>
                {children}
            </Text>
            </Pressable>
        </View>
  );
}

const styles = StyleSheet.create({
    // buttonContainer: {
    //     padding: 5,
    //     borderWidth: 1,
    //     backgroundColor: '#dcf4f3',
    //     borderRadius: 7,
    //     margin: 5
    // }
    buttonInnerContainer: {
        // backgroundColor: '#72063c',
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center'
    },
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',//any effect/styling would go outside of container will be clipped and won't be visible
        
    },
    pressed: {
        opacity: 0.75//25%transparent
    }
});
export default PrimaryButton;