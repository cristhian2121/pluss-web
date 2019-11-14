import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';

export class Create extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div>
        <h3>Usuarios</h3>
        <TextField
          id="standard-basic"
          // className={classes.textField}
          label="Nombres"
          margin="normal"
        />
        <TextField
          id="standard-basic"
          // className={classes.textField}
          label="Apellidos"
          margin="normal"
        />
        <TextField
          id="standard-basic"
          // className={classes.textField}
          label="Documento"
          margin="normal"
        />
        <TextField
          required
          id="standard-basic"
          // className={classes.textField}
          label="Usuario"
          margin="normal"
        />
        <TextField
          required
          id="standard-basic"
          // className={classes.textField}
          label="Tipo usuario"
          margin="normal"
        />
      </div>
    );
  }
}
