import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';

import conf from '../../config'

export class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataGroups: [],
      passDiff: false,
      activeDialog: false,
      messageAlert: ''
    }
    this.data = {
      code: null,
      first_name: null,
      user: '',
      type_identification: 'CC',
      identification_number: null,
      email: null,
      username: null,
      phone_number: null,
      groups: [],
      password: null
    }
    this.passwordConfirm = null
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
        break
      case "email":
        this.data.username = e.target.value
        this.data.email = e.target.value
        break
      case "phone":
        this.data.phone_number = e.target.value
        break
      case "group":
        this.data.groups = e.target.value
        break
      case "password1":
        this.passwordConfirm = e.target.value
        break
      case "password":
        console.log(this.passwordConfirm, e.target.value)
        if (this.passwordConfirm !== e.target.value) {
          this.setState({ passDiff: true })
        }else {
          this.data.password = e.target.value
          this.setState({ passDiff: false })
        }
        break
    }
    console.log('llego', this.data.name)
  };
  clear = () => {
    document.getElementById("userForm").reset()
    this.data.code = null
    this.data.first_name = null
    this.data.user = ''
    this.data.identification_number = null
    this.data.email = null
    this.data.username = null
    this.data.phone_number = null
    this.data.groups = []
    this.data.password = null
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ activeDialog: false })
  }
  save = () => {
    fetch(`${conf.api_url}/profile/`, {
      method: 'POST',
      body: JSON.stringify(this.data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(async function(response) {
      console.log('response', response)
      let resp = await response.json()
      if (response.status == 201 ) {
        this.setState({ activeDialog: true,  messageAlert: resp['detail'] })
        this.clear()
      }
    })
    .catch(err => {
        console.log(err);
        this.setState({ activeDialog: true,  messageAlert: 'Por favor valide los campos obligatorios' })
    });

  };

  render() {
    return (
      <div>
        {/* <div class="sub-title">
          Nuevo usuario
        </div> */}
        <form id="userForm" >
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
          <TextField
            required
            type="password"
            onChange={this.handleChange}
            name="password1"
            label="Contraseña"
            margin="normal"
            />
          <FormControl>
            <TextField
              required
              type="password"
              onChange={this.handleChange}
              name="password"
              label="Confirme contraseña"
              margin="normal"
              />
            {this.state.passDiff ? <FormHelperText error >La contraseña no coincide.</FormHelperText> : ''}
          </FormControl>
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
          <br/><br/><br/>
          <div class="text-center">
            <Button variant="contained" color="primary" type="submit" onClick={this.save}>
              Crear Usuario
            </Button>
          </div>
        </form>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.activeDialog}
          autoHideDuration={3000}
          color="secondary"
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.messageAlert}</span>}
        />
      </div>
    );
  }
}
