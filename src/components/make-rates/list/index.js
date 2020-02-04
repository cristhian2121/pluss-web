import React, { Component } from "react";
import MaterialTable from 'material-table';
import {Redirect} from "react-router-dom";

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
            { title: 'Estado', field: 'status'}
        ],
        dataQuotations: [],
        redirectFormQuotation: false,
    };

    componentDidMount () {
      this.getDataQuotations()
    }

    getDataQuotations = async () => {
        try {
            let response = await fetch(`${conf.api_url}/quotation/`)
            let data = await response.json()
            console.log('data quotation: ', data);

        
            this.setState({
              dataQuotations: data.results
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
          </div>
          
            <MaterialTable
                title=''
                columns={this.state.columns}
                data={this.state.dataQuotations}
                actions={[
                    {
                      icon: 'visibility',
                      tooltip: 'Ver cotización',
                      onClick: (event, rowData) => {
                        sessionStorage.setItem('quotation', JSON.stringify(rowData))
                        window.open('/cotizacion', '_blank','',true)
                      }
                    },
                    {
                      icon: 'edit',
                      tooltip: 'Editar cotización',
                      onClick: (event, rowData) => {
                        console.log('rowData: ', rowData);
                        // props.selectEdit(rowData)
                        this.props.history.push({
                          pathname: '/cotizaciones/crear',
                          state: {
                            selectUpdate: rowData
                          }  
                        })
                      }
                    }
                  ]}
                /> 
          </>
        )
    }
}