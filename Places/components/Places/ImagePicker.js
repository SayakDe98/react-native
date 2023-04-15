import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import { useState } from 'react';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

function ImagePicker({ onTakeImage }) {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      const permissionResponse = await requestPermission();
      if(permissionResponse.granted === true) {
        return true;
      }
      return false;
    }

    return true;    
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
        return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    const [ assets ] = image.assets;
    const { uri } = assets;
    console.log('uri',uri);
    setPickedImage(uri);
    onTakeImage(uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>

  if(pickedImage) {
        imagePreview = <Image source={{ uri: pickedImage}} style={styles.image} />
        
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}
      </View>
      {/* <Button title="Take Image" onPress={takeImageHandler} /> */}
      <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        // borderRadius: 4
    }
})

export default ImagePicker;