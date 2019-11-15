import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


export class Create extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div>
        <div class="sub-title">
          Nuevo usuario
        </div>
        <form>
          <TextField
            id="name"
            label="Nombres"
            margin="normal"
            />
          <TextField
            id="last_name"
            // className={classes.textField}
            label="Apellidos"
            // mx={2}
            margin="normal"
            />
          <TextField
            id="document"
            // className={classes.textField}
            label="Documento"
            margin="normal"
            />
          <TextField
            required
            id="user"
            // className={classes.textField}
            label="Usuario"
            margin="normal"
            />
          <FormControl margin="normal">
            <InputLabel id="name_type_user">Tipo usuario</InputLabel>
            <Select
              labelId="type_user"
              id="type_user"
              
              // value={age}
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </form>
      </div>
    );
  }
}
