import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BusDisplayTable from './BusDisplayTable.js';

//Gets bus details from 'trips' table using a trip_id
//trip_id is one of the next 'x' busses departing from uq (stop_times)
//Gets further bus details from 'routes' table using a route_id found in
//'trips'

const uqStops = ["1853", "1878", "1880", "1882", "1883"];

class Bus {
  constructor(tripId, stopId, departureTime, application) {
    this.tripId = tripId;
    this.stopId = stopId;
    this.departureTime = departureTime;

    this.trip = "Loading...";
    this.route = "Loading...";
    this.route_long_name = "Loading...";
    this.route_short_name = "Loading...";

    var routePromise = this.getTripPromise(this.tripId).then(function(locTrip) {
      this.trip = locTrip[0];
      console.log(locTrip[0]);
      return this.getRoutePromise(locTrip[0].route_id);
    }.bind(this));

    var completedPromise = routePromise.then(function(locRoute) {
      this.route = locRoute;
      this.route_long_name = locRoute[0].route_long_name;
      this.route_short_name = locRoute[0].route_short_name;
      console.log(locRoute);
    }.bind(this));

    completedPromise.then(function() {
      application.stateUpdateCallback();
    });    
  }

  getTripPromise(tripId) {
    return fetch("http://uqbus.richal.tech/trip/trip_id/" + tripId + "/")
        .then(res => res.json());
  }

  getRoutePromise(routeId) {
    return fetch("http://uqbus.richal.tech/route/route_id/" + routeId + "/")
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

class App extends React.Component {

  state = {
    buses: []
  };

  componentDidMount() {
    this.getBuses();
  }

  stateUpdateCallback() {
    this.forceUpdate();
  }

  getBusesForStop(stopId) {
    var today = new Date();
    var today_brisbane = new Date(today.toLocaleString('en-US', {timezone: "Australia/Brisbane"}));

    var date = today_brisbane.getFullYear() + '-' + (today_brisbane.getMonth() + 1) + '-' + today_brisbane.getDate();
    var time = today_brisbane.getHours() + ':' + today_brisbane.getMinutes() + ':' + today_brisbane.getSeconds();

    return fetch("http://uqbus.richal.tech/stop_time/stop_id/" 
        + stopId + "/current_time/" + date + " " + time + "/")
        .then(res => {
          return res.json();
        });
  }

  getBuses() {
    var busPromises = [];
    var stopTimes = [];
    var importedBuses = [];

    for (var i = 0; i < uqStops.length; i++) {
      busPromises = busPromises.concat(this.getBusesForStop(uqStops[i]));
    }

    Promise.all(busPromises).then(values => {
      values.forEach(value => stopTimes = stopTimes.concat(value));
      stopTimes.forEach(busJSON => {
        var bus = 
            new Bus(busJSON.trip_id, busJSON.stop_id, 
            busJSON.departure_time, this);
        importedBuses.push(bus);
      });

      this.setState({
        buses: importedBuses
      });

    });
  }

  render() {
    return (
    <div className="BusTable">
      <BusDisplayTable buses = {this.state.buses}/>
    </div>
    );
  }
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);