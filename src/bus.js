class Bus {
    constructor(tripId, stopId, time, application) {
  
      this.tripId = tripId;
      this.stopId = stopId;
  
      this.time = "Loading... ";
      this.trip = "Loading... ";
  
      this.route = "Loading...  ";
      this.routeLongName = "Loading...  ";
      this.routeShortName = "...";
  
      this.stop = "Loading...  ";
      this.stopName = "...";

      this.isLoading = true;

      const stopsDictionary = {"UQ Lakes, platform A": "A",
                                "UQ Lakes, platform B": "B",
                                "UQ Lakes, platform C": "C",
                                "UQ Lakes, platform D": "D",
                                "UQ Lakes, platform E": "E",
                                "UQ Lakes station": "Any"};
  
      var routePromise = this.getTripPromise(this.tripId).then(function(locTrip) {
        this.trip = locTrip[0];

        return this.getRoutePromise(locTrip[0].route_id);
      }.bind(this));
  
      var timePromise = routePromise.then(function(locRoute) {
        this.route = locRoute;
        this.routeLongName = locRoute[0].route_long_name;
        this.routeShortName = locRoute[0].route_short_name;
      }.bind(this));
  
      var stopPromise = timePromise.then(function() {
        this.time = time;
        this.time = this.time.substring(0, 5);

        return this.getStopPromise(stopId)
      }.bind(this));
  
      var loadCompletePromise = stopPromise.then(function(locStop) {
        this.stop = locStop;
        this.stopName = stopsDictionary[locStop[0].stop_name];
      }.bind(this));
  
      loadCompletePromise.then(function() {
        this.isLoading = false;
        application.stateUpdateCallback(this);
      }.bind(this));
    }
  
    getTripPromise(tripId) {
      return fetch("http://uqbus.richal.tech/trip/trip_id/" + tripId + "/")
          .then(res => res.json());
    }
  
    getRoutePromise(routeId) {
      return fetch("http://uqbus.richal.tech/route/route_id/" + routeId + "/")
          .then(res => res.json());
    }
  
    getStopPromise(stopId) {
      return fetch("http://uqbus.richal.tech/stop/stop_id/" + stopId + "/")
          .then(res => res.json());
    }
  
    getTripUpdatePromise(tripId) {
      return fetch("http://uqbus.richal.tech/trip_update/trip_id/" + tripId + "/")
          .then(res => res.json());
    }
  
    getStopTimeUpdate(tripUpdateId) {
      return fetch("http://uqbus.richal.tech/stop_time_update/trip_update_id/" + tripUpdateId + "/")
          .then(res => res.json());
    }
  }

  export default Bus;