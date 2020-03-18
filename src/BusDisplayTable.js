import React from 'react';
import ReactDataGrid from 'react-data-grid';

const columns = [
    {key: "no", name : "No.", sortable : true},
    {key: "route", name : "Route"},
    {key: "stop", name : "Stop", sortable : true},
    {key: "time", name : "Time", sortable : true}
];

class BusDisplayTable extends React.Component {
    state = {
      rows : this.convertBuses(this.props.buses), 
      initialRows : this.convertBuses(this.props.buses)
    };

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

    setRows(inRows) {
      this.setState({
        rows : inRows,
        initialRows: this.state.rows
      }); 
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
          var rows = state.rows.slice();
          for (let i = fromRow; i <= toRow; i++) {
            rows[i] = { ...rows[i], ...updated };
          }
          return { rows };
        });
    };

    sortRows = (initialRows, sortColumn, sortDirection) => {
      const comparer = (a, b) => {
        if (sortDirection === "ASC") {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else if (sortDirection === "DESC") {
          return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
      };
      return sortDirection === "NONE" ? initialRows : [...this.state.rows].sort(comparer);
    };

    render() {
        return (
          <ReactDataGrid
            columns={columns}
            rowGetter={i => this.state.rows[i]}
            rowsCount={this.state.rows.length}
            onGridRowsUpdated={this.onGridRowsUpdated}
            onGridSort=
              {(sortColumn, sortDirection) =>
                this.setRows(
                  this.sortRows(this.state.initialRows, sortColumn, sortDirection)
                )
              }
            enableCellSelect={true}
          />
        );
      }
}

export default BusDisplayTable;