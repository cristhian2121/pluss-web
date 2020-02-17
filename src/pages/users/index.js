import React, { Component } from "react";

import { Create } from "../../components/users/index";
import { List } from "../../components/users/list"

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import {Alert} from '../../components/common/alerts'
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { Menu } from '../../components/common/nav-bar'

import conf from '../../config'
 

export class User extends Component {
    constructor() {
        super();
        this.state = {
          dataFormUpdate: {},
          dataUser: [],
          openCreateUpdate: false
        }
        this.insertUser = this.insertUser.bind(this)
    }

    componentDidMount () {
      this.getDataUsers()
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
              message: 'El cliente se elimino.',
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
              <Create addUserList={this.insertUser} selectUpdate={this.state.dataFormUpdate} cancelForm={this.showForm} />
            }
            <List selectDelete={this.deleteUser} userList={this.state.dataUser} selectUpdate={this.dataUpdate}/>
          </div>
        );
      }
  }