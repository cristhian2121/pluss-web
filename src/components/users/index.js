import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

export class Create extends Component {
  state = {
    dataGroups: [],
    data: {
      group: null,
      name: null
    }
  }

  constructor(props) {
    super(props);
  }  

  componentDidMount() {
    this.getGroups()
  }

  getGroups = async () => {
    try {
      let response = await fetch('http://rickandmortyapi.com/api/character/')
      let data = await response.json();

      this.setState({
        dataGroups: data.results
      })
    } catch (error) {
      console.log('error', error)
    }    
  }

  save() {
    let name = this.state.data.name
    console.log('llego', name)
  }

  handleChange(event) {
    this.setState({
      data: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div class="sub-title">
          Nuevo usuario
        </div>
        <form>
          <TextField
            required
            id="code"
            label="Código"
            margin="normal"
            />
          <TextField
            required
            id="name"
            label="Nombre"
            margin="normal"
            value={this.state.data.name}
            />
          <TextField
            id="document"
            label="Documento"
            margin="normal"
            />
          <TextField
            required
            id="email"
            label="Correo electrónico"
            margin="normal"
            />
          <TextField
            required
            id="phone"
            label="Teléfono"
            margin="normal"
            />
          <FormControl margin="normal">
            <InputLabel id="name_type_user">Tipo usuario</InputLabel>
            <Select
              labelId="type_user"
              id="type_user"
              value={this.state.group}
              onChange={this.handleChange}
            >              
              {this.state.dataGroups.map(groups => (
                <MenuItem key={groups.id} value={groups.id}>{groups.name}</MenuItem>
              ))}              
            </Select>
          </FormControl>
        </form>

        <div class="text-center">
          <Button variant="contained" color="primary" onClick={this.save}>
            Crear Usuario
          </Button>
        </div>

      </div>
    );
  }
}
