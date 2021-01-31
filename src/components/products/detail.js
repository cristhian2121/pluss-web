import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.online-image-editor.com/styles/2019/images/power_girl_editor.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    // backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
  }
}));

export default function Detail({ selectDetail }) {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}>
        <img src={selectDetail.image} loading="lazy" />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography className="text-center" variant="h5">
            {selectDetail.descripcion}
          </Typography>
          <span>Código del producto. {selectDetail.cod_product}</span>
          <br />
          <div>
            <span>Color:</span> {selectDetail.colors} <br />
            <span>Material:</span> {selectDetail.material} <br />
            <span>Medidas:</span> {selectDetail.size} <br />
            <span>Marcas:</span> {selectDetail.prints} <br />
          </div>
          <Divider />
          <br />
          <div>
            {selectDetail.detail}
          </div>

          <br />
          <div>
            {selectDetail.inventory} Unidades disponibles <br />
            Valor unitario ${selectDetail.cost}
          </div>

          <form className={classes.form} noValidate>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Seleccionar producto"
            />
          </form>
        </div>
      </Grid>
    </Grid>
  );
}