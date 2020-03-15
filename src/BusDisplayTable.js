import React from 'react';

const BusDisplayTable = ({buses}) => {
    return (
        <table>
            <thead>
                <tr>
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
                                <td>{bus.trip_id}</td>
                                <td>{bus.stop_id}</td>
                                <td>{bus.departure_time}</td>
                            </tr>
                        )
                    }) : <tr><td>Loading...</td></tr> 
                }
            </tbody>
        </table>
    )
}

export default BusDisplayTable;