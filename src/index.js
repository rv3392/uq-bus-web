import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BusDisplayTable from './BusDisplayTable.js';

//Gets bus details from 'trips' table using a trip_id
//trip_id is one of the next 'x' busses departing from uq (stop_times)
//Gets further bus details from 'routes' table using a route_id found in
//'trips'

const uqStops = ["1853", "1877", "1878", "1880", "1883", "1882"];

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

class App extends React.Component {

  state = {
    departingBuses: [],
    arrivingBuses: []
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

    var date = today_brisbane.getFullYear() + '-' 
        + (today_brisbane.getMonth() + 1).toString().padStart(2, "0") + '-' 
        + today_brisbane.getDate().toString().padStart(2, "0");

    var time = today_brisbane.getHours().toString().padStart(2, "0") 
        + ':' + today_brisbane.getMinutes().toString().padStart(2, "0") 
        + ':' + today_brisbane.getSeconds().toString().padStart(2, "0");

    return fetch("http://uqbus.richal.tech/stop_time/stop_id/" 
        + stopId + "/current_time/" + date + " " + time + "/")
        .then(res => {
          return res.json();
        });
  }

  getBuses() {
    var busPromises = [];
    var stopTimes = [];
    var departingBuses = [];
    var arrivingBuses = [];

    for (var i = 0; i < uqStops.length; i++) {
      busPromises = busPromises.concat(this.getBusesForStop(uqStops[i]));
    }

    Promise.all(busPromises).then(values => {
      values.forEach(value => stopTimes = stopTimes.concat(value));
      stopTimes.forEach(busJSON => {
        var direction = busJSON.stop_id !== "1882" ? "departing" : "arriving";
        var bus = new Bus(busJSON.trip_id, busJSON.stop_id, 
            busJSON.departure_time, direction, this);
        console.log(bus);

        if (direction === "departing") {
          departingBuses.push(bus);
        } else {
          arrivingBuses.push(bus);
        }
      });

      this.setState({
        departingBuses: departingBuses,
        arrivingBuses: arrivingBuses
      });

    });
  }

  render() {
    return (
    <div className="BusTable">
      <h2>Departures</h2>
      <BusDisplayTable buses = {this.state.departingBuses}/>
      <h2>Arrivals</h2>
      <BusDisplayTable buses = {this.state.arrivingBuses}/>
    </div>
    );
  }
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);