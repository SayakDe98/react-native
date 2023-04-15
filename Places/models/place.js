export class Place {
    constructor (title, imageUri, location, id) {
        console.log(location)
        this.title = title;
        this.imageUri = imageUri;
        // this.address = location.address;
        // this.location = { lat: location.lat, lng: location.lng };//{ lat: 0.11, long: 128.01 }
        this.location = location
        // this.id = new Date().toString() + Math.random().toString();
        this.id = id;
    }
}