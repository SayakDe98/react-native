import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { PermissionStatus, getCurrentPositionAsync, useForegroundPermissions } from "expo-location";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

function LocationPicker ({ onPickLocation }) {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused();//returns boolean if screen is currently focsued else false. This will become false when we enter map and true when we come out of the map
    const navigation = useNavigation();
    const route = useRoute();
    
    useEffect (() => {
        if(isFocused && route.params) {
        const mapPickedLocation = { 
            lat: route.params.pickedLat, 
            lng: route.params.pickedLng
        };
            setPickedLocation(mapPickedLocation);
            onPickLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    // useEffect (() => {
    //     async function handleLocation () {
    //         if(pickedLocation) {
    //             await getAddress(pickedLocation.lat, pickedLocation.lng);
    //             onPickLocation(pickedLocation)
    //         }
    
    //         onPickLocation({ ...pickedLocation, address });
    //         onPickLocation({ ...pickedLocation, address });
    //     }
    //     handleLocation();
    // }, [pickedLocation, onPickLocation]);

    async function verifyPermissions () {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            
            return permissionResponse.granted;
        }
        
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
                );
                const permissionResponse = await requestPermission();
                if(permissionResponse.granted === true) {
                    return true;
                }
                return false;
            }
            
            return true;
        }
        
        async function getLocationHandler () {
            const hasPermission = await verifyPermissions();

            if(!hasPermission) {
                return;
            }

            const location = await getCurrentPositionAsync();//gets current position of user
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        }
    function pickOnMapHandler () {
        navigation.navigate('Map');    
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if(pickedLocation) {
        locationPreview = <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}} />
    }

    return <View>
        <View style={styles.mapPreview}>
            {locationPreview}
        </View>
        <View style={styles.actions}>
            <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
            <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick On Map</OutlinedButton>
        </View>
    </View>
}

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',//to occupy full map contaier
        // borderRadius: 4
    }
})

export default LocationPicker;