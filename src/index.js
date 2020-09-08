import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import './index.css';

import BusDisplay from './bus_display.js';

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
      <div class="uq-lakes-tables">
          <h2 align = "center">UQ Lakes</h2>
          <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Grid item style = {{minWidth: 345, width: "60%"}}>
              <BusDisplay name = "Departing"></BusDisplay>
            </Grid>
            <Grid item style = {{minWidth: 345, width: "60%"}}>
              <BusDisplay name = "Arriving"></BusDisplay>
            </Grid>
          </Grid>
        </div>
      </div>
    );
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);