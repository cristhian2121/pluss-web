import React, { Component } from "react";

import { Create } from "../../components/users/index";
import { List } from "../../components/users/list"

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export class User extends Component {
    // constructor() {
    //     super();
    // }

    render() {
        return (
          <div>
            <div class="title">
                Administrador de usuarios
              {/* <Fab color="primary" size="small" aria-label="add" onClick={this.handleOpen}>
                <AddIcon />
              </Fab> */}
            </div>
            <br/>
            <Create />
            <List />
          </div>
        );
      }
}