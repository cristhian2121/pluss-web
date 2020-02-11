import React from 'react'
import MaterialTable from 'material-table';

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
            { title: 'Ciudad', field: 'city'}
        ],
        dataUser: []
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
                        icon: 'delete',
                        tooltip: 'Eliminar cliente',
                        onClick: (event, rowData) => {
                            this.props.selectDelete(rowData)
                        }
                    }
                  ]}/>
        </div>
      );
    }
}