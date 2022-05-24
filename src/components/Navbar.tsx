import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import noStoryLogo from '../assets/noStoryLogo.svg';

import { Auth } from "aws-amplify";

const useStyles = makeStyles({
  links: {
    color: "white",
    textDecoration: "none",
    "& a": {
      color: "white",
      textDecoration: "none",
    },
    "& a:hover": {
      color: "white",
      textDecoration: "none",
    },
  },
  mobileLinks: {
    color: "#000",
    textDecoration: "none",
    "& a": {
      color: "#000",
      textDecoration: "none",
    },
    "& a:hover": {
      color: "#000",
      textDecoration: "none",
    },
  },
  navBar: {
    height: "65px",
    justifyContent: 'center'
  },
});

function Navbar(props: any) {
  const { userData, setUserData } = props;
  const classes = useStyles();
  const history = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleLogInAndOut = async () => {
    if (userData) {
      try {
        await Auth.signOut();
        setUserData(undefined);
      } catch (error) {
        console.log("error signing out: ", error);
      }
    } else {
      history("/login");
    }
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const pages = [{ text: "All Recipes", routeText: "recipes" }];

  if (userData) {
    pages.push({ text: "Create Recipe", routeText: "createRecipe" });
  }

  return (
    <AppBar
      position="static"
      className={classes.navBar}
      sx={{ backgroundColor: "#000" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <RestaurantIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <img alt="" src={noStoryLogo} height="25px" width="25px" style={{marginRight:'5px'}}/>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
            className={classes.links}
          >
            <Link to="/">No Story Recipes</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem component={Link} to={page.routeText} key={page.text} onClick={handleCloseNavMenu}>
                  <Typography
                    className={classes.mobileLinks}
                    textAlign="center"
                  >
                    {page.text}
                  </Typography>
                </MenuItem>
              ))}
              {!matches && (
              <MenuItem onClick={handleLogInAndOut}>
                <Typography
                    className={classes.mobileLinks}
                    textAlign="center"
                  >
                  {userData ? "Sign Out" : "Sign In"}
                </Typography>
              </MenuItem>
            )}
            </Menu>
          </Box>
          <RestaurantIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            className={classes.links}
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              fontWeight: 700,
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/">No Story Recipes</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.text}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.routeText}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Typography className={classes.links} textAlign="center">
                  {page.text}
                </Typography>
              </Button>
            ))}
          </Box>
          {matches && (
            <Box sx={{ flexGrow: 0 }}>
              <Typography className={classes.links} textAlign="center">
                <Button onClick={handleLogInAndOut} style={{ color: "white" }}>
                  {userData ? "Sign Out" : "Sign In"}
                </Button>
              </Typography>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
