import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class BusDisplayTable extends React.Component {
  state = {
    rows : this.convertBuses(this.props.buses), 
    initialRows : this.convertBuses(this.props.buses),
    classes : this.useStyles()
  };

  useStyles() {
    return ({
            table: {
              minWidth: 500,
            },
          });
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
      initialRows: this.state.rows
    }); 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rows : this.convertBuses(this.props.buses),
      initialRows: this.state.rows
    }); 
  }

  getRows() {
    return this.state.rows.map(bus => {
      return <TableRow>
                <TableCell>{bus.no}</TableCell>
                <TableCell>{bus.route}</TableCell>
                <TableCell>{bus.stop}</TableCell>
                <TableCell>{bus.time}</TableCell>
              </TableRow>
    });
  }

  render() {
      return (
        <TableContainer component={Paper}>
          <Table className={this.state.classes.table} size="small" aria-label="simple table">
            <colgroup>
              <col style = {{width : '5%'}}/>
              <col style = {{width : '40%'}}/>
              <col style = {{width : '40%'}}/>
              <col style = {{width : '15%'}}/>
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
}

export default BusDisplayTable;