import { makeStyles } from '@material-ui/core/styles';

export function useStyles() {
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