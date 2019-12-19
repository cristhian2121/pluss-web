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
          dataFormUpdate: {}
        }
    }

    dataUpdate =  (data) => {
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
               Usuarios
            </div>
            <br/><br/>
            <Create selectUpdate={this.state.dataFormUpdate} />
            <br/><br/>
            <List selectUpdate={this.dataUpdate}/>
          </div>
        );
      }
  }