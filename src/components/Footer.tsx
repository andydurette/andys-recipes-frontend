import { Grid, Typography } from "@mui/material";

// Sets year in footer copyright
let year = new Date().getFullYear();

function Footer() {
  return (
    <Grid
      container
      item
      xs={12}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ backgroundColor: "#000", height: "50px" }}
    >
      <Typography style={{ color: "white" }}>
        Copyright © Andy Durette {year}
      </Typography>
    </Grid>
  );
}

export default Footer;
