import React, { Component } from "react";

import MaterialTable from 'material-table';
import conf from '../../config'

export class List extends Component {
    state = {
        columns: [
            { title: 'Id', field: 'id' },
            { title: 'Usuario', field: 'username' },
            { title: 'Nombre', field: 'first_name' },
            { title: 'Correo electrónico', field: 'email' },
            { title: 'user', field: 'user' }
        ],
        dataUser: []
    };

    componentDidMount () {
        this.getDataUsers()
    }
    getDataUsers = async () => {
        try {
            console.log('api', conf.api_url)
            let response = await fetch(`${conf.api_url}/user/`)
            let data = await response.json();
        
            this.setState({
                dataUser: data
            })
        } catch (error) {
            console.log('error', error)
        }    
    }

    render () {
      return (
        <div>
            <div class="sub-title">
            Lista de usuarios
            </div>
            <br/>
            <MaterialTable
                title=""
                columns={this.state.columns}
                data={this.state.dataUser}
                /> 
        </div>
      );
    }
}