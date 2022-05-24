import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Footer from "./components/Footer";

// Components
import Home from "./components/Home";
import About from "./components/About";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe";
import NavBar from "./components/Navbar";
import CreateRecipe from "./components/CreateRecipe";
import Login from "./components/Login";

// Theme
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
// import { purple } from '@mui/material/colors';

import { Auth } from 'aws-amplify';

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

function App() {
  const [userData, setUserData] = useState<any | null>(null);

  const checkForUser = async () => {
    try {
      let data = await Auth.currentAuthenticatedUser();
      setUserData(data);
    } catch(err) {
      console.log(err);
    }
    
  }

  useEffect(() => {
    // Amplify when signed in creates a value in local storage. This acts
    // as a good candidate to check for persistance if the page is reloaded
    if (localStorage.getItem("amplify-signin-with-hostedUI")) {
    checkForUser();
    }
  }, []);

  return (
    <div className="App">
      <NavBar userData={userData} setUserData={setUserData} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid
          container
          item
          xs={12}
          style={{
            minHeight: "calc(100vh - 116px)",
            height: "100%",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipe/:recipeId" element={<Recipe />} />
            {/* Simple security of route */}
            <Route
              path="/createRecipe"
              element={
                userData ? (
                  <CreateRecipe />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !userData ? (
                  <Login setUserData={setUserData} />
                ) : (
                  <Navigate replace to="/recipes" />
                )
              }
            />
          </Routes>
        </Grid>
      </ThemeProvider>
      <Footer />
    </div>
  );
}

export default App;
