import React, { Component } from "react";

import { Create } from "../../components/users/index";

export class User extends Component {
    constructor() {
        super();
    }    

    render() {
        return (
          <div>
            <div class="title">
                Administrador de usuarios
            </div>
            <br/>
            <Create/>
          </div>
        );
      }
}