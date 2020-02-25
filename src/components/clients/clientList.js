import React from 'react'
import MaterialTable from 'material-table';

import AlertDialog from '../common/confirm'

export class ClientList extends React.Component {
    constructor(props){
        super(props)
    }

    state = {
        alert: {
            open: false
        },
        columns: [
            { title: 'Nit', field: 'nit'},
            { title: 'Nombre', field: 'name' },
            { title: 'Teléfono', field: 'phone' },
            { title: 'Asesor de venta', field: 'agent' },
            { title: 'Ciudad', field: 'city'},
            { title: 'id', field: 'id'}
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
                    Lista de Clientes
                </span>
            </div>
            <MaterialTable
                title=""
                columns={this.state.columns}
                data={this.props.clientList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar cliente',
                        onClick: (event, rowData) => {
                            this.props.selectUpdate(rowData)
                        }
                    },
                    {
                        icon: 'file_copy',
                        tooltip: 'Duplicar cliente',
                        onClick: (event, rowData) => {
                            this.props.duplicateClient(rowData)
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar cliente',
                        onClick: (event, rowData) => {
                            this.setState({
                                showAlert: true,
                                selectRegister: rowData
                            })
                            // this.props.selectDelete(rowData)
                        }
                    }
                  ]}/>

            <AlertDialog
                open={this.state.showAlert}
                option={this.state.selectRegister && true}
                close={() => this.setState({showAlert: !this.state.showAlert})}
                confirm={() => this.props.selectDelete(this.state.selectRegister)}
            />
        </div>
      );
    }
}