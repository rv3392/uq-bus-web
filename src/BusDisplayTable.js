import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

class BusDisplayTable extends React.Component {
  state = {
    rows : this.convertBuses(this.props.buses), 
    initialRows : this.convertBuses(this.props.buses),
    loading : this.props.loading,
    classes : this.useStyles()
  };

  useStyles() {
    return makeStyles(theme => ({
            table: {
              minWidth: 500,
            },

            loading: {
              display: 'flex',
              '& > * + *': {
                marginTop: theme.spacing(2),
              },
              colorPrimary: "#fff"
            },
          }));
  }

  convertBuses(busProps) {
      var buses = [];

      for (var i = 0; i < busProps.length; i++) {
          var busProp = busProps[i];
          var bus = {no:busProp.routeShortName, route:busProp.routeLongName,
              stop:busProp.stopName, time:busProp.time};
          buses.push(bus);
      }

      return buses;
  }

  componentDidMount() {
    this.setState({
      rows : this.convertBuses(this.props.buses),
      initialRows: this.state.rows,
      loading : this.props.loading
    }); 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rows : this.convertBuses(this.props.buses),
      initialRows: this.state.rows,
      loading : this.props.loading
    }); 
  }

  getRows() {
    return this.state.rows.map(bus => {
      return <TableRow>
                <TableCell align = "right">{bus.no}</TableCell>
                <TableCell>{bus.route}</TableCell>
                <TableCell align = "center">{bus.stop}</TableCell>
                <TableCell>{bus.time}</TableCell>
              </TableRow>
    });
  }

  getLoadingCircle() {
    return (
      <div align = "center">
          {this.state.loading === 'loading' ? (
            <div>
              <br></br>
              <CircularProgress color="primary" style={{color:"#fff"}}/>
            </div>
          ) : (<div></div>)}
        </div>
    );
  }

  getTable() {
    return (
      <TableContainer component={Paper}>
        <Table className={this.state.classes.table} aria-label="simple table">
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
            {this.getRows()}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  render() {
      return (
        <div>
          {this.getTable()}
          {this.getLoadingCircle()}
        </div>
      );
    }
}

export default BusDisplayTable;