import React from 'react';

const BusDisplayTable = ({buses}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Route</th>
                    <th>Stop</th>
                    <th>Time</th>
                    <th>debug_stop_id</th>
                    <th>debug_trip_id</th>
                </tr>
            </thead>
            <tbody>
                {
                    (buses.length > 0) ? buses.map((bus, index) => {
                        return (
                            <tr key = {index}>
                                <td>{bus.routeShortName}</td>
                                <td>{bus.routeLongName}</td>
                                <td>{bus.stopName}</td>
                                <td>{bus.time}</td>
                                <td>{bus.stopId}</td>
                                <td>{bus.tripId}</td>
                            </tr>
                        )
                    }) : <tr><td>Loading...</td></tr> 
                }
            </tbody>
        </table>
    )
}

export default BusDisplayTable;