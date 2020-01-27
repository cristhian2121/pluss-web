import React from "react"
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { CreateClient } from './createClient'
import { ClientList } from './clientList'
import config from '../../config'

export class Clients extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clients: [],
      updateClient: [],
      alert: {
        open: false,
        message: '',
        type: '',
      }
    }
    this.clientDelete = this.clientDelete.bind(this)
  }

  componentDidMount() {
    this.getClient()
  }

  getClient() {
    fetch(`${config.api_url}/client`)
      .then(response => {
        return response.json()
      })
      .then(res => {
        this.setState({
          clients: res.results
        })
      })
      .catch(e => {
        console.log('Error getClient: ', e)
      })
  }

  saveClient = (client) => {
    fetch(`${config.api_url}/client/${client.id}/`,
      {
      method: 'POST',
      body: JSON.stringify(client),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.log('Error saveClient: ', error))
    .then(response => {
      this.setState({
        clients: [...this.state.clients, client],
        alert: {
          open: true,
          message: 'El cliente se agrego.',
          type:'success'
        }
      })
      this.clearForm()
    })
  }

  updateClient = (client) => {
    let idClient = this.state.updateClient.id
    fetch(`${config.api_url}/client/${idClient}/`,
      {
      method: 'PUT',
      body: JSON.stringify(client),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.log('Error: ', error))
    .then(response => {
      let clients = this.state.clients.filter(item => item.id != response.id)
      this.setState({
        clients: [...clients, response],
        updateClient: [],
        alert: {
          open: true,
          message: 'El cliente se modifico.',
          type:'success'
        }
      })
      this.clearForm()
    })
  }

  clientDelete = (client) => {
    fetch(`${config.api_url}/client/${client.id}` , {method: 'DELETE'})
    .then(response => {        
      if (response.status === 204) {
        let clients = this.state.clients.filter(item => item.id != client.id)
        this.setState({ 
          clients: clients,
          alert: {
            open: true,
            message: 'El cliente se elimino.',
            type:'success'
          }
        })
      }
    })
    .then(res => { console.log('res clientDelete: ', res) })
    .catch(e => { console.log('Error clientDelete: ', e) })
  }

  clearForm () {
    document.getElementById("clientForm").reset()
  }

  selectUpdate = (client) => {
    this.setState({
      updateClient: client
    })
  }

  clientDelete = (client) => {
    console.log('clientclientclient: ', client);
    const clients = this.state.clients.filter(item => item.id != client.id)
    console.log('clients: ', clients);
    this.setState({
      clients: clients
    })
    // for (let [item, index] of this.state.clients.entries()) {
    //   console.log('item: ', inde);
    //   if (item.id === client.id) {
    //     const clientsAux = [...this.state.clients]
    //     console.log('clientsAux: ', clientsAux[0]);
    //     const newClient = clientsAux.splice(index, 1)
    //     console.log('newClient: ', newClient);
        
    //     console.log('clients: ', this.state.clients);
    //   }
    // }
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
  // clientDelete(client) {
  //   console.log('client: ', this.state.clients);
  //   for (let item of this.state.clients ) {
  //     console.log('item: ', item);
  //     if (item.id === client.id) {
  //       this.setState({
  //         clients: this.clients.splice(item, 1)
  //       })
  //       return
  //     }
  //   }
  // }

  render() {

    return (
      <>
        <div className="title">
          Clientes
        </div>
        <br />
        <CreateClient saveClient={this.saveClient} clientUpdate={this.state.updateClient} updateClient={this.updateClient} />
        <br /><br />
        <ClientList selectDelete={this.clientDelete} selectUpdate={this.selectUpdate} clientList={this.state.clients} />

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
