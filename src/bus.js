class Bus {
    constructor(tripId) {
        this.tripId = tripId;
        tripUpdate = getTripUpdate(tripId);
        stopTimeUpdate = getStopTimeUpdate();
    }

    getTripUpdate(tripId) {
        const dataResponse = 
                await fetch("https://uqbus.richal.tech/trip_update/trip_id/\"" 
                + tripId + "\"");

        return await dataResponse.json();
    }

    getStopTimeUpdate(tripUpdateId) {
        const dataResponse =
                await fetch("https://uqbus.richal.tech/stop_time_update/trip_update_id/\"" 
                + tripUpdateId + "\"");

        return await dataResponse.json();
    }
}