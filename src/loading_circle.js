import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function VisibleLoadingCircle() {
    return (
        <div align="center">
            <br></br>
            <CircularProgress color="primary" style={{color:"#fff"}}/>
        </div>
    );
}

function HiddenLoadingCircle() {
    return (<div align="center"></div>);
}

export function LoadingCircle(props) {
    const [display, setDisplay] = useState(true);

    useEffect(() => {
        setDisplay(props.isLoading);
    }, [props.isLoading])

    return display ? (<VisibleLoadingCircle></VisibleLoadingCircle>) : (<HiddenLoadingCircle></HiddenLoadingCircle>);
}