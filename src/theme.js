import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            light: '#4dabf5',
            main: '#2196f3',
            dark: '#1769aa',
            contrastText: '#fff',
        },
        secondary: {
            light: '#f73378',
            main: '#f50057',
            dark: '#ab003c',
            contrastText: '#000',
        },
    },
});

export default theme;
