import React, { useState, useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

export default BusAccordionRow;

const useStyles = makeStyles({
    root: {
        width: '100%',
        'border-left': '6px solid #E31837'
    },
});

function BusAccordionRow(props) {
    const [busData, setBusData] = useState(props.busData)
    const classes = useStyles()

    useEffect(() => {
        setBusData(props.busData)
    }, [props.busData])

    const getDelay = () => {
        return (
            <Typography variant="caption">{busData.delay}</Typography>
        )
    }

    const getTime = () => {
        return (
            <Grid container direction="column">
                <Grid item container justify="flex-end"> 
                    <Typography variant="subtitle2">{busData.time}</Typography>
                </Grid> 
                <Grid item container justify="flex-end">
                    {getDelay()}
                </Grid>
            </Grid>
        )
    }

    const getSummary = () => {
        return (
            <div style={{borderLeft : "6px solid #" + busData.colour}}>
            <AccordionSummary>
                <Grid container spacing={2} direction="row">
                    <Grid item xs={9} container>
                        <Grid item xs container spacing={2}>
                            <Grid item>
                                <Typography variant="h6">
                                    {busData.no}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="subtitle1">
                                {busData.route}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} container justify="flex-end">
                        {getTime()}
                    </Grid>
                    
                </Grid>
            </AccordionSummary>
            </div>
        )
    }

    const getDetails = () => {

        return (
            <AccordionDetails>
                <Typography>
                    Test
                </Typography>
            </AccordionDetails>
        )
    }

    return (
        <Accordion>
            {getSummary()}
            {getDetails()}
        </Accordion>
    )
}