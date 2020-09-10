import React, { useState, useEffect, useCallback } from 'react';

import BusDisplayTable from './bus_display_table.js';
import Bus from './bus.js';

const uqStops = ["1853", "1877", "1878", "1880", "1883", "1882"];
const apiURL = "https://uq-bus-backend-api.herokuapp.com/" //http://uqbus.richal.tech/

function getBrisbaneTime() {
    var today = new Date();
    var brisbane_today = today.toLocaleString('en-US', {timezone: "Australia/Brisbane"})
    return new Date(brisbane_today);
}

function dateToString(date) {
    return date.getFullYear() + '-' 
            + (date.getMonth() + 1).toString().padStart(2, "0") + '-' 
            + date.getDate().toString().padStart(2, "0");
}

function timeToString(date) {
    return date.getHours().toString().padStart(2, "0") 
        + ':' + date.getMinutes().toString().padStart(2, "0") 
        + ':' + date.getSeconds().toString().padStart(2, "0");
}

function getUqStopsString() {
    var stops = "";
    for (var i = 0; i < uqStops.length; i++) {
        stops = i === uqStops.length - 1 ? stops.toString() + uqStops[i].toString() : 
                stops.toString() + uqStops[i].toString() + ","; 
    }

    return stops;
}

function BusDisplay(props) {
    const [buses, setBuses] = useState([])
    const [loadingBuses, setLoadingBuses] = useState([])
    const [isLoading, setIsLoading] = useState("loading")

    useEffect(() => {
        getBuses();
    }, []);

    const stateUpdateCallback = useCallback((bus) => {
        console.log("Finished Loading: ", bus);
        
        // Remove bus that just finished loading and check if there are any others remaining
        setLoadingBuses((loadingBuses) => loadingBuses.splice(loadingBuses.indexOf(bus)));
        if (loadingBuses.length == 0) {
            setIsLoading("done");
        } else {
            setIsLoading("loading");
        }

        setBuses(buses => [...buses, bus]);
    });

    const getBuses = useCallback(() => {
        var stops = getUqStopsString();

        var today_brisbane = getBrisbaneTime();
        var date = dateToString(today_brisbane);
        var time = timeToString(today_brisbane);        
        
        // Load all of the scheduled buses at this time and for some time afterwards
        var busPromises = fetch(apiURL + "/stop_time?time=" + date + " " + time + 
                "&stop_id=" + stops).then(res => { return res.json(); });

        busPromises.then(stopTimes => {
            stopTimes.forEach(busJSON => {
                if ((props.name === "Departing" && busJSON.stop_id !== "1882") ||
                        (props.name === "Arriving" && busJSON.stop_id === "1882")) {
                    const bus = new Bus(busJSON.trip_id, busJSON.stop_id, busJSON.departure_time, stateUpdateCallback);
                    setLoadingBuses(loadingBuses => [...loadingBuses, bus]);
                }
            });
        });
    });

    return (
        <div className="BusTable">
            <h3>{props.name}</h3>
            <BusDisplayTable loading = {isLoading} buses = {buses}/>
        </div>
    );

}

export default BusDisplay;