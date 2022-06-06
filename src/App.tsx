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
// import theme from "./AppTheme";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Material Ui
import { Grid } from "@mui/material";
import { Auth } from 'aws-amplify';

//Models
import { RecipeInterface } from "./model";


const App: React.FC = () => {
  
  const [userData, setUserData] = useState<any>(null);
  const [recipes, setRecipes] = useState<RecipeInterface[] | null>(null);

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
            <Route path="/recipes" 
              element={
                <Recipes
                  recipes={recipes} 
                  setRecipes={setRecipes} 
                />
              } 
            />
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
