import React, { useEffect, useState, useCallback } from "react";
import { LineChart, Line } from "recharts";

export function AverageDelayChart(props) {
    const [data, setData] = useState(props.data)

    const useEffect = useCallback(() => {
        setData(props.data)
    }, [props.data])

    return (
        <div></div>
    );
}

export async function load_delay_data(stop_id) {

}