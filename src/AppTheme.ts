import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#2d2d37",
        paper: "#212226",
      },
      text: {
        primary: "#ffffff",
      },
      primary: {
        main: "#000",
      },
      secondary: {
        main: "#fff",
      },
    },
    typography: {
      allVariants: {
        color: "white",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: "#000",
            color: "#000",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontWeight: "bold",
            "&.Mui-focused": {
              color: "white",
            },
          },
        },
      },
    },
  });

export default theme