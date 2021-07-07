import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'

import BusAccordionRow from './bus_table_accordion_row.js';

const useStyles = makeStyles({
  root: {
      width: '100%',
  },
});

function convertBuses(busProps) {
  var buses = [];

  for (var i = 0; i < busProps.length; i++) {
      var busProp = busProps[i];
      var bus = {no:busProp.routeShortName, route:busProp.routeLongName,
          stop:busProp.stopName, time:busProp.time, delay:busProp.delay, 
          colour:busProp.routeColour};
      buses.push(bus);
  }

  return buses;
}

function BusDisplayTable(props) {
  const [rows, setRows] = useState(convertBuses(props.buses));
  const [initialRows, setInitialRows] = useState(convertBuses(props.buses));
  const [loading, setLoading] = useState(props.loading);
  const classes = useStyles();

  useEffect(() => {
    setRows(convertBuses(props.buses));
    setInitialRows(rows);
    setLoading(props.loading);
  }, [props.buses, props.loading])

  const busRowSorter = (a, b) => {
    var compareHours = parseInt(a.time.split(":")[0]) - parseInt(b.time.split(":")[0])
    var compareMinutes = parseInt(a.time.split(":")[1]) - parseInt(b.time.split(":")[1])

    if (compareHours > 0) {
      return 1
    } else if (compareHours < 0) {
      return -1
    } else {
      if (compareMinutes > 0) {
        return 1
      } else if (compareMinutes < 0) {
        return -1
      } else {
        return 0
      }
    }
  }

  const getRows = useCallback(() => {
    var busList = rows.sort(busRowSorter)
    var busMap = busList.map(bus => {
      return <BusAccordionRow busData={bus} ></BusAccordionRow>
    })
    console.log(busMap)
    return busMap
  }, [rows]);

  const getLoadingCircle = useCallback(() => {
    return (
      <div align = "center">
          {loading === 'loading' ? (
            <div>
              <br></br>
              <CircularProgress color="primary" style={{color:"#fff"}}/>
            </div>
          ) : (<div></div>)}
        </div>
    );
  });

  return (
    <div>
      <div>
        {getRows()}
      </div>
      <div>
          {getLoadingCircle()}
      </div>
    </div>
  );
}

export default BusDisplayTable;