import React, { Component } from "react";

import { Create } from "../../components/users/index";
import { List } from "../../components/users/list"

import Button from '@material-ui/core/Button';
import {Alert} from '../../components/common/alerts'

export class User extends Component {
    constructor() {
        super();
        this.state = {
          showForm: false,
          dataFormUpdate: {}
        }
    }
    showForm = () => {
      this.setState({
        showForm: true
      })
    }

    dataUpdate =  (data) => {
      console.log('data', data)
      Alert('mensaje popo', true)
      if (data !== '' || data!== null) {
        this.setState({
          showForm: true, 
          dataFormUpdate: data
        })
      }
    }

    render() {
        return (
          <div>
            <div className="title">
                Administrador de usuarios
            </div>
            <br/><br/>
            <div className="sub-title">
              <Button onClick={this.showForm}>
                {this.state.dataFormUpdate.user ? 'Editar' : 'Crear'} Usuario
              </Button>
            </div>
            { this.state.showForm ? <Create selectUpdate={this.state.dataFormUpdate} /> : ''}
            <br/><br/>
            <List selectUpdate={this.dataUpdate}/>
          </div>
        );
      }
}