import { useState, useEffect, useCallback, Fragment } from "react";
import { config as appConfig } from "../services/config";
import { useParams } from "react-router-dom";
import { Divider, Grid, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  imgStyles: {
    borderRadius: "5px",
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    marginBottom: "20px",
  },
  divider: {
    width: "100%",
    display:'block',
    paddingBottom: '10px',
  },
  secondaryDivider: {
    width: "75%",
    display:'block',
    paddingTop: '10px',
  },
});

interface ReceivedRecipe {
  name: string;
  cuisine: string;
  ingredients: [string];
  recipeId: string;
  description: string;
  photoURL: string;
  directions: string;
}

const Recipe:React.FC = () => {
  const { recipeId } = useParams();
  const classes = useStyles();
  const [componentMounted, setComponentMounted] = useState(false);
  const [recipe, setRecipe] = useState<ReceivedRecipe>();

  const getRecipes = useCallback(async () => {
    console.log('recipes')
    console.log(appConfig.api.recipesUrl)
    const requestUrl = `${appConfig.api.recipesUrl}?recipeId=${recipeId}`;
    const requestResult = await fetch(requestUrl, {
      method: "GET",
    });
    const responseJSON = await requestResult.json();
    setRecipe({
      name: responseJSON[0].name,
      cuisine: responseJSON[0].cuisine,
      ingredients: responseJSON[0].ingredients,
      recipeId: responseJSON[0].recipeId,
      description: responseJSON[0].description,
      photoURL: responseJSON[0].photoURL,
      directions: responseJSON[0].directions,
    });
  }, [recipeId]);

  useEffect(() => {
    if (!componentMounted) {
      getRecipes();
      setComponentMounted(true);
    }
  }, [componentMounted, getRecipes, setComponentMounted]);

  return (
    <>
    {!recipe &&
    <Grid
      container
      item
      direction="row"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      style={{ margin: "0 auto", maxWidth: "1200px"}}
      xs={10}
    >
       <CircularProgress color="secondary" />
    </Grid>
    }
    {recipe && (
    <Grid
      container
      item
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      alignContent="flex-start"
      style={{ margin: "40px auto", maxWidth: "1200px"}}
      xs={10}
    >
        <>
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            xs={12}
            style={{ marginTop: "5px" }}
          >
            <h1>{recipe.name}</h1>
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            xs={12}
            md={12}
            style={{ marginTop: "45px" }}
          >
            <img
              className={classes.imgStyles}
              alt={recipe.name}
              src={recipe.photoURL}
            />
          </Grid>

          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            xs={12}
            md={4}
            style={{ marginTop: "75px", paddingRight: '10px' }}
          >
            <FormGroup>
              <Divider className={classes.divider}>
                <Typography variant="h6">Ingredients</Typography>
              </Divider>
            
              {recipe.ingredients.map((ingredientList, i) => {
                  return (<Fragment key={i}>
                    <Divider className={classes.secondaryDivider} textAlign="left">
                      <Typography variant="h6">{recipe.ingredients[i].split(",")[0]}</Typography>
                    </Divider>
                    <FormGroup>
                      <Grid
                        container
                        item
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        xs={12}
                      >
                        {recipe.ingredients[i].split(",").map((ingredient: string, i) => {
                          if(i === 0){
                            // eslint-disable-next-line array-callback-return
                            return
                          }
                          return (
                            <FormControlLabel 
                              key={`ingredient-${ingredient}`}
                              control={<Checkbox color="secondary" />}
                              label={ingredient}
                            />
                          );
                        })}
                      </Grid>              
                    </FormGroup>
                  </Fragment>)
                })
              }
              
            </FormGroup>
          </Grid>
          
          <Grid container
            item
            justifyContent="center"
            alignItems="center" 
            xs={12}
            md={8}
            style={{ marginTop: "75px", paddingLeft: '10px' }}>
          <Divider className={classes.divider}>
            <Typography variant="h6">Directions</Typography>
          </Divider>
            {recipe.directions.split("~").map((direction: string, i) => {
              return (
                <Grid container item xs={12} key={`direction-${i}`} style={{marginTop:'11px', marginBottom:'15px'}}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Step {i + 1}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>{direction}</Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </>
    </Grid>
    )}
    </>
  );
}

export default Recipe;
