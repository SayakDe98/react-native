import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import IconButton from '../components/UI/IconButton';
import { useNavigation } from '@react-navigation/native';

function Map ({ navigation, route }) {
    const initialLocation = route.params && { 
        lat: route.params.initalLat,
        lng: route.params.initalLng
    };

    const [selectedLocation, setSelectedLocation] = useState();

    useLayoutEffect(() => {
        if(initialLocation) {
            return;
    }
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton 
            icon="save" 
            size={24} 
            color={tintColor} 
            onPress={savePickedLocationHandler} 
            />
        })
    }, [navigation, savePickedLocationHandler, initialLocation]);
    
    const region = {
        latitude: initialLocation ? initialLocation.lat : 18.56358,
        longitude: initialLocation ? initialLocation.lng : 73.7642998,
        // latitudeDelta: 0.0922,
        latitudeDelta: 0.0022,
        // longitudeDelta: 0.0421
        longitudeDelta: 0.00421
    };

    function selectLocationHandler (event) {
        if(initialLocation) {
            return;
        }

        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat, lng });
        console.log('selected location',selectedLocation);
    }

    const savePickedLocationHandler = useCallback(() => {//usecallback ensures function defined inside a component isn't recreated uneccesarily and we are wrapping this inside usecallback because we don't want useLyout effect to run inifnitely
        console.log('save picked location',selectedLocation);
        if (!selectedLocation) {
            Alert.alert('No location picked!', 'You have to pick a location (by tapping on the map) first');
            return;
        }
        navigation.navigate('AddPlace', { 
            pickedLat: selectedLocation.lat, 
            pickedLng: selectedLocation.lng 
        });
    }, [navigation, selectedLocation]);

    return <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler}>
        {selectedLocation && <Marker title="Picked Location" coordinate={{ 
            latitude: selectedLocation.lat, 
            longitude: selectedLocation.lng 
            }} 
        />}
    </MapView>
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

export default Map;