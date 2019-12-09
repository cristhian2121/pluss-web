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
      messageAlert: '',
      code: props.selectUpdate.code,
      first_name: props.selectUpdate.user.first_name,
      identification_number: props.selectUpdate.identification_number,
      username: props.selectUpdate.user.username,
      phone_number: props.selectUpdate.phone_number
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
    console.log('llego', e.target.value)
    this.render()
    switch (e.target.name){
      case "code":
        this.setState({ code: e.target.value })
        // this.data.code = e.target.value
        break
      case "first_name":
        this.setState({ first_name: e.target.value })
        // this.data.first_name = e.target.value
        break
      case "identification_number":
        this.setState({ identification_number: e.target.value })
        // this.data.identification_number = e.target.value
        break
      case "username":
        this.setState({ username: e.target.value })
        // this.data.username = e.target.value
        // this.data.email = e.target.value
        break
      case "phone_number":
        this.setState({ phone_number: e.target.value })
        // this.data.phone_number = e.target.value
        break
      case "groups":
        this.data.groups = e.target.value
        break
      case "password1":
        this.passwordConfirm = e.target.value
        break
      case "password":
        if (this.passwordConfirm !== e.target.value) {
          this.setState({ passDiff: true })
        }else {
          this.data.password = e.target.value
          this.setState({ passDiff: false })
        }
        break
    }
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
  generateData = () => {
    let elements = document.getElementById('userForm').elements;
    let data = {};
    console.log('dataform', elements)
    for (let item of elements) {
      data[item.name] = item.value;
    }
    data.user = ''
    data.type_identification = 'CC'
    console.log('aa', data)
    return data
  }
  save = () => {
    this.data = this.generateData()
    console.log('editando', this.data)
    // fetch(`${conf.api_url}/profile/`, {
    //   method: 'POST',
    //   body: JSON.stringify(this.data),
    //   headers:{
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(async (response) => {
    //   console.log('response', response)
    //   let resp = await response.json()
    //   if (response.status == 201 ) {
    //     this.setState({ activeDialog: true,  messageAlert: resp['detail'] })
    //     this.clear()
    //   }
    //   console.log('error', resp)
    //   if (response.status == 400 ) {
    //     this.setState({ activeDialog: true,  messageAlert: resp['error'] })
    //   }
    // })
    // .catch(err => {
    //     console.log(err);
    //     this.setState({ activeDialog: true,  messageAlert: 'Por favor valide los campos obligatorios' })
    // });
  };
  update = () => {
    this.data = this.generateData()
    console.log('entro por el editar casi ue no', this.data, this.state.code)
    // fetch(`${conf.api_url}/profile/${this.props.selectUpdate.id}`, {
    //   method: 'POST',
    //   body: JSON.stringify(this.data),
    //   headers:{
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(async (response) => {
    //   console.log('response', response)
    //   let resp = await response.json()
    //   if (response.status == 201 ) {
    //     this.setState({ activeDialog: true,  messageAlert: resp['detail'] })
    //     this.clear()
    //   }
    //   console.log('error', resp)
    //   if (response.status == 400 ) {
    //     this.setState({ activeDialog: true,  messageAlert: resp['error'] })
    //   }
    // })
    // .catch(err => {
    //     console.log(err);
    //     this.setState({ activeDialog: true,  messageAlert: 'Por favor valide los campos obligatorios' })
    // });

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
            name="code"
            onChange={this.handleChange}
            value={this.state.code}
            label="Código"
            margin="normal"
            // value={this.data.code}
            />
          <TextField
            required
            name="first_name"
            label="Nombre"
            margin="normal"
            onChange={this.handleChange}
            value={this.state.first_name}
            // value={this.props.selectUpdate.user ? this.props.selectUpdate.user.first_name : null}
            />
          <TextField
            name="identification_number"
            label="Documento"
            margin="normal"
            onChange={this.handleChange}
            value={this.state.identification_number}
            // value={this.props.selectUpdate ? this.props.selectUpdate.identification_number : null}
            />
          <TextField
            required
            // onChange={this.handleChange}
            name="username"
            label="Correo electrónico"
            margin="normal"
            onChange={this.handleChange}
            value={this.state.username}
            // value={this.props.selectUpdate.user ? this.props.selectUpdate.user.email : null}
            />
          <TextField
            required
            // onChange={this.handleChange}
            name="phone_number"
            label="Teléfono"
            margin="normal"
            onChange={this.handleChange}
            value={this.state.phone_number}
            // value={this.props.selectUpdate ? this.props.selectUpdate.phone_number : null}
            />
          <TextField
            required
            type="password"
            onChange={this.handleChange}
            name="password1"
            label="Contraseña"
            margin="normal"
            value={this.props.selectUpdate.user ? this.props.selectUpdate.user.password : null}
            />
          <FormControl>
            <TextField
              required
              type="password"
              onChange={this.handleChange}
              name="password"
              label="Confirme contraseña"
              margin="normal"
              value={this.props.selectUpdate.user ? this.props.selectUpdate.user.password : null}
              />
            {this.state.passDiff ? <FormHelperText error >La contraseña no coincide.</FormHelperText> : ''}
          </FormControl>
          <FormControl margin="normal">
            <InputLabel id="groups">Tipo usuario</InputLabel>
            <Select
              labelId="groups"
              name="groups"
              onChange={this.handleChange}
              // onInput={this.handleChange}
              // value={this.props.selectUpdate ? this.props.selectUpdate.user.groups : null}
            >              
              {this.state.dataGroups.map(groups => (
                <MenuItem 
                value={groups.id}
                >{groups.name}</MenuItem>
                ))}              
            </Select> 
          </FormControl>
          <br/><br/><br/>
          <div class="text-center">
            <Button variant="contained" color="primary" onClick={this.props.selectUpdate.user ? this.update : this.save}>
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
