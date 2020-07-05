import React, { Component } from "react";

import MaterialTable from 'material-table';
import AlertDialog from '@material-ui/core/Dialog';
import conf from '../../config'
import { TableGeneric } from '../common/table/table-component'

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
            let response = await fetch(`${conf.api_url}/profile/`)
            let data = await response.json()
        
            this.setState({
                dataUser: data
            })
        } catch (error) {
            console.log('error', error)
        }    
    }

  handleChangePage = (forward) => {
    this.props.changePage(forward)
  }

  render() {
    return (
      <div>
        <div className="sub-title">
          <span className="text">
            Lista de usuarios
          </span>
        </div>
        <TableGeneric
          title=''
          columns={this.state.columns}
          data={this.props.userList}
          actions={this.actions}
          editItem={this.props.selectUpdate}
          deleteItem={this.showConfirmation}
          changePage={this.handleChangePage}
          count={this.props.count}
        />
        {/* <MaterialTable
          title=""
          columns={this.state.columns}
          data={this.props.userList}
          actions={}
        /> */}

        <AlertDialog
          open={this.state.showAlert.open}
          option={this.state.showAlert.option}
          close={() => this.setState({ showAlert: !this.state.showAlert })}
          confirm={() => this.props.selectDelete(this.state.selectRegisterDelete)}
        />
      </div>
    );
  }
}