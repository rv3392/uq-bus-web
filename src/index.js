import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BusDisplayTable from './BusDisplayTable.js';

//Gets bus details from 'trips' table using a trip_id
//trip_id is one of the next 'x' busses departing from uq (stop_times)
//Gets further bus details from 'routes' table using a route_id found in
//'trips'

const uqStops = ["1853", "1878", "1880"];//, "1880", "1882", "1883"];

class App extends React.Component {

  state = {
    buses: []
  }

  //var today = Date();
  //var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  componentDidMount() {
    this.getBuses();
  }

  getBusesForStop(stopId) {
    return fetch("http://uqbus.richal.tech/stop_time/stop_id/" + stopId + "/")
      .then(res => res.json());
  }

  getBuses() {
    var tripPromises = [];
    var trips = [];

    for (var i = 0; i < uqStops.length; i++) {
      tripPromises = tripPromises.concat(this.getBusesForStop(uqStops[i]));
    }

    Promise.all(tripPromises).then(values => {
      values.forEach(value => trips = trips.concat(value));
      this.setState({buses: trips});
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