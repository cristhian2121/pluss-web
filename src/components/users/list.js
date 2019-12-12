import React, { Component } from "react";

import MaterialTable from 'material-table';
import conf from '../../config'

export class List extends Component {

    constructor(props){
        super(props)
    }

    state = {
        columns: [
            { title: 'codigo', field: 'code' },
            { title: 'Nombre', field: 'user.first_name' },
            { title: 'Correo electrónico', field: 'user.email' },
            { title: 'Documento', field: 'identification_number' },
            { title: 'Teléfono', field: 'phone_number'},
            { title: 'Estado', field: 'user.is_active'}
        ],
        dataUser: []
    };

    componentDidMount () {
        this.getDataUsers()
    }
    getDataUsers = async () => {
        try {
            console.log('api', conf.api_url)
            let response = await fetch(`${conf.api_url}/profile/`)
            let data = await response.json()
        
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
            
            <br/>
            <MaterialTable
                title={<div className="sub-title">
                Lista de usuarios
                </div>}
                columns={this.state.columns}
                data={this.state.dataUser}
                actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Editar usuario',
                      onClick: (event, rowData) => {
                        console.log('event que llega', event, rowData)
                        this.props.selectUpdate(rowData)
                      }
                    }
                  ]}
                /> 
        </div>
      );
    }
}