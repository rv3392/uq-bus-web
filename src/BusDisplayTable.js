import React from 'react';

const BusDisplayTable = ({buses}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>route_name</th>
                    <th>trip_id</th>
                    <th>stop_id</th>
                    <th>departure_time</th>
                </tr>
            </thead>
            <tbody>
                {
                    (buses.length > 0) ? buses.map((bus, index) => {
                        return (
                            <tr key = {index}>
                                <td>{bus.route_long_name}</td>
                                <td>{bus.tripId}</td>
                                <td>{bus.stopId}</td>
                                <td>{bus.departureTime}</td>
                            </tr>
                        )
                    }) : <tr><td>Loading...</td></tr> 
                }
            </tbody>
        </table>
    )
}

export default BusDisplayTable;