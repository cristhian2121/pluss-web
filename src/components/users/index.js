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
  }
  data = {
    code: null,
    name: null,
    document: null,
    email: null,
    phone: null,
    group: null
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
  handleChange = e => {
    console.log('este es el nombre', e.target.name);
    switch (e.target.name){
      case "code":
        this.data.code = e.target.value
      case "name":
        this.data.name = e.target.value
      case "document":
        this.data.document = e.target.value
      case "email":
        this.data.email = e.target.value
      case "phone":
        this.data.phone = e.target.value
      case "group":
        this.data.group = e.target.value
    }
    console.log('llego', this.data.name)
  };  
  save = () => {
    console.log('llego al save', this.data)
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
            onChange={this.handleChange}
            name="code"
            label="Código"
            margin="normal"
            />
          <TextField
            required
            onChange={this.handleChange}
            name="name"
            label="Nombre"
            value={this.data.name}
            margin="normal"
            />
          <TextField
            onChange={this.handleChange}
            name="document"
            label="Documento"
            margin="normal"
            />
          <TextField
            required
            onChange={this.handleChange}
            name="email"
            label="Correo electrónico"
            margin="normal"
            />
          <TextField
            required
            onChange={this.handleChange}
            name="phone"
            label="Teléfono"
            margin="normal"
            />
          <FormControl margin="normal">
            <InputLabel id="group">Tipo usuario</InputLabel>
            <Select
              labelId="group"
              name="group"
              onChange={this.handleChange}
              // onInput={this.handleChange}
            >              
              {this.state.dataGroups.map(groups => (
                <MenuItem value={groups.id}>{groups.name}</MenuItem>
              ))}              
            </Select> 
          </FormControl>
          <br/><br/>
          <div class="text-center">
            <Button color="primary" onClick={this.save}>
              Crear Usuario
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
