import React, { Component } from "react";

import MaterialTable from 'material-table';
import {Aler} from '../common/alerts'

import conf from '../../config'

export class List extends Component {

    constructor(props){
        console.log('props list: ', props);
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

    // componentDidMount () {
    //     // this.getDataUsers()
    // }
    // getDataUsers = async () => {
    //     try {
    //         let response = await fetch(`${conf.api_url}/profile/`)
    //         let data = await response.json()
        
    //         this.setState({
    //             dataUser: data
    //         })
    //     } catch (error) {
    //         console.log('error', error)
    //     }    
    // }

    render () {
      return (
        <div>
            
            <br/>
            {console.log('el amor', this.props.userList)}
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
                        Aler({open:true});
                        // Aler(true)
                        // this.setState({alert:{open:true}})
                        this.props.selectUpdate(rowData)
                        // return <Aler />
                      }
                    }
                  ]}
            />
            {/* <Aler /> */}
            {/* {this.open ? <Aler/> : ''} */}
        </div>
      );
    }
}