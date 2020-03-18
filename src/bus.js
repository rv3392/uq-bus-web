class Bus {
    constructor(tripId, stopId, time, direction, application) {
  
      this.tripId = tripId;
      this.stopId = stopId;
      this.direction = direction;
  
      this.time = "Loading...  ";
      this.trip = "Loading...  ";
  
      this.route = "Loading...  ";
      this.routeLongName = "Loading...  ";
      this.routeShortName = "Loading...  ";
  
      this.stop = "Loading...  ";
      this.stopName = "Loading...  ";
  
      var routePromise = this.getTripPromise(this.tripId).then(function(locTrip) {
        this.trip = locTrip[0];
        return this.getRoutePromise(locTrip[0].route_id);
      }.bind(this));
  
      var completedRoutePromise = routePromise.then(function(locRoute) {
        this.route = locRoute;
        this.routeLongName = locRoute[0].route_long_name;
        this.routeShortName = locRoute[0].route_short_name;
      }.bind(this));
  
      completedRoutePromise.then(function() {
        this.time = time;
        application.stateUpdateCallback();
      }.bind(this));
  
      var completedStopPromise = 
          this.getStopPromise(stopId).then(function(locStop) {
        this.stop = locStop;
        this.stopName = locStop[0].stop_name;
      }.bind(this));
  
      completedStopPromise.then(() => application.stateUpdateCallback);
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