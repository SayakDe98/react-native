import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';
import { Place } from '../../models/place';

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(enteredText) {

    setEnteredTitle(enteredText);
    console.log("Entered title", enteredTitle);
  }
  
  function takeImageHandler (imageUri) {
    console.log('imageuri',imageUri);
    setSelectedImage(imageUri)
    console.log('slected image', selectedImage);
  }
  
  const pickLocationHandler = useCallback((location) => {
    console.log("Picked", location);
    setPickedLocation(location);
    console.log("picked location!!1",pickedLocation);
  }, []);//useCallback is used because we don't want pickLocationHandler isn't reacreated uneccessarily and we avoid getting inside useEffect uneccesarily
  
  
  function savePlaceHandler () {
    
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    console.log("Place data",placeData);
    onCreatePlace(placeData);
    console.log(enteredTitle);
    console.log(selectedImage);
    console.log(pickedLocation);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});