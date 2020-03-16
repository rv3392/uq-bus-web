class Bus {
    constructor(trip) {
        this.tripId = trip;
        this.tripUpdate = this.getTripUpdate(this.tripId);
        console.log(this.tripUpdate);
        this.stopTimeUpdate = this.getStopTimeUpdate(this.tripUpdate.trip_update_id);
        console.log(this.stopTimeUpdate);
    }

    async getTripUpdate(tripId) {
        const dataResponse = 
                await fetch("127.0.0.1:5000/trip_update/trip_id/" 
                + tripId + "/");

        return await dataResponse.json();
    }

    async getStopTimeUpdate(tripUpdateId) {
        const dataResponse =
                await fetch("127.0.0.1:5000/stop_time_update/trip_update_id/" 
                + tripUpdateId + "/");

        return await dataResponse.json();
    }
}