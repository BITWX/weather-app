class Location{

    constructor(name,region,country,latitude,longitude,forecasts){
        this.name = name;
        this.region = region;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.forecasts = forecasts;
    }
    
    get Coordinates(){
        return `${this.latitude},${this.longitude}`;
    }

}

export default Location;