import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#797978',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    button: {
      fontSize: '0.7rem',
    },
    fontSize: 12,
  },
});

export default theme;
