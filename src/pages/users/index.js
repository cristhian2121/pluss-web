import React, { Component } from "react";

import { Create } from "../../components/users/index";
import { List } from "../../components/users/list"

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import {Alert} from '../../components/common/alerts'

import { Menu } from '../../components/common/nav-bar'

import conf from '../../config'
 

export class User extends Component {
    constructor() {
        super();
        this.state = {
          dataFormUpdate: {},
          dataUser: []
        }
        this.insertUser = this.insertUser.bind(this)
    }

    componentDidMount () {
      this.getDataUsers()
    }

    dataUpdate =  (data) => {
      if (data !== '' || data!== null) {
        this.setState({
          showForm: true, 
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

    render() {
        return (
          <div>
            <div className="title">
               Usuarios
            </div>
            <br/>
            <Create addUserList={this.insertUser} selectUpdate={this.state.dataFormUpdate} />
            <br/>
            <List userList={this.state.dataUser} selectUpdate={this.dataUpdate}/>
          </div>
        );
      }
  }