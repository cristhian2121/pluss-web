import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import conf from '../../config'

export class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataGroups: [],
    }
    this.data = {
      code: null,
      first_name: null,
      user: '',
      type_identification: 'CC',
      identification_number: null,
      username: null,
      phone_number: null,
      groups: [],
      password: null
    }
  }
  componentDidMount() {
    this.getGroups()
  }
  getGroups = async () => {
    try {
      let response = await fetch(`${conf.api_url}/group/`)
      let data = await response.json();
      console.log('llego grupos', data)

      this.setState({
        dataGroups: data
      })
    } catch (error) {
      console.log('error', error)
    }    
  }
  handleChange = e => {
    switch (e.target.name){
      case "code":
        this.data.code = e.target.value
        break
      case "name":
        this.data.first_name = e.target.value
        break
      case "document":
        this.data.identification_number = e.target.value
        this.data.password = e.target.value
        break
      case "email":
        this.data.username = e.target.value
        break
      case "phone":
        this.data.phone_number = e.target.value
        break
      case "group":
        this.data.groups = e.target.value
        break      
    }
    console.log('llego', this.data.name)
  };  
  save = () => {
    fetch(`${conf.api_url}/profile/`, {
      method: 'POST',
      body: JSON.stringify(this.data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      console.log('response', response)
      this.clear()
    })
    .catch(function(err) {
        console.log(err);
    });

  };
  clear = () => {
    this.data.code = null
    this.data.first_name = null
    this.data.user = ''
    this.data.type_identification = 'CC'
    this.data.identification_number = null
    this.data.username = null
    this.data.phone_number = null
    this.data.groups = []
    this.data.password = null
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
            // value={this.data.code}
            />
          <TextField
            required
            onChange={this.handleChange}
            name="name"
            label="Nombre"
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
