import React from 'react';
import './index.css';

import BusDisplayTable from './busDisplayTable.js';
import Bus from './bus.js';

const uqStops = ["1853", "1877", "1878", "1880", "1883", "1882"];
const apiURL = "https://uq-bus-backend-api.herokuapp.com/" //http://uqbus.richal.tech/

class BusDisplay extends React.Component {
    state = {
        buses: [],
        loadingBuses: [],
        isLoading: "loading"
    };

    componentDidMount() {
        this.getBuses();
    }

    stateUpdateCallback(bus) {
        var isLoading = "done";

        console.log(bus);

        var buses = this.state.buses.concat([bus]);
        this.state.loadingBuses.forEach((bus) => 
                bus.isLoading === true ? isLoading = "loading" : isLoading);

        this.setState({
            buses: buses,
            isLoading: isLoading
        });

        this.forceUpdate();
    }

    getBuses() {
        var stops = ""

        var today = new Date();
        var today_brisbane = new Date(today.toLocaleString('en-US', {timezone: "Australia/Brisbane"}));

        var date = today_brisbane.getFullYear() + '-' 
            + (today_brisbane.getMonth() + 1).toString().padStart(2, "0") + '-' 
            + today_brisbane.getDate().toString().padStart(2, "0");

        var time = today_brisbane.getHours().toString().padStart(2, "0") 
            + ':' + today_brisbane.getMinutes().toString().padStart(2, "0") 
            + ':' + today_brisbane.getSeconds().toString().padStart(2, "0");

        for (var i = 0; i < uqStops.length; i++) {
            stops = i === uqStops.length - 1 ? stops.toString() + uqStops[i].toString() : stops.toString() + uqStops[i].toString() + ","; 
        }

        var busPromises = fetch(apiURL + "/stop_time?time=" + date + " " + time + "&stop_id=" + stops)
                .then(res => {
                    return res.json();
                });

        busPromises.then(stopTimes => {
            stopTimes.forEach(busJSON => {
                let bus = "";
                var buses = [];
                console.log(busJSON);
                if (this.props.name === "Departing") {
                    console.log(busJSON);
                    if (busJSON.stop_id !== "1882") {
                        bus = new Bus(busJSON.trip_id, busJSON.stop_id, busJSON.departure_time, this);
                        buses = [bus];
                        this.setState({loadingBuses: this.state.loadingBuses.concat(buses)});
                    }
                } else if (this.props.name === "Arriving") {
                    if (busJSON.stop_id === "1882") {
                        bus = new Bus(busJSON.trip_id, busJSON.stop_id, busJSON.departure_time, this);
                        buses = [bus];
                        this.setState({loadingBuses: this.state.loadingBuses.concat(buses)});
                    }
                }
            });
        });
    }

    render() {
        return (
        <div className="BusTable">
            <h3>{this.props.name}</h3>
            <BusDisplayTable loading = {this.state.isLoading} buses = {this.state.buses}/>
        </div>
        );
    }
}

export default BusDisplay;