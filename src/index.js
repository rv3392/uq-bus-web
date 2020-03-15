import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Gets bus details from 'trips' table using a trip_id
//trip_id is one of the next 'x' busses departing from uq (stop_times)
//Gets further bus details from 'routes' table using a route_id found in
//'trips'

const uqStops = ["1853", "1878", "1880", "1882", "1883"];

class App extends React.Component {

  state = {
    buses: []
  }

  //, "1877", "1878", "1880", "1882", "1883"];

  //var today = Date();
  //var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  async getBusesForStop(stopId) {
    const tripIdResponse =
        await fetch("http://uqbus.richal.tech/stop_time/stop_id/" + stopId + "/");

    const trips = await tripIdResponse.json()
    var tripsArray = []

    for (var i = 0; i < 5; i++) {
      tripsArray.push(trips[i].trip_id);
    }

    this.setState({
      buses: tripsArray
    });
  }

  getBuses() {
    uqStops.forEach(stopId => this.getBusesForStop(stopId))
  }

  getBusListElement() {
    this.getBuses();

    return (
      this.state.buses.map(bus => 
        <li key = {bus}>{bus}</li>
      ));
  }

  render() {
    return this.getBusListElement();
  }
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);