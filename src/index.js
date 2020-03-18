import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BusDisplayTable from './busDisplayTable.js';
import Bus from './bus.js';

const uqStops = ["1853", "1877", "1878", "1880", "1883", "1882"];

class App extends React.Component {

  state = {
    departingBuses: [],
    arrivingBuses: []
  };

  componentDidMount() {
    this.getBuses();
  }

  stateUpdateCallback(bus, direction) {
    var buses = [bus];

    if (direction === "departing") {
      buses = this.state.departingBuses.concat(buses);
      this.setState({
        departingBuses : buses,
        arrivingBuses : this.state.arrivingBuses
      });
    } else if (direction === "arriving") {
      buses = this.state.arrivingBuses.concat(buses);
      this.setState({
        departingBuses : this.state.departingBuses,
        arrivingBuses : buses
      });
    }
    
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

    return fetch("http://uqbus.richal.tech/stop_time/stop_id/" + stopId + "/current_time/" + date + " " + time + "/")
      .then(res => {
        return res.json();
      });
  }

  getBuses() {
    var busPromises = [];
    var stopTimes = [];

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
      });
    });
  }

  render() {
    return (
    <div className="BusTable">
      <h2>Departures</h2>
      <BusDisplayTable app = {this} buses = {this.state.departingBuses}/>
      <h2>Arrivals</h2>
      <BusDisplayTable app = {this} buses = {this.state.arrivingBuses}/>
    </div>
    );
  }
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);