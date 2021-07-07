import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import BusDisplay from './bus/bus_display.js';
import ServiceUpdatesDisplay from './service_updates/service_updates_display.js';

import {load_delay_data, AverageDelayChart} from "./charts/delay_charts.js"

function App() {
    return (
      <div>
        <div class="title">
          <Grid container spacing={0} direction="row" alignItems="center" justify="center">
            <Grid item>
              <img align="right" src={process.env.PUBLIC_URL + '/busWhite96.png'} alt=""/>
            </Grid>
            <Grid item>
              <h1 align = "left">UQBus</h1>
            </Grid>
          </Grid>
        </div>
        <div>
          <h2 align = "Center">Average Delay</h2>
          <AverageDelayChart data={load_delay_data}></AverageDelayChart>
        </div>
        <div class="uq-lakes-tables">
            <h2 align = "center">UQ Lakes</h2>
            <div align="center">
            <Tabs defaultActiveKey="departures" id="uncontrolled-tab-example" style = {{minWidth: 345, width: "60%"}}>
              <Tab eventKey="departures" title="Departure" align="left" style={{minWidth: 345, width: "60%"}}>
                <BusDisplay name = "Departing"></BusDisplay>
              </Tab>
              <Tab eventKey="arrivals" title="Arrivals" align="left" style={{minWidth: 345, width: "60%"}}>
                <BusDisplay name = "Arriving"></BusDisplay>
              </Tab>
            </Tabs>
            </div>
          </div>
      </div>
    );
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);