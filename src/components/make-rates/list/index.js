import React, { Component } from "react";
import MaterialTable from 'material-table';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import conf from '../../../config'

export class MakeRate extends Component {

    constructor(props){
      super(props)
      console.log('props list cotización: ', props);
      this.state = {
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
          alert: {
            open: props.location.state ? props.location.state.open : false,
            message: props.location.state ? props.location.state.message : '',
            type: props.location.state ? props.location.state.type : '',
          }
      };
    }


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
            
            <Snackbar
              open={this.state.alert.open}
              autoHideDuration={4000}
              onClose={() => 
                this.setState({alert: {open: false}})
              }
              anchorOrigin= {{ 
                vertical: 'bottom',
                horizontal: 'left'
              }}>
              <Alert severity={this.state.alert.type}>{this.state.alert.message}</Alert>
            </Snackbar>
          </>
        )
    }
}