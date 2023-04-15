import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabase('places.db');//db is a extension

export function dropTable () {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`DROP TABLE places`,
            [],
            () => {
                resolve();
            },
            (_,err) => reject(err))
        })
    })
    return promise;
}

export function init () {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    imageUri TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL
                    )`,
                    [],//no data is to be injected so empty array
                    () => {
                        resolve();
                    },
                    (_, error) => {
                        reject(error);
                    }//blank(_) means we need to pass something but im passing nothign
                    );//pass sql instruction as a string to this function
                });//executes query against the db.
            });
            
            return promise;
}

export function insertPlace (place) {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`
                INSERT INTO places (title, imageUri, lat, lng) VALUES (?, ?, ?, ?)`, [place.title, place.imageUri, place.location.lat, place.location.lng],
                (_, result) => { 
                    console.log(result);
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        })
    });
    return promise;
}

export function fetchPlaces () {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`SELECT * FROM places`,
            [],//no data is to be injected so empty array
            (_, result) => {
                console.log(result.rows._array);
                const places = [];
                for(const dp of result.rows._array) {
                    places.push(new Place(dp.title, dp.imageUri, dp.lat, dp.id))
                }
                resolve(places);
            },
            (_, err) => {
                console.log(err);
                reject(err);
            })
        });
    });

    return promise;
}

export function fetchPlaceDetails (id) {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(`SELECT * FROM places WHERE id = ?`,[id],
            (_, result) => {
                console.log(result);
                const dbPlace = result.rows._array[0];
                const place = new Place(dbPlace.title, dbPlace.imageUri, dbPlace.location, dbPlace.id);
                resolve(place);
            },
            (_, error) => {reject(error)});
        })
    })
    return promise;
}