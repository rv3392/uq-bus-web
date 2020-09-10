import React, { useState, useEffect, useCallback } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from '../table_utils.js'

function convertBuses(busProps) {
  var buses = [];

  for (var i = 0; i < busProps.length; i++) {
      var busProp = busProps[i];
      var bus = {no:busProp.routeShortName, route:busProp.routeLongName,
          stop:busProp.stopName, time:busProp.time};
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
      return <TableRow>
                <TableCell align = "right">{bus.no}</TableCell>
                <TableCell>{bus.route}</TableCell>
                <TableCell align = "center">{bus.stop}</TableCell>
                <TableCell>{bus.time}</TableCell>
              </TableRow>
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

  const getTable = useCallback(() => {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <colgroup>
            <col style = {{width : '2%'}}/>
            <col style = {{width : '83%'}}/>
            <col style = {{width : '5%'}}/>
            <col style = {{width : '10%'}}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Route</TableCell>
              <TableCell align="left">Stop</TableCell>
              <TableCell align="left">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getRows()}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }, [classes]);

  return (
    <div>
      {getTable()}
      {getLoadingCircle()}
    </div>
  );
}

export default BusDisplayTable;