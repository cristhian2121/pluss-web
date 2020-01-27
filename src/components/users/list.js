import React, { Component } from "react";

import MaterialTable from 'material-table';

import conf from '../../config'

export class List extends Component {
    constructor(props){
        super(props)
    }

    state = {
        alert: {
            open: false
        },
        columns: [
            { title: 'codigo', field: 'code' },
            { title: 'Nombre', field: 'user.first_name' },
            { title: 'Correo electrónico', field: 'user.username' },
            { title: 'Documento', field: 'identification_number' },
            { title: 'Teléfono', field: 'phone_number'},
            { title: 'Estado', field: 'user.is_active'}
        ],
        dataUser: []
    };

    render () {
      return (
        <div>            
            <br/>
            <MaterialTable
                title={<div className="sub-title">
                Lista de usuarios
                </div>}
                columns={this.state.columns}
                data={this.props.userList}
                actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Editar usuario',
                      onClick: (event, rowData) => {
                        this.props.selectUpdate(rowData)
                      }
                    }
                  ]}
            />
        </div>
      );
    }
}