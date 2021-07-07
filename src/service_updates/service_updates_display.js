import React, { useState, useEffect, useCallback } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useStyles } from '../table_utils.js';
import { LoadingCircle } from '../loading_circle.js';

const apiURL = "https://uq-bus-backend-api.herokuapp.com/"
const uqLakesServices = ["28", "29", "66", "129", "139", "169", "192", "209"]

async function getServiceUpdatesForService(service) {
    let jsonUpdates = await fetch(apiURL + "/service_updates/affected_service/" + service)
    return await jsonUpdates.json();
}

function serviceUpdateSorter(a, b) {
    if ((a.severity === "Informative" && (b.severity === "Minor" || b.severity === "Major")) 
            || (a.severity === "Minor" && b.severity === "Major")) {
        return 1;
    } else if ((a.severity === "Informative" && b.severity === "Informative")
            || (a.severity === "Minor" && b.severity === "Minor")
            || (a.severity === "Major" && b.severity === "Major")) {
        return 0;
    } else {
        return -1;
    }
}

function ServiceUpdatesDisplayTable(props) {
    const [rows, setRows] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        setRows(props.updates);
    }, [props.updates]);

    const getHeader = () => {
        return (
            <TableRow>
              <TableCell align="left">Severity</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
        );
    };

    const getBodyRow = (update) => {
        return (
            <TableRow>
                <TableCell align = "left">{update.severity}</TableCell>
                <TableCell>{update.title}</TableCell>
                <TableCell align = "center">{update.dates}</TableCell>
            </TableRow>
        );
    }

    const getBodyRows = useCallback(() => {
        const sortedRows = rows.sort(serviceUpdateSorter);
        return sortedRows.map(update => {return getBodyRow(update);});
    }, [rows]);

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <colgroup>
            <col style = {{width : '15%'}}/>
            <col style = {{width : '60%'}}/>
            <col style = {{width : '25%'}}/>
          </colgroup>
          <TableHead>
            {getHeader()}
          </TableHead>
          <TableBody>
            {getBodyRows()}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

function ServiceUpdatesDisplay() {
    const [updates, setUpdates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getServiceUpdates = async () => {
        var parsedUpdateIds = new Set();
        var numFinishedLoading = 0;

        // Initiate fetch calls for each service and handle the updates received
        uqLakesServices.forEach(service => {
            getServiceUpdatesForService(service)
                .then(updatesJson => {
                    updatesJson.forEach(updateJson => {
                        if (!parsedUpdateIds.has(updateJson.id)) {
                            parsedUpdateIds.add(updateJson.id);
                            setUpdates(updates => [...updates, updateJson]);
                            console.log(updateJson);
                        }
                    });

                    // This works but surely there's a better way
                    numFinishedLoading++;
                    if (numFinishedLoading == uqLakesServices.length) {
                        setIsLoading(false);
                    }
                });
        });
    }

    useEffect(() => {
        getServiceUpdates();
    }, []);

    return (
        <div>
            <ServiceUpdatesDisplayTable updates={updates}></ServiceUpdatesDisplayTable>
            <LoadingCircle isLoading={isLoading}></LoadingCircle>
        </div>
    );
}

export default ServiceUpdatesDisplay;