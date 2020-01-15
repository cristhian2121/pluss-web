import React, { Component } from "react";
import MaterialTable from 'material-table';

import conf from '../../../config'

export class MakeRate extends Component {

    constructor(props){
      super(props)
    }

    state = {
        columns: [
            { title: 'Id', field: 'id' },
            { title: 'Fecha creación', field: 'date_created' },
            { title: 'Cliente', field: 'client.name' },
            { title: 'Creado por', field: 'user.first_name' },
            // { title: 'Teléfono', field: 'phone_number'},
            // { title: 'Estado', field: 'user.is_active'}
        ],
        dataQuotations: []
    };

    componentDidMount () {
      this.getDataQuotations()
    }

    getDataQuotations = async () => {
        try {
            let response = await fetch(`${conf.api_url}/quotation/`)
            let data = await response.json()
        
            this.setState({
              dataQuotations: data
            })
        } catch (error) {
            console.log('error', error)
        }    
    }

    render(){
        return(
          <>
          <div className="title">
            Listado de cotizaciones
          </div><br/>
          
            <MaterialTable
                title=''
                columns={this.state.columns}
                data={this.state.dataQuotations}
                actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Editar usuario',
                      onClick: (event, rowData) => {
                        // this.props.selectUpdate(rowData)
                        console.log('rowData', rowData)
                      }
                    }
                  ]}
                /> 
          </>
        )
    }
}