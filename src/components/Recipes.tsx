//TODO: Come back and make typescript
import { Grid } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { config as appConfig } from "../services/config";
import CreateRecipesCard from "./RecipesCard";
import { makeStyles } from "@mui/styles";
import CircularProgress from '@mui/material/CircularProgress';
//Models
import { RecipeI } from "../model";

const useStyles = makeStyles({
  gridSpacing: {
    boxSizing: "border-box",
    padding: "10px",
  },
});

interface Props {
  recipes: RecipeI[] | null;
  setRecipes: React.Dispatch<React.SetStateAction<RecipeI[] | null>>;
};

const Recipes:React.FC<Props> = ({recipes, setRecipes}) => {

  const classes = useStyles();
  const [componentMounted, setComponentMounted] = useState(false);

  const getRecipes = useCallback(async () => {
    const requestUrl = appConfig.api.recipesUrl;
    const requestResult = await fetch(requestUrl, {
      method: "GET",
    });
    const responseJSON = await requestResult.json();
    setRecipes(responseJSON);
  }, [setRecipes]);

  useEffect(() => {
    if (!componentMounted && !recipes) {
      getRecipes();
      setComponentMounted(true);
    }
  }, [componentMounted, getRecipes, recipes, setComponentMounted]);

  return (
    <Grid
      container
      item
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ margin: "0 auto", maxWidth: "1200px" }}
      xs={10}
    >
      {!recipes && <CircularProgress color="secondary" />}
      {recipes && (
        <Grid
          container
          item
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          style={{ margin: "40px auto" }}
          xs={12}
        >
          {recipes!.map(
            (recipe:any) => {
              return (
                <Grid
                  container
                  item
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="stretch"
                  xs={12}
                  sm={6}
                  lg={4}
                  className={classes.gridSpacing}
                  key={recipe.recipeId}
                >
                  <CreateRecipesCard
                    name={recipe.name}
                    cuisine={recipe.cuisine}
                    ingredients={recipe.ingredients}
                    recipeId={recipe.recipeId}
                    photoURL={recipe.photoURL}
                    description={recipe.description}
                  />
                </Grid>
              );
            }
          )}
        </Grid>
      )}
    </Grid>
  );
}

export default Recipes;
