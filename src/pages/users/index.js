import React, { Component } from "react";

import { Create } from "../../components/users/index";
import { List } from "../../components/users/list"

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
// import {Alert} from '../../components/common/alerts'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { Menu } from '../../components/common/nav-bar'

import conf from '../../config'
 

export class User extends Component {
    constructor() {
        super();
        this.state = {
          alert: {
            open: false,
            message: '',
            type: '',
          },
          dataFormUpdate: {},
          dataUser: [],
          openCreateUpdate: false,
          dataGroups: []
        }
        // this.insertUser = this.insertUser.bind(this)
        this.saveUser = this.saveUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
    }

    componentDidMount () {
      this.getDataUsers()
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

    dataUpdate =  (data) => {
      if (data !== '' || data!== null) {
        this.showForm('update')
        this.setState({
          dataUser: true,
          dataFormUpdate: data
        })
      }
    }

    getDataUsers = async () => {
      try {
          let response = await fetch(`${conf.api_url}/profile/`)
          let data = await response.json()
      
          this.setState({
              dataUser: data.results
          })
      } catch (error) {
          console.log('error', error)
      }    
    }

    insertUser(user) {
      console.log('useruseruser: ', user);
      // this.getDataUsers()
      this.setState({
        dataUser: [...this.state.dataUser, user]
      })
    }

    deleteUser = (user) => {
      fetch(`${conf.api_url}/profile/${user.id}`, { method: 'DELETE' })
      .then(response => {
        console.log('response delete: ', response);
        if (response.status === 204) {
          let users = this.state.dataUser.filter(item => item.id != user.id)
          console.log('users: ', users);
          this.setState({
            dataUser: users,
            alert: {
              open: true,
              message: 'El usuario se elimino correctamente.',
              type: 'success'
            }
          })
        }
      })
      .catch(e => { console.log('Error clientDelete: ', e) })
    }

    showForm = (action) => {
      this.setState({
        openCreateUpdate: !this.state.openCreateUpdate
      })
      if (action != "update") {
        console.log('entro al if')
        this.setState({
          dataFormUpdate: {},
        })
      }
      // documnt.getElementById("userForm-cu").style.display = 'block'
    }

    saveUser = (user) => {
      console.log('evt index user: ', user);
      fetch(`${conf.api_url}/profile/`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (response) => {
          let resp = await response.json()
          console.log('respresprespresp: ', resp);
          if (response.status === 201) {
            this.setState({ 
              dataUser: [...this.state.dataUser, user],
              alert: {
                open: true,
                message: resp['detail'],
                type:'success'
              }
            })

            this.showForm()  
            // this.clear()
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
    }

    updateUser = (user) => {
      console.log('entro por el editar casi ue no', user)
      let idUser = this.state.dataFormUpdate.id
      console.log('idUser: ', idUser);
  
      fetch(`${conf.api_url}/user/${idUser}/`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(async (response) => {
          let resp1 = await response.json()
          console.log('response', resp1, response.status)
  
          if (response.status === 200 ||  response.status === 201) {
            fetch(`${conf.api_url}/profile/${idUser}/`, {
              method: 'PUT',
              body: JSON.stringify(user),
              headers: { 'Content-Type': 'application/json' }
            })
              .then(async (response) => {
                let resp = await response.json()
                console.log('resp 2: ', resp);
                if (response.status === 200 ||  response.status === 201) {
                  this.setState({
                    dataUser: [...this.state.dataUser, resp],
                    alert: {
                      open: true,
                      message: 'El usuario se  actualizo correctamente',
                      type:'success'
                    }
                  })
                  // this.clear()
                  this.showForm() 
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
        })
    }

    render() {
        return (
          <div>
            <div className="title row">
              <div className="title-text col-md-6 col-xs-12">
                Usuarios
              </div>
              <div className="action-title col-md-6 col-xs-12">
                <span className="text" onClick={this.showForm}>
                  {this.state.dataEdit ? 'Editar' : 'Crear'} Usuario {/*this.state.dataEdit ? <ExpandLessIcon /> : <ExpandMoreIcon /> */}
                  <Button className="button-more" onClick={this.showForm}> <AddCircleIcon/>  </Button>
                </span>
              </div>
            </div>
            
            {
              this.state.openCreateUpdate &&
              <Create 
              saveUser={this.saveUser}
              updateUser={this.updateUser}
              dataGroups={this.state.dataGroups}
              selectUpdate={this.state.dataFormUpdate}
              cancelForm={this.showForm} />
            }
            <List selectDelete={this.deleteUser} userList={this.state.dataUser} selectUpdate={this.dataUpdate}/>

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
            <Alert variant="filled" severity={this.state.alert.type}>{this.state.alert.message}</Alert>
          </Snackbar>
          </div>
        );
      }
  }