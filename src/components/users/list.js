import React, { Component } from "react";

import MaterialTable from 'material-table';

import AlertDialog from '../common/confirm'
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
            { title: 'Teléfono', field: 'phone_number'}
        ],
        dataUser: [],
        showAlert: false,
        selectRegister: null,
    };

    render () {
      return (
        <div>            
            <div className="sub-title">
                <span className="text">
                    Lista de usuarios
                </span>
            </div>
            <MaterialTable
                title=""
                columns={this.state.columns}
                data={this.props.userList}
                actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Editar usuario',
                      onClick: (event, rowData) => {
                        this.props.selectUpdate(rowData)
                      }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar usuario',
                        onClick: (event, rowData) => {
                          this.setState({
                            showAlert: {
                              open: true,
                              option: 'delete'
                            },
                            selectRegister: rowData
                          })
                        }
                    }
                  ]}
            />

            <AlertDialog
                open={this.state.showAlert.open}
                option={this.state.showAlert.option}
                close={() => this.setState({showAlert: !this.state.showAlert})}
                confirm={() => this.props.selectDelete(this.state.selectRegister)}
            />
        </div>
      );
    }
}