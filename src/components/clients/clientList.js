import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { TableGeneric } from '../common/table/table-component'
import AlertDialog from '@material-ui/core/Dialog';
// or
import { Dialog } from '@material-ui/core';

export class ClientList extends React.Component {

    handleChangePage = (forward) => {
        console.log('forward: ', forward);
        this.props.changePage(forward)
    }

    render() {
        return (
            <div>
                <div className="sub-title">
                    <span className="text">
                        Lista de Clientes
                </span>
                </div>
                <TableGeneric
                    title=""
                    columns={this.state.columns}
                    data={this.props.clientList}
                    actions={this.actions}
                    editItem={this.props.selectUpdate}
                    deleteItem={this.showConfirmation}
                    duplicateItem={this.props.duplicateClient}
                    changePage={this.handleChangePage}
                    count={this.props.count}

                />
                {/* <MaterialTable
                    title=""
                    columns={this.state.columns}
                    data={this.props.clientList} /> */}

                <AlertDialog
                    open={this.state.showAlert.open}
                    option={this.state.showAlert.option}
                    close={() => this.setState({ showAlert: !this.state.showAlert })}
                    confirm={() => this.props.selectDelete(this.state.selectRegister)}
                />
            </div>
        );
    }

}