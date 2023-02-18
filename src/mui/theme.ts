import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ff3c00',
    },
    secondary: {
      main: '#0079d3',
    },
  },
  typography: {
    fontFamily: ['"Open Sans Regular"', 'sans-serif'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: #eeeeee;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            height: '33px',
            mx: '7px',
            px: {
              sm: '5px',
              md: '15px',
            },
            borderRadius: '60px',
          }),
      },
    },
  },
});
