import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  links: {
    color:'#FFF',
    textDecoration: 'none',
    "& a": {
      color:'#FFF',
      textDecoration: 'none',
    },
    "& a:hover": {
      color:'#FFF',
      textDecoration: 'none',
    }
  },
  card:{
    position: 'relative',
    paddingBottom: '45px',
    minWidth: '100%'
  },
  alignCardActionBottom: {
    position: 'absolute',
    bottom: '5px'
  }
});

interface Props {
  name: string, 
  cuisine: string,
  ingredients: string,
  recipeId: string,
  description: string,
  photoURL: string,
}

const RecipesCard: React.FC<Props> = ({ name, cuisine, ingredients, recipeId, description, photoURL }) => {

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        height="140"
        image={photoURL}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Cuisine: {cuisine}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.alignCardActionBottom}>
        {/* <Button size="small">Share</Button> */}
        <Button component={Link} to={`/recipe/${recipeId}`} size="small" className={classes.links} variant="contained">
          View Recipe
        </Button>
      </CardActions>
    </Card>
  );
}

export default RecipesCard;