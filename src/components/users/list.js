import React, { Component } from "react";

import MaterialTable from 'material-table';

export class List extends Component {
    state = {
        columns: [
            { title: 'Código', field: 'id' },
            { title: 'Nombre', field: 'name' },
            { title: 'Teléfono', field: 'phone' },
            { title: 'Estado', field: 'state' }
        ],
        dataUser: []
    };

    componentDidMount () {
        this.getDataUsers()
    }
    getDataUsers = async () => {
        try {
            let response = await fetch('http://rickandmortyapi.com/api/character/')
            let data = await response.json();
        
            this.setState({
                dataUser: data.results
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