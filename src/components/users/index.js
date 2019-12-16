import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandMore';

import conf from '../../config'

export class Create extends Component {
  constructor(props) {
    super(props)
    this.data = {}
    this.state = {
      dataEdit: null,
      showForm: true,
      dataGroups: [],
      passDiff: false,
      activeDialog: false,
      messageAlert: '',
      code: null,
      first_name: null,
      identification_number: null,
      username: null,
      phone_number: null,
      password: null,
      passwordConfirm: null,
      groups: []
    }
  }
  showForm = () => {
    if (this.state.showForm) { document.getElementById('userForm').style.display='block' }
    else { document.getElementById('userForm').style.display='none' }

    this.setState({ showForm: !this.state.showForm })
    console.log('segundo', this.state.showForm)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataEdit: nextProps.selectUpdate.user ? nextProps.selectUpdate : null,
      code: nextProps.selectUpdate.user ? nextProps.selectUpdate.code : null,
      first_name: nextProps.selectUpdate.user ? nextProps.selectUpdate.user.first_name : null,
      identification_number: nextProps.selectUpdate.identification_number,
      username: nextProps.selectUpdate.user ? nextProps.selectUpdate.user.username : null,
      phone_number: nextProps.selectUpdate ? nextProps.selectUpdate.phone_number : null,
      password: nextProps.selectUpdate.user ? nextProps.selectUpdate.user.password : null,
      passwordConfirm: nextProps.selectUpdate.user ? nextProps.selectUpdate.user.password : null,
      groups: nextProps.selectUpdate.user ? nextProps.selectUpdate.user.groups : []
    })
  }
  componentDidMount() {
    this.getGroups()
    document.getElementById('userForm').style.display='none'
  }
  getGroups = async () => {
    try {
      let response = await fetch(`${conf.api_url}/group/`)
      let data = await response.json();
      this.setState({
        dataGroups: data
      })
    } catch (error) {
      console.log('error', error)
    }
  }
  handleChange = e => {
    this.render()
    switch (e.target.name) {
      case "code":
        this.setState({ code: e.target.value })
        break
      case "first_name":
        this.setState({ first_name: e.target.value })
        break
      case "identification_number":
        this.setState({ identification_number: e.target.value })
        break
      case "username":
        this.setState({ username: e.target.value })
        break
      case "phone_number":
        this.setState({ phone_number: e.target.value })
        break
      case "groups":
        this.setState({ groups: e.target.value })
        break
      case "password1":
        this.setState({ passwordConfirm: e.target.value })
        break
      case "password":
        if (this.state.passwordConfirm !== e.target.value) {
          this.setState({ passDiff: true, password: e.target.value })
        } else {
          this.setState({ passDiff: false, password: e.target.value })
        }
        break
    }
  };
  clear = () => {
    this.data = {}
    document.getElementById("userForm").reset()
    this.setState({
      dataEdit: null,
      code: null,
      first_name: null,
      identification_number: null,
      username: null,
      phone_number: null,
      password: null,
      passwordConfirm: null,
      groups: []
    })
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
    data.user = this.props.selectUpdate.user ? this.props.selectUpdate.user.id : ''
    data.type_identification = 'CC'
    return data
  }
  save = (evt) => {
    this.data = this.generateData()
    console.log('editando', this.data)
    fetch(`${conf.api_url}/profile/`, {
      method: 'POST',
      body: JSON.stringify(this.data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (response) => {
        let resp = await response.json()
        if (response.status == 201) {
          this.setState({ activeDialog: true, messageAlert: resp['detail'] })
          this.clear()
        }
        if (response.status == 400) {
          this.setState({ activeDialog: true, messageAlert: resp['error'] })
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ activeDialog: true, messageAlert: 'Por favor valide los campos obligatorios' })
      });
  };
  update = () => {
    this.data = this.generateData()
    this.data.groups = this.data.groups.split(',')
    console.log('entro por el editar casi ue no', this.data, this.props.selectUpdate.id)
    fetch(`${conf.api_url}/user/${this.props.selectUpdate.user.id}/`, {
      method: 'PUT',
      body: JSON.stringify(this.data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (response) => {
        let resp1 = await response.json()
        console.log('response', resp1, response.status)
        if (response.status == 200 ||  response.status == 201) {
          fetch(`${conf.api_url}/profile/${this.props.selectUpdate.id}/`, {
            method: 'PUT',
            body: JSON.stringify(this.data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(async (response) => {
              let resp = await response.json()
              if (response.status == 200 ||  response.status == 201) {
                this.setState({ activeDialog: true,  messageAlert: 'El usuario se  actualizó correctamente' })
                this.clear()
              }
              if (response.status == 400 ) {
                this.setState({ activeDialog: true,  messageAlert:'No se pudo actualizar el usuario, por favor vuelva a intentarlo.' })
              }
            })
            .catch(err => {
              console.log(err);
              // this.setState({ activeDialog: true,  messageAlert: 'Por favor valide los campos obligatorios' })
            });
        }
        if (response.status == 400 ) {
          console.log(resp1)
          this.setState({ activeDialog: true,  messageAlert: resp1['error'] })
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
        <div className="sub-title">
          <Button onClick={this.showForm}>
            {this.state.dataEdit ? 'Editar' : 'Crear'} Usuario {this.state.dataEdit ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
          </Button>
        </div>
        <form id="userForm">
          <TextField
            required
            name="code"
            onChange={this.handleChange}
            value={this.state.code}
            label="Código"
            margin="normal"
          />
          <TextField
            required
            name="first_name"
            label="Nombre"
            margin="normal"
            onChange={this.handleChange}
            value={this.state.first_name}
          />
          <TextField
            name="identification_number"
            label="Documento"
            margin="normal"
            onChange={this.handleChange}
            value={this.state.identification_number}
          />
          <TextField
            required
            name="username"
            label="Correo electrónico"
            margin="normal"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <TextField
            required
            name="phone_number"
            label="Teléfono"
            margin="normal"
            onChange={this.handleChange}
            value={this.state.phone_number}
          />
          <TextField
            required
            type="password"
            name="password1"
            label="Contraseña"
            margin="normal"
            onChange={this.handleChange}
            value={this.state.passwordConfirm}
          />
          <FormControl>
            <TextField
              required
              type="password"
              name="password"
              label="Confirme contraseña"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.password}
            />
            {this.state.passDiff ? <FormHelperText error >La contraseña no coincide.</FormHelperText> : ''}
          </FormControl>
          <FormControl margin="normal">
            <InputLabel id="groups">Tipo usuario</InputLabel>
            <Select
              labelId="groups"
              name="groups"
              onChange={this.handleChange}
            // value={this.props.selectUpdate ? this.props.selectUpdate.user.groups : null}
            >
              {this.state.dataGroups.map(groups => (
                <MenuItem
                  value={groups.id}
                >{groups.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <br /><br /><br />
          <div className="text-center">
            <Button variant="contained" color="secondary" onClick={this.clear}>
              Limpiar
            </Button>
            <Button variant="contained" color="primary" onClick={this.state.dataEdit ? this.update : this.save}>
              {this.state.dataEdit ? 'Guardar' : 'Crear Usuario'}
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
