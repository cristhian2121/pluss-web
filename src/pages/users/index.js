import React, { Component } from "react";

import { Create } from "../../components/users/index";
import { List } from "../../components/users/list"

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
            <div class="title">
                Administrador de usuarios
              {/* <Fab color="primary" size="small" aria-label="add" onClick={this.handleOpen}>
                <AddIcon />
              </Fab> */}
            </div>
            <br/><br/>
            <div class="sub-title">
              <Button onClick={this.showForm}>Crear/Editar Usuario </Button>
            </div>
            { this.state.showForm ? <Create selectUpdate={this.state.dataFormUpdate} /> : ''}
            <br/><br/>
            <List selectUpdate={this.dataUpdate}/>
          </div>
        );
      }
}