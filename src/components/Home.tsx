import {useState, useEffect} from 'react';
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import noStoryLogo from '../assets/noStoryLogo.svg';
import cakePops from '../assets/cake_pops.jpg';
import eggsBenedict from '../assets/eggs_benedict.jpg';
import generalTso from '../assets/general_tso.jpg';

function Home() {

  const slideShowArray = [cakePops, eggsBenedict, generalTso];
  const [displayPosition, setDisplayPosition] = useState<number>(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayPosition((displayPositionState:number) => {
        if(displayPositionState < slideShowArray.length - 1){
          return displayPositionState + 1
        }else {
          return 0
        }
      })
    }, 3000);
    return () => clearInterval(interval);
  }, [slideShowArray.length]);

  const useStyles = makeStyles({
    links: {
      color:'white',
      textDecoration: 'none',
      "& a": {
        color:'white',
        textDecoration: 'none',
      },
      "& a:hover": {
        color:'white',
        textDecoration: 'none',
      }
    },
    backgroundImage:{
      backgroundImage: `linear-gradient(0deg, rgba(45, 45, 55, 0.95), rgba(45, 45, 55, 0.95)), url(${slideShowArray[displayPosition]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  });
  const classes = useStyles();

  return (
    <Grid
      container
      item
      direction="column"
      justifyContent="center"
      alignItems="center"
      xs={12}
      className={classes.backgroundImage}
    >
      <Grid
        container
        item
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ paddingLeft: '20px', paddingRight: '20px'}}
        xs={10}
      >
        {matches &&
        <>
          <Typography variant="h1" fontWeight="600" textAlign={'center'} style={{display:'block', alignItems: 'center'}}>
          <img alt="" src={noStoryLogo} height="80px" width="80px" style={{marginRight:'15px', marginBottom: '-5px'}}/>No Story Recipes
          </Typography>
          <Typography variant="h4" textAlign={'center'}>
          No biographies, no family history lessons, just recipes
          </Typography>
        </>
        }
        {!matches &&
        <>
          <Typography variant="h1" fontWeight="600" fontSize={'48px'} textAlign={'center'}>
          <img alt="" src={noStoryLogo} height="38px" width="38px" style={{marginRight:'5px'}}/>No Story Recipes
          </Typography>
          <Typography variant="h4" fontSize={'24px'} textAlign={'center'} style={{display:'flex', alignItems: 'center'}}>
          No biographies, no family history lessons, just recipes
          </Typography>
        </>
        }
        
        
        <Button component={Link} to='recipes' style={{ marginTop: "20px" }} variant="contained" className={classes.links}>
          View Recipes
        </Button>
      </Grid>
      
    </Grid>
  );
}

export default Home;
