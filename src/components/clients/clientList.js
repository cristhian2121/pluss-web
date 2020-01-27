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
            { title: 'Asesor de venta', field: 'agent.name' },
            { title: 'Ciudad', field: 'city'}
        ],
        dataUser: []
    };

    render () {
      return (
        <div>            
            <br/>
            <MaterialTable
                title={<div className="sub-title">
                Lista de Clientes
                </div>}
                columns={this.state.columns}
                data={this.props.clientList}
                actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Editar cliente',
                      onClick: (event, rowData) => {
                        this.props.selectUpdate(rowData)
                          console.log('rowData: ', rowData);
                      }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar cliente',
                        onClick: (event, rowData) => {
                            this.props.selectDelete(rowData)
                        }
                    }
                  ]}
            />
        </div>
      );
    }

    // render() {
    //     return (
    //             <Paper>
    //                 <Table aria-label="simple table">
    //                     <TableHead>
    //                         <TableRow>
    //                             <TableCell align="right">Nombre</TableCell>
    //                             <TableCell align="right"></TableCell>
    //                             <TableCell align="right"></TableCell>
    //                             <TableCell align="right"></TableCell>
    //                         </TableRow>
    //                     </TableHead>
    //                     <TableBody>
    //                         {(client => (
    //                             <TableRow key={client.id}>
    //                                 <TableCell component="th" scope="row">
    //                                     {client.name}
    //                                 </TableCell>
    //                                 <TableCell align="center">{client.phone}</TableCell>
    //                                 <TableCell align="center">{client.agent.name}</TableCell>
    //                                 <TableCell align="center">{client.city}</TableCell>
    //                             </TableRow>
    //                         ))}
    //                     </TableBody>
    //                 </Table>
    //             </Paper>
    //     )
    // }

}