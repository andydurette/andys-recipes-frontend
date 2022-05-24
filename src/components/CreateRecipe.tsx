import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { S3, config } from "aws-sdk";
import { config as appConfig } from "../services/config";
import { generateRandomId } from "../utils/Utils";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface createRecipe {
  name: string;
  cuisine: string;
  ingredients: [string];
  description: string;
  photoURL: string;
  directions: string;
}

const useStyles = makeStyles({
  directions: {
    minWidth: 252,
    marginLeft: "8px",
    backgroundColor: "transparent",
    color: "#fff",
    borderRadius: "5px",
  },
});

function CreateRecipe() {
  const classes = useStyles();

  config.update({
    region: appConfig.REGION,
  });

  const [recipe, setRecipe] = useState<createRecipe>({
    name: "",
    cuisine: "",
    description: "",
    ingredients: [""],
    photoURL: "",
    directions: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");


  const uploadPublicFile = async (file: File, bucket: string) => {
    const fileName = generateRandomId() + file.name;
    const uploadResult = await new S3({ region: appConfig.REGION })
      .upload({
        Bucket: bucket,
        Key: fileName,
        Body: file,
        ACL: "public-read",
      })
      .promise();
    return uploadResult.Location;
  };

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    console.log("Form values");
    console.log(e.target);

    if (selectedImage) {
      const photoURL = await uploadPublicFile(
        selectedImage,
        appConfig.RECIPES_PHOTO_BUCKET!
      );
      recipe.photoURL = photoURL;
      console.log("recipe", recipe);
      const requestUrl = appConfig.api.recipesUrl;
      const requestOptions: RequestInit = {
        method: "POST",
        body: JSON.stringify(recipe),
      };
      const result = await fetch(requestUrl, requestOptions);
      const resultJSON = await result.json();

      return JSON.stringify(resultJSON.id);
    }
  };

  return (
    <Grid
      container
      item
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      style={{ margin: "40px auto" }}
      xs={10}
    >
      <Grid
        container
        item
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={12}
      >
        <Typography variant="h4" component="div" style={{marginBottom: '20px'}}>
          Create a Recipe
        </Typography>
        <Box
          component="form"
          onSubmit={(e:React.SyntheticEvent<EventTarget>) => handleSubmit(e)}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid
            container
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
            xs={12}
          >
            {selectedImage && (
              <Grid container item xs={12} justifyContent="center">
                <img
                  alt=""
                  src={selectedImageUrl}
                  style={{ maxHeight: "200px" }}
                />
              </Grid>
            )}
            <Grid container item xs={12}>
              <TextField
                required
                id="Name"
                label="Name"
                inputProps={{ maxLength: 30 }}
                defaultValue=""
                onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
              />
            </Grid>
            <Grid container item xs={12}>
              <TextField
                required
                id="Cuisine"
                label="Cuisine"
                inputProps={{ maxLength: 30 }}
                defaultValue=""
                onChange={(e) =>
                  setRecipe({ ...recipe, cuisine: e.target.value })
                }
              />
            </Grid>
            <Grid container item xs={12}>
              <TextField
                required
                id="ShortDescription"
                label="Short Description"
                inputProps={{ maxLength: 250 }}
                multiline={true}
                minRows={2}
                maxRows={6}
                defaultValue=""
                onChange={(e) =>
                  setRecipe({ ...recipe, description: e.target.value })
                }
              />
            </Grid>
            <Grid
              container
              item
              justifyContent="flex-start"
              alignItems="center"
              xs={12}
            >
              <Typography style={{ marginLeft: "8px" }}>
                Want to separate your ingredients into sections? Add and/or Remove additional sections as needed.
              </Typography>
              <IconButton
                color="secondary"
                aria-label="Add ingredient section"
                component="span"
                onClick={() => setRecipe((recipeDetails: createRecipe) => {
                  if(recipeDetails.ingredients.length >= 6){
                    return recipeDetails
                  }
                  let tempRecipeDetails = {...recipeDetails};
                  tempRecipeDetails.ingredients.push('');
                  console.log('gimme tempRecipeDetails', tempRecipeDetails);
                  return tempRecipeDetails;
                })}
              >
                <AddIcon
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
                />
              </IconButton>
              <IconButton
                color="secondary"
                aria-label="Remove ingredient section"
                component="span"
                onClick={() => setRecipe((recipeDetails: createRecipe) => {
                  if(recipeDetails.ingredients.length === 1){
                    return recipeDetails
                  }
                  let tempRecipeDetails = {...recipeDetails};
                  tempRecipeDetails.ingredients.pop();
                  console.log('gimme tempRecipeDetails', tempRecipeDetails);
                  return tempRecipeDetails;
                })}
              >
                <RemoveIcon
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
                />
              </IconButton>
            </Grid>
            {recipe.ingredients.map((_: string, i: number) => (
              <Grid container item xs={12} key={i}>
                <TextField
                  required
                  id={`ingredients${i}`}
                  label="Ingredients"
                  inputProps={{ maxLength: 300 }}
                  defaultValue=""
                  onChange={(e) =>
                    setRecipe((recipeDetails: createRecipe) => {
                      let tempRecipeDetails = {...recipeDetails};
                      tempRecipeDetails.ingredients[i] = e.target.value;
                      return tempRecipeDetails;
                    })
                  }
                />
              </Grid>
            ))}
            <Grid container item xs={12}>
              <Typography style={{ marginLeft: "8px" }}>
                <strong>Note:</strong> Each ingredient is recorded as a comma separated value
              </Typography>
            </Grid>
            {recipe.ingredients.length > 1 &&
              <Grid container item xs={12}>
              <Typography style={{ marginLeft: "8px" }}>
                <strong>Note:</strong> For every additional ingredients list the first comma separate value will be used as a title.
              </Typography>
            </Grid>
            }
            
            

            <Grid container item xs={12}>
              <TextField
                id="outlined-required"
                required
                className={classes.directions}
                label="Recipe Directions"
                inputProps={{ maxLength: 2000 }}
                multiline={true}
                minRows={6}
                maxRows={12}
                onChange={(e) =>
                  setRecipe({ ...recipe, directions: e.target.value })
                }
              />
            </Grid>
            <Grid container item xs={12}>
              <Typography style={{ marginLeft: "8px" }}>
                <strong>Note:</strong> Recipe direction formatting, when you are done a step add
                a ~ to signal starting of a new step not required for the last
                step.
              </Typography>
            </Grid>
            <Grid container item xs={12}>
              <input
                type="file"
                name="myImage"
                accept="image/*"
                style={{ marginLeft: "8px", marginTop: "6px" }}
                onChange={(e) => {
                  if (e.target.files instanceof FileList) {
                    setSelectedImage(e.target.files[0]);
                    setSelectedImageUrl(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </Grid>
            <Grid container item xs={12}>
              <Button
                type="submit"
                variant="contained"
                style={{ marginLeft: "8px", marginTop: "14px" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CreateRecipe;
