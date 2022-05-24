
//TODO: Switch in a hidden values file

const recipeUrl = process.env.REACT_APP_RECIPE_URL;
const region = process.env.REACT_APP_REGION;
const userPoolId = process.env.REACT_APP_USER_POOL_ID;
const appClientId = process.env.REACT_APP_APP_CLIENT_ID;
const identityPoolId = process.env.REACT_APP_IDENTITY_POOL_ID;
const recipePhotoBucket = process.env.REACT_APP_RECIPES_PHOTO_BUCKET;

export const config = {
    REGION: region,
    USER_POOL_ID: userPoolId,
    APP_CLIENT_ID: appClientId,
    IDENTITY_POOL_ID: identityPoolId,
    RECIPES_PHOTO_BUCKET: recipePhotoBucket,
    api: {
        baseUrl: recipeUrl,
        recipesUrl: `${recipeUrl}recipes`
    }
}
