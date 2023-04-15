import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces ({ route }) {
    const [ loadedPlaces, setLoadedPlaces ] = useState([]);
    const isFocused = useIsFocused();
    // console.log("All places:",route.params.place);
    useEffect(() => {
        async function loadedPlaces () {
            const places = await fetchPlaces();
            setLoadedPlaces(places);
        }
        // if(isFocused && route.params) {
        if(isFocused) {
            // setLoadedPlaces(currentLoadedPlaces => [...currentLoadedPlaces, route.params.place]);
            loadedPlaces();
        }
    // },[isFocused, route])
    },[isFocused])

    return <PlacesList places={loadedPlaces} />
}

export default AllPlaces;