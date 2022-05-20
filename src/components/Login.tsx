import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//Login functions
import Amplify from "aws-amplify";
import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import { config } from "../services/config";
import * as AWS from "aws-sdk";
import { Credentials } from "aws-sdk/lib/credentials";

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    userPoolWebClientId: config.APP_CLIENT_ID,
    identityPoolId: config.IDENTITY_POOL_ID,
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

function Login(props: any) {
  const { setUserData } = props;

  // Login Setup
  async function signIn(username: string, password: string) {
    try {
      const user: any = (await Auth.signIn(username, password)) as CognitoUser;
      setUserData(user);
      try {
        await getAWSTemporaryCreds(user);
        console.log()
      } catch (error) {
        console.log("error signing in", error);
      }
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  async function getAWSTemporaryCreds(user: CognitoUser) {
    const cognitoIdentityPool = `cognito-idp.${config.REGION}.amazonaws.com/${config.USER_POOL_ID}`;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials(
      {
        IdentityPoolId: config.IDENTITY_POOL_ID,
        Logins: {
          [cognitoIdentityPool]: user
            .getSignInUserSession()!
            .getIdToken()
            .getJwtToken(),
        },
      },
      {
        region: config.REGION,
      }
    );
    console.log('this fired');
    await refreshCredentials();
  }

  async function refreshCredentials(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('this fired2');
      (AWS.config.credentials as Credentials).refresh((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('this fired3');
          resolve();
        }
      });
    });
  }

  // Login Setup

  const handleSubmit = (e:React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    signIn(username, password);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  return (
    <Grid
      container
      item
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      style={{ margin: "0 auto" }}
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
        <Typography variant="h4" component="div">
          Log In
        </Typography>
        <Box
          component="form"
          onSubmit={(e:React.SyntheticEvent<EventTarget>) => handleSubmit(e)}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "30ch" },
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
            <Grid container item xs={12}>
              <TextField
                required
                id="username"
                label="Username"
                defaultValue=""
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid container item xs={12}>
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                defaultValue=""
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
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

export default Login;
