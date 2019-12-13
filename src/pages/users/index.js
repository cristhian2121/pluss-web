import React, { Component } from "react";

import { Create } from "../../components/users/index";
import { List } from "../../components/users/list"

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import {Alert} from '../../components/common/alerts'

import { Menu } from '../../components/common/nav-bar'
 

export class User extends Component {
    constructor() {
        super();
        this.state = {
          // showForm: false,
          dataFormUpdate: {}
        }
    }
    // showForm = () => {
    //   this.setState({
    //     showForm: !this.state.showForm
    //   })
    // }

    dataUpdate =  (data) => {
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
            <Menu />
          <div class="margin-page">
            <div className="title">
                Administrador de usuarios
            </div>
            <br/><br/>
            {/* <div className="sub-title">
              <Button onClick={this.showForm}>
                {this.state.dataFormUpdate.user ? 'Editar' : 'Crear'} Usuario {this.state.showForm ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
              </Button>
            </div> */}
            <Create selectUpdate={this.state.dataFormUpdate} />
            <br/><br/>
            <List selectUpdate={this.dataUpdate}/>
          </div>
          </div>
        );
      }
  }