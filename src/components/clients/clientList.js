import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export class ClientList extends React.Component {

    constructor(props) {
        super(props)        
    }    

    render() {
        return (
                <Paper>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Nombre</TableCell>
                                <TableCell align="right">Teléfono</TableCell>
                                <TableCell align="right">Asesor de venta</TableCell>
                                <TableCell align="right">Ciudad</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.clientList.map(client => (
                                <TableRow key={client.id}>
                                    <TableCell component="th" scope="row">
                                        {client.name}
                                    </TableCell>
                                    <TableCell align="center">{client.phone}</TableCell>
                                    <TableCell align="center">{client.agent.name}</TableCell>
                                    <TableCell align="center">{client.city}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
        )
    }

}