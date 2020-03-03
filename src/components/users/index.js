import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import conf from '../../config'

export class Create extends Component {
  constructor(props) {
    console.log('props usaurios: ', props);
    super(props)
    this.data = {}
    this.state = {
      alert: {
        open: false,
        message: '',
        type: '',
      },
      dataGroups: [],
      showForm: true,
      idUser: props.selectUpdate.user ? props.selectUpdate.id : null,
      code: props.selectUpdate.user ? props.selectUpdate.code : null,
      first_name: props.selectUpdate.user ? props.selectUpdate.user.first_name : null,
      identification_number: props.selectUpdate.identification_number,
      username: props.selectUpdate.user ? props.selectUpdate.user.username : null,
      phone_number: props.selectUpdate ? props.selectUpdate.phone_number : null,
      password: props.selectUpdate.user ? props.selectUpdate.user.password : null,
      passwordConfirm: props.selectUpdate.user ? props.selectUpdate.user.password : null,
      groups: props.selectUpdate.user ? props.selectUpdate.user.groups : []
    }
  }
  componentDidMount() {
    this.getGroups()
  }
  getGroups = async () => {
    try {
      let response = await fetch(`${conf.api_url}/group/`)
      let data = await response.json();
      console.log('datadddddd: ', data.results);
      this.setState({
        dataGroups: data.results
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
        break;
        default: break;
    }
  }
  clear = () => {
    this.data = {}
    document.getElementById("userForm").reset()
    this.setState({
      idUser: null,
      code: null,
      first_name: null,
      identification_number: null,
      username: null,
      phone_number: null,
      password: null,
      passwordConfirm: null,
      groups: []
    })
    this.props.cancelForm(false)
  };
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
  saveUser = (evt) => {
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
        console.log('respresprespresp: ', resp);
        if (response.status === 201) {
          this.setState({ 
            alert: {
              open: true,
              message: resp['detail'],
              type:'success'
            }
          })

          this.props.addUserList(this.data)
          this.clear()
        }
        if (response.status === 400) {
          this.setState({ 
            alert: {
              open: true,
              message: resp['error'],
              type:'error'
            }
          })
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ 
          alert: {
            open: true,
            message: 'Por favor valide los campos obligatorios',
            type:'warning'
          }
        })
      });
  };
  updateUser = () => {
    this.data = this.generateData()
    this.data.groups = this.data.groups.split(',')
    console.log('entro por el editar casi ue no', this.data, this.props.selectUpdate.id)

    fetch(`${conf.api_url}/user/${this.props.selectUpdate.user.id}/`, {
      method: 'PUT',
      body: JSON.stringify(this.data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(async (response) => {
        let resp1 = await response.json()
        console.log('response', resp1, response.status)

        if (response.status === 200 ||  response.status === 201) {
          fetch(`${conf.api_url}/profile/${this.props.selectUpdate.id}/`, {
            method: 'PUT',
            body: JSON.stringify(this.data),
            headers: { 'Content-Type': 'application/json' }
          })
            .then(async (response) => {
              let resp = await response.json()
              console.log('resp 2: ', resp);
              if (response.status === 200 ||  response.status === 201) {
                this.setState({ 
                  alert: {
                    open: true,
                    message: 'El usuario se  actualizó correctamente',
                    type:'success'
                  }
                })
                this.clear()
              }
              if (response.status === 400 ) {
                this.setState({ 
                  alert: {
                    open: true,
                    message: 'No se pudo actualizar el usuario, por favor vuelva a intentarlo.',
                    type:'error'
                  }
                })
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
        if (response.status === 400 ) {
          this.setState({ 
            alert: {
              open: true,
              message: resp1['error'],
              type:'error'
            }
          })
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ 
          alert: {
            open: true,
            message: 'Por favor valide los campos obligatorios',
            type:'warning'
          }
        })
      });

  };

  render() {
    return (
      <div id="userForm-cu" className="create-update">
        <div className="create-update-form">

          <div className="title-modal">
              {this.state.idUser ? 'Editar' : 'Crear'} usuario
          </div>
            
          <form autocomplete="off" id="userForm" >
            <TextField required
              name="code"
              onChange={this.handleChange}
              value={this.state.code}
              label="Código"
              margin="normal"
              className="col-md-4 col-xs-4"
            />
            <TextField required
              name="first_name"
              label="Nombre"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.first_name}
              className="col-md-4 col-xs-8"
            />
            <TextField
              name="identification_number"
              label="Documento"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.identification_number}
              className="col-md-4 col-xs-4"
            />
            <TextField required
              name="username"
              label="Correo electrónico"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.username}
              className="col-md-4 col-xs-8"
            />
            <TextField
              required
              name="phone_number"
              label="Teléfono"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.phone_number}
              className="col-md-4 col-xs-6"
            />
            <FormControl margin="normal" className="col-md-4 col-xs-6">
              <InputLabel id="groups">Tipo usuario</InputLabel>
              <Select
                labelId="groups"
                name="groups"
                onChange={this.handleChange}
                defaultValue={this.state.groups}
              >
                {this.state.dataGroups.map(groups => (
                  <MenuItem
                    value={groups.id}
                  >{groups.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              required
              type="password"
              name="password1"
              label="Contraseña"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.passwordConfirm}
              className="col-md-4 col-xs-6"
            />
            <FormControl className="col-md-4 col-xs-6">
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
            <div className="text-center container-button">
              <Button variant="contained" onClick={this.clear}>
                Cancelar
              </Button>
              <Button variant="contained" color="secondary" onClick={this.state.idUser ? this.updateUser : this.saveUser}>
                Guardar
              </Button>
            </div>
          </form>

          <Snackbar
            open={this.state.alert.open}
            autoHideDuration={4000}
            onClose={() => 
              this.setState({alert: {open: false}})
            }
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            anchorOrigin= {{ 
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <Alert severity={this.state.alert.type}>{this.state.alert.message}</Alert>
          </Snackbar>
        </div>
        
      </div>
    );
  }
}
