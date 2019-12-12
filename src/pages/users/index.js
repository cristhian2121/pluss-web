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
          showForm: false
        }
    }
    showForm = () => {
      this.setState({
        showForm: true
      })
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
              <Button onClick={this.showForm}>Crear Usuarios  <AddCircleIcon /></Button>
            </div>
            { this.state.showForm ? <Create /> : ''}
            <br/><br/>
            <List />
          </div>
        );
      }
}