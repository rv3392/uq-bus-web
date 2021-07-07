const apiURL = "https://uq-bus-backend-api.herokuapp.com/"

function secondsToDelayString(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d / 60);
  var s = Math.floor(d);

  if (Math.abs(h) > 1) {
    return h + "h"
  } else if (Math.abs(m) > 1) {
    return m + "m"
  } else if (Math.abs(s) > 0) {
    return s + "s"
  } else {
    return "On Time"
  }
}

class Bus {
    constructor(tripId, stopId, time, stateUpdateCallback) {
  
      this.tripId = tripId;
      this.stopId = stopId;
  
      this.time = "Loading... ";
      this.trip = "Loading... ";
  
      this.route = "Loading...  ";
      this.routeLongName = "Loading...  ";
      this.routeShortName = "...";
      this.routeColour = "";
  
      this.stop = "Loading...  ";
      this.stopName = "...";

      this.delay = "On Time";
      this.delayColour = ""

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
        this.routeColour = locRoute[0].route_color;
      }.bind(this));
  
      var stopPromise = timePromise.then(function() {
        this.time = time;
        this.time = this.time.substring(0, 5);

        return this.getStopPromise(stopId)
      }.bind(this));
  
      var stopPromiseComplete = stopPromise.then(function(locStop) {
        this.stop = locStop;
        this.stopName = stopsDictionary[locStop[0].stop_name];
      }.bind(this));

      var stopTimePromise = this.getTripUpdatePromise(this.tripId).then(function(locTripUpdate) {
        if (locTripUpdate == null || locTripUpdate.length == 0) {
          return null
        }
        console.log(locTripUpdate[0].oid)
        return this.getStopTimeUpdate(locTripUpdate[0].oid)
      }.bind(this));

      var stopTimeComplete = stopTimePromise.then(function(locStopTimes) {
        if (locStopTimes == null || locStopTimes.length == 0) {
          return null
        }

        for (var i = 0; i < locStopTimes.length; i++) {
          console.log(this.stopId + " " + locStopTimes[i].stop_id)
          if (locStopTimes[i].stop_id === this.stopId) {
            this.delay = secondsToDelayString(locStopTimes[i].departure_delay)
            return;
          }
        }
      }.bind(this));

      Promise.all([
        stopPromiseComplete,
        stopTimeComplete
      ]).then(
        function() {
          console.log(this.delay)
          this.isLoading = false;
          stateUpdateCallback(this);
        }.bind(this))
    }
  
    getTripPromise(tripId) {
      return fetch(apiURL + "/trip/trip_id/" + tripId + "/")
          .then(res => res.json());
    }
  
    getRoutePromise(routeId) {
      return fetch(apiURL + "/route/route_id/" + routeId + "/")
          .then(res => res.json());
    }
  
    getStopPromise(stopId) {
      return fetch(apiURL + "/stop/stop_id/" + stopId + "/")
          .then(res => res.json());
    }
  
    getTripUpdatePromise(tripId) {
      return fetch(apiURL + "/trip_update/trip_id/" + tripId + "/")
          .then(res => res.json());
    }
  
    getStopTimeUpdate(tripUpdateId) {
      return fetch(apiURL + "/stop_time_update/trip_update_id/" + tripUpdateId + "/")
          .then(res => res.json());
    }
  }

  export default Bus;