import { createContext, useState } from "react";

export const FavouritesContext = createContext({
    ids: [],
    addFavourite: (id) => {},
    removeFavourite: (id) => {}
});

function FavouritesContextProvider({ children }) {
    const [favouriteMealIds, setFavouriteMealIds] = useState([]);

    function addFavourite (id) {
        setFavouriteMealIds(currentFavouriteMealIds => [...currentFavouriteMealIds, id])
    }

    function removeFavourite (id) {
        setFavouriteMealIds(currentFavouriteMealIds => currentFavouriteMealIds.filter(favouriteMealId => favouriteMealId !== id));
    }

    const value = {
        ids: favouriteMealIds,
        addFavourite: addFavourite,
        removeFavourite: removeFavourite
    }
    return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}

export default FavouritesContextProvider;