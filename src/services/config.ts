
//TODO: Switch in a hidden values file

const recipeUrl = 'https://102ix5g555.execute-api.us-east-1.amazonaws.com/prod/'

export const config = {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_clnXaLLOb',
    APP_CLIENT_ID: '6k9lsq7b4c88sgkv3k1lrlc4lj',
    IDENTITY_POOL_ID: 'us-east-1:57a6d44f-dcdd-47ee-95e5-c864dbd53c84',
    RECIPES_PHOTO_BUCKET: 'recipes-photos-12797743054f',
    api: {
        baseUrl: recipeUrl,
        recipesUrl: `${recipeUrl}recipes`
    }
}
