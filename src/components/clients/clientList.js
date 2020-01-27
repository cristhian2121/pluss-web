import React from 'react'
import MaterialTable from 'material-table';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

import config from '../../config'

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

    deleteClient (client) {
      console.log('clientclientclient: ', client);
      this.props.clientDelete(client)
      // fetch(`${config.api_url}/client/${client.id}` , {method: 'DELETE'})
      // .then(response => {        
      //   if (response.status === 204) {
      //     this.props.clientDelet(client)
      //     // for (let item of this.props.clientList ) {
      //     //   if (item.id === client.id) {
      //     //     this.props.clientList = this.props.clientList.splice(item, 1)
      //     //     return
      //     //   }
      //     // }
      //   }
      // })
      // .then(res => { console.log('reseeeeeeeeeeeeeeee: ', res) })
      // .catch(e => { console.log('Erroraaaaaa: ', e) })

    }

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
                          console.log('rowData: ', rowData);
                        // this.props.selectUpdate(rowData)
                      }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar cliente',
                        onClick: (event, rowData) => {
                            // this.deleteClient(rowData)
                            this.props.selectDelet(rowData)
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