import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { SnackbarProvider, useSnackbar } from "notistack";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import conf from "../../config";
import Copyright from "../../components/common/copyright";
import { Redirect } from "react-router-dom";
import Logo from "../../static/Logo.png";

const useStyles = makeStyles((theme) => {
  const getPropertiesRoot = () => {
    const $root = document.querySelector(":root");
    const color = getComputedStyle($root).getPropertyValue("--primary-color");
    const textColor = getComputedStyle($root).getPropertyValue(
      "--bg-color-ligth"
    );
    return {
      backGroundColor: color,
      textColor: textColor,
    };
  };

  const { backGroundColor, textColor } = getPropertiesRoot();

  return {
    paper: {
      padding: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(2, 0),
      padding: theme.spacing(2, 1),
      background: backGroundColor,
      color: textColor,
      fontSize: '1rem'
    },
  };
});

export default function Login() {
  setTimeout(() => {
    // const $navBar = document.querySelector('#nav-var-pluss')
    // $navBar.style.visibility = 'collapse'
  }, 100);

  return (
    <SnackbarProvider maxSnack={3}>
      <IntegrationNotistack />
    </SnackbarProvider>
  );
}

function IntegrationNotistack() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loginRoot, setLoginRoot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = (event) => {
    event.preventDefault();
    let data = generateData();
    fetch(`${conf.api_url}/login/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async function (response) {
        let resp = await response.json();
        if (resp["username"]) {
          enqueueSnackbar(resp["username"], { variant: "error" });
        }
        if (resp["password"]) {
          enqueueSnackbar(resp["password"], { variant: "error" });
        }
        if (response.status == 401) {
          enqueueSnackbar(resp["detail"], { variant: "error" });
        }
        if (response.status == 200) {
          setPermissions(resp);
        }
      })
      .catch(function (error) {
        console.log("error: ", error);
        enqueueSnackbar("Se generó un error en la autenticación.", {
          variant: "error",
        });
      });
  };

  const generateData = () => {
    const elements = document.getElementById("loginForm").elements;
    let data = {};
    data.username = elements.username.value.trim();
    data.password = elements.password.value.trim();
    return data;
  };

  const setPermissions = (user) => {
    localStorage.name = user.name;
    localStorage.ldap = user.permission;
    setLoginRoot(true);
  };

  useEffect(() => {
    // if($root) $root.style
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          <img src={Logo} className="image-logo-pdf" />
        </Typography>
        <Typography component="h1" variant="h5">
          Ingresa tus credenciales
        </Typography>
        <form id="loginForm" className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Correo electrónico"
            name="username"
            autoComplete="username"
            autoFocus
            onKeyPress={(event) => {
              event.key === "Enter" && login(event);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Visibility className="icon-size" />
                    ) : (
                      <VisibilityOff className="icon-size" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && login(event);
            }}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={login}
          >
            Ingresar
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {loginRoot ? <Redirect to="/cotizaciones" /> : ""}
    </Container>
  );
}
