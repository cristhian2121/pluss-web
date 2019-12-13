import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import conf from '../../config';
import Copyright from '../../components/common/copyright'
import {Redirect} from 'react-router-dom' 
import Logo from '../../static/logo_pop_litle.png'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  return (
    <SnackbarProvider maxSnack={3}>
      <IntegrationNotistack />
    </SnackbarProvider>
  );
}

function IntegrationNotistack() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [ loginRoot, setLoginRoot ] = useState(false)

  const login = () => {
    let data = generateData()
    fetch(`${conf.api_url}/login/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(async function(response) {
      let resp = await response.json()
      if (resp['username']) { enqueueSnackbar(resp['username'], {variant: 'error'}) }
      if (resp['password']) { enqueueSnackbar(resp['password'], {variant: 'error'}) }
      if (response.status == 401) { enqueueSnackbar(resp['detail'], {variant: 'error'}) }
      if (response.status == 200) { setLoginRoot(true) }
    })
    .catch(function(error) {
      enqueueSnackbar('Se generó un error en la autenticación.', {variant: 'error'});
    });
  }

  const generateData = () => {
    let elements = document.getElementById('loginForm').elements;
    let data = {};
    for (let item of elements) {
      data[item.name] = item.value;
    }
    return data
  }

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
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
          >
            Ingresar
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {loginRoot ?  <Redirect to='/cotizaciones/crear'/> : ''}
    </Container>
  );
}